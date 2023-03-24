import React, { useReducer, createContext, useMemo } from "react";
export const DataContext = createContext< any>({
  url:false,
  isDataChange:false,
  formData:{ 
  },
  graphData:null,
  accessPermissions: ["_Agency_Form:*:","_Agency_Records:*:R","_Agency_Form:venndorCode:W"],
  recordsApi:" ",
}); 
export const actions = {
    changeUrl:"changeUrl",
    resetFormData:"resetFormData",
    resetRecordsApi:"recordsApi",
    changeStatus:"changeStatus",
    dataChange:"dataChange",
    setAccessPermissions:"setPermission",
    setGraphData:"setGraphData",
    notifyChange:"notifyChange",
    setRowSelectionData:"setRowSelectionData"
  }
 export const initialState = {
  url:false,
  isDataChange:false,
  notify:{success:false,fail:false,info:false},
  formData:{ 
  },
  rowSelctionData:[],
  graphData:null,
  accessPermissions: ["_Agency_Form:*:","_Agency_Records:*:R","_Agency_Form:venndorCode:W"],
  recordsApi:" ",
};
const reducer = (state:any, action:any) => {
    switch (action.type) {
        case actions.changeUrl:
          return {
           ...state,url:!(state.url)
          };
          case actions.notifyChange:
          return {
           ...state,notify:action.payload
          };
          case actions.dataChange:
          return {
           ...state,isDatachange:!(state.isDataChange)
          };
          case actions.resetFormData:
          return {
           ...state,formData:action.payload
          };
          case actions.setAccessPermissions:
          return {
           ...state,accessPermissions:action.payload
          };
          case actions.setRowSelectionData:
            return {
             ...state,rowSelctionData:action.payload
            };
          case actions.resetRecordsApi:
          return {
           ...state,recordsApi:action.payload
          };
          case actions.setGraphData:
            return {
             ...state,graphData:action.payload
            };
          case actions.changeStatus:
          return {
           ...state,status:action.payload
          };
        default:
          return state;
  }
};
export const DataProvider = ({ children,objFunc }:any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch};
  }, [state, dispatch]);
return (
    <DataContext.Provider value={{...contextValue, objFunc:objFunc}}>
      {children}
    </DataContext.Provider>
  );
};
export default initialState;
