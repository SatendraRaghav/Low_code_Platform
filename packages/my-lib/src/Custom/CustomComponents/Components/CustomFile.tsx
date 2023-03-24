import { IconButton, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { actions, DataContext } from '../../../Context';
import { checkDisableCondition, checkHiddenCondition, checkInputFieldValidation } from '../../utils/Permission';

const CustomFile = ({ data, value, updateValue,path }: any) => {
  const {  state,objFunc,dispatch } = useContext(DataContext);
  const pagePath = window.location.pathname.replaceAll("/", "_");  
  const saveData = (event: any) => {
      const callApi= async(event)=>{
     await objFunc[`${data.content.loadFunction}`](event,dispatch,actions,state);
      }
      callApi(event)
  }
  const validate  = checkInputFieldValidation(value,data);
  const hidden =
   checkHiddenCondition(pagePath,path,state.accessPermissions);
  return (
    <Paper elevation={6} sx={{ width: "90%",margin: "15px auto", outline:`1px solid ${data.content.required&&(value===""||value === undefined)?"red":"inherit"}`,outlineOffset:5,  border: "3px solid whitesmoke", borderBottom: "none",backgroundColor:"#DFEBF7",...data.style }} >
     {hidden?(<></>):(
     <>
     {
       validate[0]          
     }
      <Typography variant={data.content.typoVariant||"overline"} component="div" sx={{ marginLeft: "15px", color: "gray" }}>{data.content.required?data.content.label:`${data.content.label}*`}</Typography>
      <TextField
        required={data.content.required}
        fullWidth
        onChange={(e) => {
          updateValue(e.target.value)
          saveData(e)

        }}
        value={value}
        disabled={checkDisableCondition(pagePath,path,state.accessPermissions)}
        color='primary'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" >
              <AttachFileIcon />
            </InputAdornment>
          ),
        }}
        helperText={data.content.helperText}
        size={data.content.size || "medium"}
        type={"file"}
      >
      </TextField>
      {value &&
        <IconButton color="error" onClick={() => updateValue("")}><DeleteIcon /></IconButton>
      }
     </>
     )} 
    </Paper>
  )

}

export default CustomFile