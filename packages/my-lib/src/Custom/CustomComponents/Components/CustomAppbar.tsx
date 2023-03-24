import Button from '@mui/material/Button';
import React,{useContext} from 'react';
import { Box } from '@mui/system';
import {
  Link,
} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { LogicHolder } from '../../../Logic/Logic';
import { actions, DataContext } from '../../../Context';
import Logo from "../../../assets/Act21-logo.png"

export const CustomAppbar = ({Data}:any)=>{
  const { dispatch,state,objFunc} = useContext(DataContext);
  // console.log(objFunc.Logic(Data.content.eventName, dispatch,actions, state,[]))
     return(
      <Box sx={{ flexGrow: 1 ,marginBottom:"2vh",...Data.style}}>
      <AppBar position="static"  color={Data.content.color||'primary'}>
        <Toolbar>
          <IconButton
            size="large"
            color={"inherit"}
            sx={{width:"20vw",paddingLeft:"150px", mr: 2,}}
          >
           <img src={Logo} alt="company Image" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Link to={`/${Data.content.page}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained"   color={Data.content.color||'primary'} sx={{display:{xs:"none",sm:"inline-block"}}}  
          onClick = {
            ()=>
            {
              // const Temp =  new LogicHolder(Data.content.eventName, dispatch, state,[]);
              // Temp.Logic()
              // console.log("I am clicked ")
              objFunc.Logic(Data.content.eventName, dispatch,actions, state,[])
            }}
            >{Data.content.ButtonName
            }</Button>
            </Link>
        </Toolbar>
      </AppBar>
    </Box>
    ) 
  }