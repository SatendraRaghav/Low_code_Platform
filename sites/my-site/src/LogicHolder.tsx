import axios from "axios";
import { rootUrl } from "./constant";
import { programComboLoadFunction } from "./Logic/ExternalDataLogic";
import { typeLoadFunction } from "./Logic/ExternalDataLogic";
import { fileSaveFunction } from "./Logic/ExternalDataLogic";
import { tableLoadFunction } from "./Logic/ExternalDataLogic";
import { Load_External_Data } from "./Logic/ExternalDataLogic";
import { View_File } from "./Logic/ExternalDataLogic";

export const objFunc = {
  programComboLoadFunction: async (state: any) => {
     const value =  await programComboLoadFunction(state)
     return value;
  },
  typeLoadFunction: async (state: any) => {
     const value = await typeLoadFunction(state);
     return value;
  },
  fileSaveFunction: (event: any, dispatch: any, actions: any, state: any) => {
    fileSaveFunction(event, dispatch, actions, state)
  },
  tableLoadFunction: async (ApiDetails: any) => {
    const value = await tableLoadFunction(ApiDetails)
    return value
  },
  Logic: (
    eventName: string,
    dispatch: any,
    actions: any,
    state: {
      url: boolean;
      formData: any;
      recordsApi: string;
      graphData: any;
      notify:any
    },
    data: any
  ) => {
    if (eventName === "Load_External_Data") {
      console.log(state.formData)
      dispatch({type:actions.resetFormData,payload:{input:'RAghav',radio:'YES',programType:[{label:"DSL",value:1}],agencyType:'default'}})
      // dispatch({type:actions.notifyChange,payload:{...state.notify,success:!(state.notify.success)}})

    }
    if (eventName === "Download_File") {
      dispatch({type:actions.notifyChange,payload:{...state.notify,fail:!(state.notify.fail)}})
  }
}};
