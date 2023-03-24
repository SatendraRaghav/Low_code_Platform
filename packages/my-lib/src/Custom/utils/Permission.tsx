import { Card, Typography } from "@mui/material";
let Permissions:Array<string> ;

export const checkDisableCondition = (
  pagePath: string,
  path: string,
  accessPermissions: Array<string>
) => {
  let isDisableComponent;
  if (Permissions.indexOf(`${pagePath}:${path}:R`) > -1) {
    isDisableComponent = true;
  } else if (Permissions.indexOf(`${pagePath}:${path}:W`) > -1) {
    isDisableComponent = false;
  } else if (Permissions.indexOf(`${pagePath}:*:R`) > -1) {
    isDisableComponent = true;
  } else if (Permissions.indexOf(`${pagePath}:*:W`) > -1) {
    isDisableComponent = false;
  }

  // return isDisableComponent;
  return false
};

export const checkHiddenCondition = (
  pagePath: string,
  path: string,
  accessPermissions: Array<string>
) => {
  let isHiddenComponent = false;
  Permissions = accessPermissions.filter((elem)=>{
        return elem.includes(`${pagePath}:`)
  })
  if (Permissions.indexOf(`${pagePath}:${path}:`) > -1) {
    isHiddenComponent = true;
  } 
  // return isHiddenComponent;
  return false
};

export const checkInputFieldValidation = (value: any, data: any) => {
  const required = data.content.required === true &&
    (value === "" || value === undefined) && (
      <Card
        sx={{
          width: "100%",
          marginBottom: "8px",
          backgroundColor: "#DFEBF7",
          textAlign: "center",
        }}
      >
        <Typography
          variant="caption"
          color="error"
        >{`${data.content.label} Can't be Empty !`}</Typography>
      </Card>
    );
  const regex = typeof data.content === "object" &&
    typeof data.content.customValidate === "object" &&
    value !== undefined &&
    value !== null &&
    value !== "" &&
    (value.length > data.content.customValidate.max ||
      value.length < data.content.customValidate.min ||
      value.length !== data.content.customValidate.length ||
      (data.content.customValidate.logic &&
        new RegExp(
          JSON.parse(JSON.stringify(data.content.customValidate)).logic.slice(
            1,
            -1
          )
        ).test(value) === false)) && (
      <Card
        sx={{ width: "100%", backgroundColor: "#F2F7FF", textAlign: "center" }}
      >
        <Typography
          variant="caption"
          color="error"
        >{`Invalid ${data.content.label} `}</Typography>
      </Card>
    );
  return [required, regex];
};
