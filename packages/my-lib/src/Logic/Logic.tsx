import axios from "axios";
import initialState from "../Context";
import { actions } from "../Context";


export class LogicHolder{
  eventName:string;
  dispatch:any;
  state:{url:boolean,formData:object,recordsApi:string,graphData:any};
  data:any;
  constructor(eventName:string,dispatch:any=()=>{}, state:{url:boolean,formData:object,recordsApi:string,graphData:any} = initialState, data:any =[]){
    this.eventName = eventName,
    this.dispatch= dispatch,
    this.state = state,
    this.data = data
  }
  Logic(
    ){
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      // if (this.eventName === "submitLoginForm") {
      //   const data = JSON.stringify(this.state.formData);
      //   console.log(data)
      //   const Api = "http://52.183.137.84:8082/hyperform_3/api/auth/login";
      //   const callApi = async () => {
      //     await axios
      //       .post(Api, data, config)
      //       .then((res) => {
      //         // this.dispatch({
      //         //   type: actions.setAccessPermissions,
      //         //   payload: 
      //         //     "_Login:*W*,_Login:LoginButton:*R*"
      //         // });
      //         window.sessionStorage.setItem("token", `${res.data.accessToken}`);
      //         let stateObj = { id: "100" };
      //         window.history.pushState(stateObj, "Page 2", "/Agency/Records");
      //         this.dispatch({ type: actions.changeUrl });
      //       })
      //       .catch((err) => {
      //        window.alert("Invalid username or password");
      //       });
      //   };
      //   callApi();
      // }
      // if (this.eventName === "GoToLoginForm") {
      //   let stateObj = { id: "100" };
      //   window.history.pushState(stateObj, "Page 2", "/Login");
      //   this.dispatch({ type: actions.changeUrl });
      // }
      // if(this.eventName === "GoToDashboard"){
      //   let stateObj = { id: "100" };
      //   window.history.pushState(stateObj, "Page 2", "/Game");
      //   this.dispatch({ type: actions.changeUrl });
      //  }
      // if (this.eventName === "BackToAgencyRecordsPage") {
      //   let stateObj = { id: "100" };
      //   window.history.pushState(stateObj, "Page 2", "/Agency/Records");
      //   this.dispatch({ type: actions.resetFormData, payload: {} });
      //   this.dispatch({ type: actions.changeUrl });
      // }
      // if (this.eventName === "AgencySendForApprover") {
      //   const callApi = async () => {
      //     const data = JSON.stringify(this.state.formData);
      //     try {
      //       const result = axios.post(
      //         "http://52.183.137.84:8082/hyperform_3/api/master/save?masterName=model.master.agency.AgentMasterStaging",
      //         data,
      //         config
      //       );
      //       window.alert("Data submitted successfully")
      //       let stateObj = { id: "100" };
      //       window.history.pushState(stateObj, "Page 2", "/Agency/Records");
      //       this.dispatch({ type: actions.changeUrl })
      //     } catch (err) {
      //       console.log(err)
      //     }
      //   };
      //   callApi();
       
      // }
      // if (this.eventName === "Approve_Records") {
      //   const callApi = async () => {
      //     console.log(this.data[0]);
      //     try {
      //       const Api =
      //         "http://52.183.137.84:8082/hyperform_3/api/master/approve?masterName=model.master.agency.AgentMasterStaging";
      //       const result = await axios.post(Api, JSON.stringify(this.data[0]), config);
      //       console.log("ok");
      //     } catch (err) {}
      //   };
      //   callApi();
      // }
      // if (this.eventName === "Reject_Records") {
      //   const callApi = async () => {
      //     try {
      //       const Api =
      //         "http://52.183.137.84:8082/hyperform_3/api/master/rejected?masterName=model.master.agency.AgentMasterStaging";
      //       const result = await axios.post(Api, JSON.stringify(this.data[0]), config);
      //     } catch (err) {
      //       console.log(`the error of approve --${err}`);
      //     }
      //   };
      //   callApi();
      // }
      // if (this.eventName === "Edit_Records") {
      //   this.data.length>0&&this.dispatch({
      //     type: actions.resetFormData,
      //     payload: { ...this.data[0], docAggrementCopy: "" },
      //   });
      //   function addState() {
      //     let stateObj = { id: "100" };
      //     window.history.pushState(stateObj, "Page 2", "/Agency/Form");
      //   }
      //   addState();
    
      //   this.dispatch({ type: actions.changeUrl });
      // }
    
      // if (this.eventName === "LogoutUser") {
      //   window.sessionStorage.clear();
      //   let stateObj = { id: "100" };
      //   window.history.pushState(stateObj, "Page 2", "/Login");
        
      //   this.dispatch({ type: actions.changeUrl });
      // }
      // if(this.eventName === "Create_Graph"){
      //  console.log(this.data[0])
      //   this.dispatch({ type: actions.setGraphData,payload:[
      //     {x:"Me",y:60},
      //     //@ts-ignore
      //     { x: `${data[0].Users}`, y: data[0].policyComplete
      //   }
      //   ] });
      //   this.dispatch({ type: actions.changeUrl});
      // }
      return;
    };
}
export default LogicHolder;
