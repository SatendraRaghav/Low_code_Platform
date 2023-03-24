import axios from "axios";
import { rootUrl } from "../constant";

let fileUploadResponse: any = null;
export const programComboLoadFunction = (state: any)=>{
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${rootUrl}/program/getAll`,
      headers: {},
      data: data,
    };

    const result = axios
      .request(config)
      .then((response: any) => {
        const result2 = response.data.payload.map((elem: any) => {
          return { label: elem.name, value: elem.id };
        });
        return result2;
      })
      .catch((error) => {
        console.log(error);
        return [{}];
      });
    return result;
}

export const  typeLoadFunction =  (state: any) => {
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${rootUrl}/program/getById?id=${
        state.formData.headerWrapper
          ? state.formData.headerWrapper[0].programType[0]
          : undefined
      } `,
      headers: {},
      data: data,
    };

    const result: any = axios
      .request(config)
      .then((response: any) => {
        const result = JSON.parse(response.data.payload.config);
        const finalResult = result.features.externalData.supportedTypes;
        return finalResult.map((elem: any) => {
          return { label: elem, value: elem };
        });
      })
      .catch((error) => {
        return [{}];
      });

    return result;
  }

  export const fileSaveFunction = (event: any, dispatch: any, actions: any, state: any) => {
    const tempArr = event.target.files[0].name.split(".");
    const formData = new FormData();
    formData.append(
      "metadata",
      JSON.stringify({
        payload: {
          name: event.target.files[0].name,
          type: tempArr[tempArr - 1],
        },
      })
    );
    formData.append("file", event?.target.files[0]);

    const response = axios
      .post(`${rootUrl}/externalData/save`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      .then((response: any) => {
        fileUploadResponse = response.data;
        window.alert("Data Submit Succussfully");
      })
      .catch((error) => {
        console.log(error);
        return [{}];
      });
  }

  export const tableLoadFunction = (ApiDetails: any) => {
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${rootUrl}/externalData/getAll?withData=false`,
      headers: {},
      data: data,
    };

    const result = axios
      .request(config)
      .then((response: any) => {
        const result = response.data.payload;
        return result.map((elem: any) => {
          const timestamp = elem.createdOn;
          const date = new Date(timestamp);
          const dateString = date.toLocaleString();
          return { ...elem, createdOn: dateString };
        });
      })
      .catch((error) => {
        console.log(error);
        return [{}];
      });
    return result;
  }

 export const Load_External_Data = (
    state: {
      url: boolean;
      formData: any;
      recordsApi: string;
      graphData: any;
    },
    dispatch:any,
    actions:any
  ) => {
      dispatch({type:actions.notify,payload:true})
      let data2 = JSON.stringify({
        payload: {
          externalDataId: state.formData.headerWrapper
            ? state.formData.headerWrapper[0].programType
            : null,
          programId: fileUploadResponse?.payload,
        },
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${rootUrl}/externalData/load`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data2,
      };

      axios
        .request(config)
        .then((response) => {
          window.alert("Data Loaded Successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    export const View_File = (
    )=>{
         // dispatch({type:actions.notify,payload:true})
      const download = (obj: any) => {
        // Convert object to file
        const typeArr = obj.name.split(".");
        const data = JSON.stringify(obj);
        const file = new Blob([data], { type: typeArr[typeArr.length - 1] });

        // Create URL for file
        const url = URL.createObjectURL(file);

        // Create a download link
        const link = document.createElement("a");
        link.href = url;
        link.download = `${obj.name}`;
        document.body.appendChild(link);
        link.click();

        // Clean up the URL and link
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      };
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://52.183.128.14:8081/externalData/getById?withData=false&id=2",
        headers: {},
        data: " ",
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data.payload);
          download(response.data.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }