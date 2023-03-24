import React from 'react';
import Button from "@mui/material/Button";
import {
  Link
} from "react-router-dom";
import  { useContext } from "react";
// import { LogicHolder } from "../../../Logic/Logic";
import { DataContext,actions } from "../../../Context";
import { checkDisableCondition,checkHiddenCondition } from "../../utils/Permission";


// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export  const CustomButton = ({ data, path }: any) => {
  const { dispatch, state,objFunc } = useContext(DataContext);

  const pagePath = window.location.pathname.replaceAll("/", "_");
  const hidden =
   checkHiddenCondition(pagePath,path,state.accessPermissions);
  return (
    <div style={{ width: "100%", margin: "auto auto", ...data.style }}>
      {hidden? (
        <></>
      ) : (
        <>
 
         {    
         data.content.page?
          <Link to={`/${data.content.page}`} style={{ textDecoration: 'none' }} >
        <Button
          fullWidth
          type={data.content.type}
          color={data.content.color}
          variant={data.content.variant}
           disabled={checkDisableCondition(pagePath,path,state.accessPermissions)}
          hidden
          size={data.content.size || "medium"}
          onClick={(e) => {
          objFunc.Logic(data.content.eventName, dispatch,actions, state,[])
          console.log("I am clicked Button")

          }}
        >
  
          {data.content.name}
    
        </Button>
        </Link>:
          <Button
          fullWidth
          type={data.content.type}
          color={data.content.color}
          variant={data.content.variant}
           disabled={checkDisableCondition(pagePath,path,state.accessPermissions)}
          hidden
          size={data.content.size || "medium"}
          onClick={(e) => {
          objFunc.Logic(data.content.eventName, dispatch,actions, state,[])
          console.log("I am clicked Button")
          }}
        >
  
          {data.content.name}
    
        </Button>
        }
        </>
      )}
    </div>
  );
};
