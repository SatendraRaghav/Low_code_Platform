import { useContext, useState } from 'react';
import { Card, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataContext,actions } from '../../../Context';
import { checkDisableCondition,checkHiddenCondition,checkInputFieldValidation } from "../../utils/Permission";


const CustomInput = ({ data, value, updateValue,path }: any) => {
     const {  state } = useContext(DataContext);
     const [demoValue,setDemoValue] = useState(value)
     const pagePath = window.location.pathname.replaceAll("/", "_");
     const validate  = checkInputFieldValidation(demoValue,data);
     const hidden =
       checkHiddenCondition(pagePath,path,state.accessPermissions);
     return (
     <Paper elevation={2} sx={{ width: "80%", margin: "auto auto",...data.style }} >
      {hidden?(<></>):
             <>
               {
                   validate[0]   
               }
               {
                    validate[1]
               }
               <TextField
                    required={data.content.required}
                    fullWidth
                    // onChange={(e) => updateValue(e.target.value)}
                    // value={value}
                    value = {demoValue}
                    onChange={(e)=>setDemoValue(e.target.value)}
                    onBlur= {(e)=>updateValue(demoValue)}
                    onPointerLeave={(e)=>updateValue(demoValue)}
                    disabled={checkDisableCondition(pagePath,path,state.accessPermissions)}
                  
                    label={data.content.label}
                    helperText={data.content.helperText}
                    size={data.content.size}
                    type={data.content.type}
                    variant={data.content.variant}
                    color={data.content.required && (value === "" || value === undefined) ? "error" : "primary"}

               >
               </TextField>
               </>

        
             }
               </Paper>
     )
}

export default CustomInput