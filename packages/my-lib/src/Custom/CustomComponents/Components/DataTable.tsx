import React, { useEffect, useMemo, useState, useContext } from "react";
import {
  ArrayControlProps,
  findUISchema,
  UISchemaElement,
  composePaths,
} from "@jsonforms/core";
import {
  JsonFormsDispatch,
  withJsonFormsArrayControlProps,
} from "@jsonforms/react";
import { DataContext, actions } from "../../../Context";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Box, Paper } from "@mui/material";
import { LogicHolder } from "../../../Logic/Logic";


const DataTable = ({
  path,
  schema,
  uischema,
  uischemas,
  renderers,
  rootSchema,
  updateValue
}: ArrayControlProps|any) => {
  const { dispatch, state, objFunc } = useContext(DataContext);

  const config: any = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const [row, setRow] = useState<undefined | any>([]);

  useEffect(() => {
    const callApi = async () => {
      setRow("loading");
      try {
        const result:any = await axios.get(
          uischema.options.ApiDetails.DataApi,
          // JSON.stringify(uischema.options.ApiDetails.DataApiBody),
          config
        );
        setRow(result.data.payload);
      } catch (err) {
        setRow("fail")
       console.log(err);
      }
    };
    const loadFuncCall =  async() => {
      setRow("loading");
      const returnValue =  await objFunc[`${ uischema.options.loadFunction}`]( uischema.options.ApiDetails);
      returnValue? setRow(returnValue):setRow("fail");
    };
    uischema.options.loadFunction?loadFuncCall():callApi();
  }, []);
  const tempColumnComponents = uischema.options.columns.filter((elem:any)=>{
     return elem.widget !== "api"
  })
  const columnApi = uischema.options.columns.filter((elem:any)=>{
    return elem.widget === "api"
 })
  const columnComponents = tempColumnComponents.map(
    (elem: UISchemaElement|any, i: number) => {
      const childPath = composePaths(path, `${i}`);
      return {
        id: `${Math.floor(Math.random() * 100)}`,
        field: `${elem.headerName}`,
        width: "120",
        renderCell: (cellValues: any) => {
          return (
            <JsonFormsDispatch
              schema={schema}
              uischema={{ ...elem.widget }}
              path={childPath}
              key={childPath}
              renderers={renderers}
            />
          );
        },
      }
    }
  );
  const handleSelectionChange = (selection) => {
     updateValue(selection)
  };
  const handleCellClick = (param: any, event: any) => {
    event.stopPropagation();
    console.log(param)
    const data: Array<any> = [param.row];
    if (event.target.type) {
      objFunc.Logic(param.field, dispatch,actions, state,[])
      console.log("I am clicked ")
    }
  };
  return (
    <Paper
      elevation={4}
      sx={{
        height: 500,
        backgroundColor: "#E1EAFC",
        padding: "10px 10px",
        width: "95%",
        margin: "auto auto",
        ...  uischema.options.tableStyle
      }}
    >
      {row === "loading" ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : row === "fail"?(
         <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         <Box sx={{textAlign:"center"}}>No Data Found</Box>
        </Box>
     
      ):(
        <>
        <DataGrid
          rows={row}
          columns={ uischema.options.buttonInStarting?[...columnComponents,...columnApi]:[...columnApi,...columnComponents]}
          pageSize={10}
          onCellClick={handleCellClick}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
          checkboxSelection
          components={{
            Toolbar: GridToolbar,
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          onSelectionModelChange={handleSelectionChange}
          //@ts-ignore
          onRowSelectionModelChange={handleSelectionChange}
       
        />
        </>
      )}
    </Paper>
  );
};

export default DataTable;
