import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Autocomplete,
  TextField,
  Checkbox,
} from "@mui/material";
import { DataContext } from "../../../Context";
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  checkDisableCondition,
  checkHiddenCondition,
} from "../../utils/Permission";
import { Theme, useTheme } from '@mui/material/styles';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;




export  default function CustomSelect({ data, value, updateValue, path }: any) {
const  [apiOption, setApiOption] = React.useState<Array<any>>([]);
  const {  state,objFunc,dispatch } = useContext(DataContext);
  const [call,setCall] = useState(false);
  const pagePath = window.location.pathname.replaceAll("/", "_");
  useEffect(() => {
    data.content.options && setApiOption(data.content.options)
    const apiCall =  async() => {
      const returnValue =  await objFunc[`${data.content.loadFunction}`](state);
      returnValue && setApiOption(returnValue)
    };
    data.content.loadFunction && apiCall()
  }, []);
 useEffect(()=>{
  const ConditionCall =  async() => {
    const returnValue =  await objFunc[`${data.content.conditionalLoadFunction}`](state);
    returnValue && setApiOption(returnValue)
  };
  data.content.conditionalLoadFunction && ConditionCall()
 },[call])

  const hidden =
   checkHiddenCondition(pagePath, path, state.accessPermissions);
  return (
    <Paper
      elevation={2}
      sx={{ width: "80%", margin: "auto auto", ...data.style }}
    >
      {hidden ? (
        <></>
      ) : (
        <>
          <FormControl fullWidth={true}>
            {
              data.content.multiple?
              <Autocomplete
              onChange={(event, newValue) => {
                const value = newValue.map((elem) => {
                  return elem;
                });
                updateValue(value);
               }}
              multiple
              disableCloseOnSelect
              id="tags-standard"
              options={apiOption}
              getOptionLabel={(option) => {
                return option.label;
              }}
              defaultValue={value}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label={data.content.label}
                  placeholder={data.content.placeholder}
                />
              )}
            />
              :
              <>
              <InputLabel id="demo-simple-select-label" variant={data.content.variant}>
              {data.content.label}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              disabled={checkDisableCondition(
                pagePath,
                path,
                state.accessPermissions
              )}
              label={data.content.label}
              onFocus={()=>data.content.conditionalLoadFunction && setCall(call => !call)}
              onMouseOver={()=>data.content.conditionalLoadFunction && setCall(call => !call)}
              onChange={(e) =>updateValue(e.target.value)}
            >
              {apiOption.map((elem:any, i: number) => (
                <MenuItem key={elem.label+i} value={elem.value}>
                  {elem.label}
                </MenuItem>
              ))}
            </Select>
            </>
           }
          </FormControl>
        </>
      )}
    </Paper>
  );
}
