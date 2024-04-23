import {Box, Avatar, Button, Grid, Paper, TextField, Typography , InputAdornment,Input} from '@mui/material'
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';

import React, { useState ,useEffect,useContext} from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import BackImg from '../assets/img1.jpg';
import '../css/Login.css';
import {useImmerReducer} from 'use-immer';

// Context
import DispatchContxt from '../context/DispatchContxt';
import StateContext from '../context/StateContext';


const Login = () => {

    const [name,setName] = useState("");
    const [password,setpassword] = useState("");

    const navigate = useNavigate()

    const GlobalDispatch = useContext(DispatchContxt)
    const GlobalState = useContext(StateContext)


    
    const initialState= {
      usernameValue:'',
      password:'',
      sendRequest:0,
      token:''

      
  }

  function ReducerFunction(draft,action){
      switch (action.type) {
          case 'catchUsernameChange':
              draft.usernameValue = action.usernameChosen;
              break;

          
          case 'catchUserpasswordChange':
              draft.password = action.passwordChosen;
              break;

          

          case 'changeSendRequest':
              draft.sendRequest = draft.sendRequest+1
              break;

          case 'catchToken':
                draft.token = action.tokenValue
                break;
           
              
      }
}
  const [state,dispatch] = useImmerReducer(ReducerFunction,initialState)
    


    const loginHandle =(e) => {
      e.preventDefault();
      console.log('the form has been submitted')
      dispatch({type:'changeSendRequest'})


   
  };

  useEffect(() => {
       if(state.sendRequest){
          const source = axios.CancelToken.source()
          async function SignIn(){
            try{
              const response = await axios.post('http://127.0.0.1:8000/api-auth-djoser/token/login/',
                {
                username: state.usernameValue,
                password: state.password,
               




            },
            {cancelToken:source.token})
            console.log(response)
            dispatch({type:'catchToken',tokenValue: response.data.auth_token})
            GlobalDispatch({type:'catchToken',tokenValue: response.data.auth_token})
            // navigate('/login')
      

          }catch(error){
            console.log(error.response)
          }
        }
        SignIn()
        return()=>{
          source.cancel();
        }
        }
      }, [state.sendRequest])

      // Get userinfo

      useEffect(() => {
        if (state.token !== '') {
            const source = axios.CancelToken.source();
            async function GetUserInfo() {
                try {
                    const response = await axios.get(
                        'http://127.0.0.1:8000/api-auth-djoser/users/me/',
                        {
                            headers: { Authorization: 'Token ' + state.token } // Add a space between 'Token' and the token value
                            
                        },
                        {
                          cancelToken: source.token,
                        }
                    );
                    console.log(response);
                    GlobalDispatch({type:'userSignIn',usernameInfo:response.data.username,
                    emailInfo:response.data.email,IdInfo:response.data.id})
                    navigate('/');
                } catch (error) {
                    console.log(error.response);
                }
            }
            GetUserInfo();
            return () => {
                source.cancel();
            };
        }
    }, [state.token]);
    
 

  const gridContainerStyle = {
    backgroundImage: `url(${BackImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
};
    const paperStyle={padding:20,height:'50vh', width:'100%', maxWidth:350 ,margin:'20px auto'}
    const avatarStyle = {backgroundColor:'#9d13bf'}
    const btstyle= {margin:'8px 0'}
  return (
    <Grid container justifyContent="center" alignItems="center" sx={gridContainerStyle}>
    <Grid item xs={12} sm={8} md={6} lg={4}>
    <Paper elevation={10} style={paperStyle} sx={{ backgroundColor: '#f4e6fa' }}>
      <Grid align='center'>
      <Avatar style={avatarStyle}><LockPersonOutlinedIcon/> </Avatar>
      <h2 style={{color:'#9d13bf'}}>Login</h2>
      </Grid>
      <TextField label='username' id='username' placeholder='enter username' style={btstyle} fullWidth required value={state.usernameValue} onChange={(e)=>dispatch({type:'catchUsernameChange',usernameChosen:e.target.value})}  />
     
      
                
      <TextField label='password' id='password' placeholder='enter password' type= 'password' style={btstyle} fullWidth required value={state.password} onChange={(e)=>dispatch({type:'catchUserpasswordChange',passwordChosen:e.target.value})}/>

      

      
      <Button   variant="contained" type='Submit' color='primary' style={{btstyle,animation: 'glitter 1.5s infinite'}} fullWidth onClick={loginHandle}> Login
       
      </Button>



        
      <Grid item container justifyContent='center'>
        <Typography >
        Don't have an account yet?
        <Link to="/register"><span style={{ cursor: 'pointer', color: '#9d13bf' }}>Signup</span></Link>
        </Typography>
    </Grid>
      

    </Paper>
</Grid>
</Grid>
  )
}

export default Login
