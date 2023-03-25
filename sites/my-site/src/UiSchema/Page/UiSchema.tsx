export const pageUiSchema = {
    type: "HorizontalLayout",
    pageApi:
      "http://52.183.137.84:8080/hyperform_2/api/master/getDetails?masterName=model.master.agency.AgentMasterStaging",
    elements: [
      {
        "type": "Control",
        "scope": "#/properties/radio",
        "layout": 6,
        "options": {
          "widget": "RadioInputField"
        },
        "value": {
          "content": {
            "label": "Active",
            "options": ["YES", "NO"],
            "required": true
          }
        }
      },
  
      {
        type: "Control",
        scope: "#/properties/input",
        options: {
          widget: "InputField",
        },
        value: {
          content: {
            label: "Type",
            // programType:true,
            // conditionalLoadFunction:"typeLoadFunction",
            required: true,
          },
          style: {
            marginTop: "35px",
          },
        },
      },
      
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
      },
      {
        type: "Control",
        scope: "#/properties/LoginPage",
        options: {
          widget: "Button",
        },
        layout: {
          xs: 12,
          sm: 7,
          md: 4,
          lg: 4,
        },
        value: {
          content: {
            name: "Load",
            variant: "contained",
            color: "info",
            type: "text",
            eventName:"Load_External_Data",
            size: "large",
            page:'page2'
          },
          style: {
            textAlign: "right",
          },
        },
      }
]}

export const page2UiSchema = {
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
    },
    {
      type: "Control",
      scope: "#/properties/LoginPage",
      options: {
        widget: "Button",
      },
      layout: {
        xs: 12,
        sm: 7,
        md: 4,
        lg: 4,
      },
      value: {
        content: {
          name: "Load2",
          variant: "contained",
          color: "info",
          type: "text",
          eventName:"Load_External_Data",
          size: "large",
          page:'Home'
        },
        style: {
          textAlign: "right",
        },
      },
    }
]}