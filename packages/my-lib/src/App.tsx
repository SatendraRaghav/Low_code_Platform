import React, { useState, useEffect, useContext } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialCells } from "@jsonforms/material-renderers";
import LinearProgress from "@mui/material/LinearProgress";
import { renders } from "./renders";
import { DataContext, actions, DataProvider } from "./Context";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams,
// } from "react-router-dom";
// import axios from "axios";

type formDataType = {
  data: {};
};

const App = ({ SchemaJson, UiSchemaJson, objFunc , router}: any) => {
  const styleYourPage =
    UiSchemaJson !== undefined ? UiSchemaJson.pageStyle : {};
  return (
    <DataProvider objFunc={objFunc} router = {router}>
      <div style={{ ...styleYourPage }}>
        <MyForm
          SchemaJson={SchemaJson}
          UiSchemaJson={UiSchemaJson}
          objFunc={objFunc}
          router={router}
        />
      </div>
    </DataProvider>
  );
};
function MyForm({ SchemaJson, UiSchemaJson, objFunc,router }: any) {
 const [formdata, setFormdata] = useState<any>({});
  const { state, dispatch } = useContext(DataContext);
  const changeHandler = (data: any, errors: any) => {
    setFormdata(data);
    dispatch({ type: actions.resetFormData, payload: data });
    console.log(state.formData);
  };
  useEffect(() => {
    setFormdata(state.formData);
  }, [state.changeUrl]);
  useEffect(()=>{
    setFormdata(state.formData);
  })
  return (
    <JsonForms
      data={formdata}
      schema={SchemaJson}
      uischema={UiSchemaJson}
      renderers={renders}
      cells={materialCells}
      onChange={({ data, errors }) => changeHandler(data, errors)}
    />
  );
}

export default App;
