import React, { useContext, useEffect } from "react";
import {
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  Paper,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { DataContext } from "../../../Context";
import {
  checkDisableCondition,
  checkHiddenCondition,
  checkInputFieldValidation,
} from "../../utils/Permission";

export default function CustomRadio({ data, value, updateValue, path }: any) {
  const [apiOption, setApiOption] = React.useState<Array<any>>([]);
  const { dispatch, state } = useContext(DataContext);
  const pagePath = window.location.pathname.replaceAll("/", "_");
  useEffect(() => {
    console.log("value ="  + value)
    setApiOption(data.content.options)
    const apiCall = async () => {
      const result: any = await axios.get(data.content.optionApi);
      console.log(result);
      const arr = result.data.map((elem: any) => {
        return elem.name;
      });
      setApiOption(arr);
    };
    data.content.optionApi ? apiCall() : setApiOption(data.content.options);
  }, []);
  // setApiOption(data.content.options)
  const validate  = checkInputFieldValidation(value,data);
  const hidden = 
  checkHiddenCondition(
    pagePath,
    path,
    state.accessPermissions
  );
  return (
    <Paper
      elevation={2}
      sx={{ width: "80%", margin: "auto auto", ...data.style }}
    >
      {hidden ? (
        <></>
      ) : (
        <>
          {validate[0]}
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              disabled={checkDisableCondition(
                pagePath,
                path,
                state.accessPermissions
              )}
              sx={{ paddingLeft: "20px" }}
            >
              {data.content.label}
            </FormLabel>
            <RadioGroup
              sx={{ paddingLeft: "20px" }}
              row
              value={value}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => {
                updateValue(e.target.value);
              }}
            >
              {apiOption.map((elem: any, i: number) => (
                <FormControlLabel
                  value={elem}
                  control={<Radio  value={elem} />}
                  label={elem}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </>
      )}
    </Paper>
  );
}
