import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";
import { DataContext } from "../../../Context";
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  checkDisableCondition,
  checkHiddenCondition,
} from "../../utils/Permission";
import { Theme, useTheme } from '@mui/material/styles';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


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
                  return elem.value;
                });
                updateValue(value);
               }}
              multiple
              id="tags-standard"
              options={apiOption}
              getOptionLabel={(option) => {
                return option.label;
              }}
              // defaultValue={}
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
