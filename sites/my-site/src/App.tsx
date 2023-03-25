import { objFunc } from "./LogicHolder";
import { App } from "my-lib";
import { Schema } from "./UiSchema/Schema";
import { UiSchema } from "./UiSchema/UiSchema";
import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function Apple() {
  // console.log(Router.Link)
  return(
    <Router>
    <Switch>
        <Route exact path="/" 
        children={
       <First 
       objFunc={objFunc}
       SchemaJson={Schema}
       UiSchemaJson={UiSchema}
       />} />
       <Route
         path="/:id"
         children={
           <Child
             objFunc={objFunc}
             SchemaJson={Schema}
             UiSchemaJson={UiSchema}
           />
         }
       />
    </Switch>
     {/* </Routes> */}
   </Router>
  ) 
  
}

function First({ objFunc, UiSchemaJson, SchemaJson }: any) {
  const [UiSchema, setUiSchema] = useState<any>({});
  const [schema, setSchema] = useState<any>({});
  
  useEffect(() => {
  
    setUiSchema(UiSchemaJson.Home);
   setSchema(SchemaJson.Home);
  }, []);
const router = {Link:Link}
  return (
      <div>
      <App UiSchemaJson={UiSchema} SchemaJson={schema} objFunc={objFunc} router={router} />
      </div>
  );
}
function Child({ objFunc, SchemaJson, UiSchemaJson }: any) {
  //@ts-ignore
  let {id} = useParams();
  console.log(id);
  const [UiSchema, setUiSchema] = useState<any>({});
  const [schema, setSchema] = useState<any>({});

  useEffect(() => {
    const myId = id?.replaceAll("/", "_");
    myId && setUiSchema(UiSchemaJson[myId]);
    myId && setSchema(SchemaJson[myId]);
   
  }, [id]);
  const router = {Link:Link}
  return (
    <>
     <App UiSchemaJson={UiSchema} SchemaJson={schema} objFunc={objFunc} router={router} />
    </>
  );
}
export default Apple;






