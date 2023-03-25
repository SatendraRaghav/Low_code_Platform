import React, { useState, useEffect, useContext } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialCells } from "@jsonforms/material-renderers";
import LinearProgress from "@mui/material/LinearProgress";
import { renders } from "./renders";
import { Box, Skeleton, Typography, TypographyProps } from "@mui/material";
import { DataContext, actions, DataProvider } from "./Context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";

type formDataType = {
  data: {};
};

const App = ({ SchemaJson, UiSchemaJson, objFunc}: any) => {
  console.log(UiSchemaJson);
  return (
    <DataProvider objFunc={objFunc}>
        <Router>
         <Switch>
             <Route exact path="/" 
             children={
            <First 
            objFunc={objFunc}
            SchemaJson={SchemaJson}
            UiSchemaJson={UiSchemaJson}
            />} />
            <Route
              path="/:id"
              children={
                <Child
                  objFunc={objFunc}
                  SchemaJson={SchemaJson}
                  UiSchemaJson={UiSchemaJson}
                />
              }
            />
         </Switch>
          {/* </Routes> */}
        </Router>
    </DataProvider>
  );
};

function First({ objFunc, UiSchemaJson, SchemaJson }: any) {
  const {state, dispatch } = useContext(DataContext);
  const [UiSchema, setUiSchema] = useState<any>({});
  const [schema, setSchema] = useState<any>({});
  const [formdata, setFormdata] = useState<any>({});
  useEffect(() => {
  
    setUiSchema(UiSchemaJson.Home);
   setSchema(SchemaJson.Home);
  }, [state.changeUrl]);

  const changeHandler = (data: any, errors: any) => {
    setFormdata(data);
    dispatch({ type: actions.resetFormData, payload: data });
    // console.log(state.formData)
  };
  useEffect(()=>{
    setFormdata(state.formData)
  },[state.changeUrl])
  return (
      <div>
        <JsonForms
          data={formdata}
          schema={schema}
          uischema={UiSchema}
          renderers={renders}
          cells={materialCells}
          onChange={({ data, errors }) => changeHandler(data, errors)}
        />
      </div>
  );
}
function Child({ objFunc, SchemaJson, UiSchemaJson }: any) {
  console.log(UiSchemaJson);
  //@ts-ignore
  let {id} = useParams();
  console.log(id);
  const [UiSchema, setUiSchema] = useState<any>({});
  const [schema, setSchema] = useState<any>({});
  const {state, dispatch } = useContext(DataContext);
  const [formdata, setFormdata] = useState({} as formDataType);


  const changeHandler = (data: any, errors: any) => {
   
    setFormdata(data);
    dispatch({ type: actions.resetFormData, payload: data });
    console.log(state.formData)
  };
  useEffect(() => {
    setFormdata(state.formData)
    const myId = id?.replaceAll("/", "_");
    myId && setUiSchema(UiSchemaJson[myId]);
    myId && setSchema(SchemaJson[myId]);
   
  }, [id,state.changeUrl]);

  const styleYourPage =
    UiSchemaJson !== undefined ? UiSchemaJson.pageStyle : {};
  return (
    <React.Fragment>
        <div style={{ ...styleYourPage }}>
            <JsonForms
              data={formdata}
              schema={schema}
              uischema={UiSchema}
              renderers={renders}
              cells={materialCells}
              onChange={({ data, errors }) => changeHandler(data, errors)}
            />
        </div>
    </React.Fragment>
  );
}

export default App;

