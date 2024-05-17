import { Avatar, Button, Grid, Paper, TextField, Typography , InputAdornment,Input} from '@mui/material'
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';

import React, { useState ,useEffect,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom';

import {useImmerReducer} from 'use-immer';
import axios from 'axios'

// Context
import DispatchContxt from '../../context/DispatchContxt';
import StateContext from '../../context/StateContext';

const Admin_Login = () => {

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
  

  
  // const dispatch = useDispatch()
  const navigate = useNavigate()

  
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
                  navigate('/dash');
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

  // user login

  async function HandleLogout(){
    const confirmlogout = window.confirm('Are you sure you want to log out')
   if(confirmlogout){
    try{
      const response = await axios.post(
        'http://127.0.0.1:8000/api-auth-djoser/token/logout/',
        GlobalState.userToken, 
        {headers: { Authorization: `Token ${GlobalState.userToken}` },}
    );
    console.log(response)
    GlobalDispatch({type:'logout'})
    navigate('/aboutus')
    
    }catch(e){
      console.log(e.response)
     
    }
   }
  }


  

    const paperStyle={padding:20,height:'60vh', width:'100%', maxWidth:350 ,margin:'20px auto',marginTop:'7rem',marginBottom:'4rem'}
    const avatarStyle = {backgroundColor:'purple'}
    const btstyle= {margin:'8px 0'}
  return (
    <Grid>
    <Paper elevation={10} style={paperStyle}>
      <Grid align='center'>
      <Avatar style={avatarStyle}><LockPersonOutlinedIcon/> </Avatar>
      <h2 style={{color:'purple'}}>Admin Login</h2>
      </Grid>
     
      <TextField label='Admin username ' placeholder='enter username' style={btstyle} fullWidth required value={state.usernameValue} onChange={(e)=>dispatch({type:'catchUsernameChange',usernameChosen:e.target.value})} />
     
      
                
      <TextField label=' Admin password' placeholder='enter password' type= 'password' style={{ ...btstyle, marginBottom: '30px' }}  fullWidth required value={state.password} onChange={(e)=>dispatch({type:'catchUserpasswordChange',passwordChosen:e.target.value})}/>

      {/* <FormControlLabel required control={<Checkbox />} label="Remember me" /> */}

     <Link to ="/dash"><Button variant="contained" type='Submit' color='primary' style={btstyle} fullWidth onClick={loginHandle}>
        Login</Button></Link>

    </Paper>
</Grid>
  )
}

export default Admin_Login


