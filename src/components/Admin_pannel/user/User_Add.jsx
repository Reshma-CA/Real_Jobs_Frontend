import React, { useState,useEffect, useLayoutEffect  } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Stack, TextField, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useImmerReducer} from 'use-immer';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../../Api_Constant'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User_Add = ({ open, handleClose }) => {

  const { id } = useParams();

  const initialState= {
    usernameValue:'',
    email:'',
    password:'',
    repassword:'',
    sendRequest: 0,
}

function ReducerFunction(draft, action) {
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
      draft.sendRequest = draft.sendRequest + 1;
      break;
  }
}

const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

const navigate = useNavigate();

const RegisterhandleAdd = (e) => {
  e.preventDefault();
  dispatch({ type: 'changeSendRequest' });
};

useEffect(() => {
  if (state.sendRequest) {
    const source = axios.CancelToken.source();
    async function Signup() {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api-auth-djoser/users/',
          {
            username: state.usernameValue,
            email: state.email,
            password: state.password,
            re_password: state.repassword,
          },
          { cancelToken: source.token }
        );
       
        
        navigate(0);
        toast.success('User created successfully!');
      } catch (error) {
        toast.error('User not created ');
        console.log(error.response);
      }
    }
    Signup();
    return () => {
      source.cancel();
    };
  }
}, [state.sendRequest]);



return (
  <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
    <DialogTitle>Add User <IconButton style={{ float: 'right' }} onClick={handleClose}><CloseIcon color='primary' /></IconButton></DialogTitle>
    <DialogContent>
      <Stack spacing={2} margin={2}>
        <TextField variant='outlined' label='Username' id='username' placeholder='Enter username' value={state.usernameValue} onChange={(e) => dispatch({ type: 'catchUsernameChange', usernameChosen: e.target.value })} />
        <TextField variant='outlined' label='Email' id='email' placeholder='Enter email' value={state.email} onChange={(e) => dispatch({ type: 'catchUseremailChange', emailChosen: e.target.value })} />
        <TextField variant='outlined' label='Password' id='password' placeholder='Enter password' value={state.password} onChange={(e) => dispatch({ type: 'catchUserpasswordChange', passwordChosen: e.target.value })} />
        <TextField variant='outlined' label='Confirm Password' id='password2' placeholder='Confirm password' value={state.repassword} onChange={(e) => dispatch({ type: 'catchUserrepasswordChange', repasswordChosen: e.target.value })} />
        <Button color='primary' variant='contained' onClick={(e) => { handleClose(); RegisterhandleAdd(e); }}>Submit</Button>

      </Stack>
    </DialogContent>
  </Dialog>
);
};

export default User_Add;