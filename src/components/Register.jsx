import React, { useState,useEffect, useLayoutEffect  } from 'react';
import axios from "axios";
import { Box, Avatar, Button, Grid, Paper, TextField, Typography, InputAdornment, Input } from '@mui/material';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, useNavigate } from 'react-router-dom';
import BackImg from '../assets/img1.jpg';
import '../css/Register.css';
import {useImmerReducer} from 'use-immer';



const Register = () => {
    

    const initialState= {
        usernameValue:'',
        email:'',
        password:'',
        repassword:'',
        sendRequest:0,

        
    }

    function ReducerFunction(draft,action){
        switch (action.type) {
            case 'catchUsernameChange':
                draft.usernameValue = action.usernameChosen;
                break;          

            case 'catchUseremailChange':
                    draft.email = action.emailChosen;
                    break;

            case 'catchUserpasswordChange':
                draft.password = action.passwordChosen;
                break;

            case 'catchUserrepasswordChange':
                draft.repassword = action.repasswordChosen;
                break;

            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest+1
                break;
           
                
        }
}
    const [state,dispatch] = useImmerReducer(ReducerFunction,initialState)

    const navigate = useNavigate()

    const Registerhandle = (e) => {
        e.preventDefault();
        console.log('the form has been submitted')
        dispatch({type:'changeSendRequest'})
    }


    const paperStyle = {
        padding: 20,
        height: '70vh',
        width: '100%',
        maxWidth: 380,
        margin: '20px auto',

    };

    const avatarStyle = { backgroundColor: '#9d13bf' };
    const btstyle = { margin: '8px 0' };
    const gridContainerStyle = {
        backgroundImage: `url(${BackImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };

    useEffect(() => {
        if(state.sendRequest){
          const source = axios.CancelToken.source()
          async function Signup(){
            try{
              const response = await axios.post('http://127.0.0.1:8000/api-auth-djoser/users/',
                {
                username: state.usernameValue,
                email: state.email,
                password: state.password,
                re_password: state.repassword,




            },
            {cancelToken:source.token})
            console.log(response)
            navigate('/login')
      
    
          }catch(error){
            console.log(error.response)
          }
        }
        Signup()
        return()=>{
          source.cancel();
        }
        }
       }, [state.sendRequest])

    return (
        <Grid container justifyContent="center" alignItems="center" sx={gridContainerStyle}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={10} style={paperStyle} sx={{ backgroundColor: '#f4e6fa' }}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockPersonOutlinedIcon /></Avatar>
                        <h2 style={{ color: '#9d13bf' }}>Sign Up</h2>
                    </Grid>
                    <TextField label='Username' id='username' placeholder='enter username' style={btstyle} fullWidth required value={state.usernameValue} onChange={(e)=>dispatch({type:'catchUsernameChange',usernameChosen:e.target.value})} />                    
                    <TextField label='email' id='email' placeholder='enter email' style={btstyle} fullWidth required value={state.email} onChange={(e)=>dispatch({type:'catchUseremailChange',emailChosen:e.target.value})} />
                    <TextField label='password' id='password' placeholder='enter password' type='password' style={btstyle} fullWidth required value={state.password} onChange={(e)=>dispatch({type:'catchUserpasswordChange',passwordChosen:e.target.value})} />
                    <TextField label='Confirm password' id='password2' placeholder='enter password' type='password' style={btstyle} fullWidth required  value={state.repassword} onChange={(e)=>dispatch({type:'catchUserrepasswordChange',repasswordChosen:e.target.value})}/>
                    <Button variant="contained" type='Submit' style={{ btstyle, backgroundColor: '#9d13bf', animation: 'glitter 1.5s infinite' }} fullWidth onClick={Registerhandle}>Sign Up</Button>
                    <Grid item container justifyContent='center'>
                        <Typography >
                            Already a member?
                            <Link to="/login"><span style={{ cursor: 'pointer', color: '#9d13bf' }}>Login</span></Link>
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Register;
