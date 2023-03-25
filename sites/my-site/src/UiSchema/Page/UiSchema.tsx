export const pageUiSchema = {
    type: "HorizontalLayout",
    pageApi:
      "http://52.183.137.84:8080/hyperform_2/api/master/getDetails?masterName=model.master.agency.AgentMasterStaging",
    elements: [
    {
        type: "Control",
        scope: "#/properties/programType",
        layout: {
          xs: 12,
          sm: 3,
          md: 2,
          lg: 2,
        },
        options: {
          widget: "SelectInputField",
        },
        value: {
          content: {
            label: "Program",
            variant:"standard",
            multiple:true,
            loadFunction:"programComboLoadFunction",
            color:"secondary",
            required: true,
          },
          style: {
            padding:"5px 0 0 5px"
          },
        },
      },
      {
        type: "Control",
        scope: "#/properties/agencyType",
        layout: {
          xs: 12,
          sm: 3,
          md: 2,
          lg: 2,
        },
        options: {
          widget: "SelectInputField",
        },
        value: {
          content: {
            label: ".  Hello",
            options: [{label:"maker",value:"default"}],
            variant:"standard",
            required: true,
          },
          style: {
            padding:"5px 0 0 5px"
          },
        },
      }
]}