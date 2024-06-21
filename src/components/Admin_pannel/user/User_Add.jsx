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
    usernameError: '',
    emailError: '',
    passwordError: '',
    repasswordError: '',
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

    case 'setUsernameError':
      draft.usernameError = action.error;
      break;

    case 'setEmailError':
      draft.emailError = action.error;
      break;

    case 'setPasswordError':
      draft.passwordError = action.error;
      break;

    case 'setRepasswordError':
      draft.repasswordError = action.error;
      break;

  }
}

const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

const navigate = useNavigate();

const validatePassword = (password, username) => {
  const hasTwoAlphabets = /[a-zA-Z].*[a-zA-Z]/.test(password);
  const hasThreeNumbers = /\d.*\d.*\d/.test(password);
  const hasOneSpecialChar = /[^a-zA-Z0-9]/.test(password);
  const isLengthEight = password.length === 8;
  const isNotUsername = password !== username;

  if (!isNotUsername) {
    return 'Password cannot be the same as the username';
  }
  if (!hasTwoAlphabets) {
    return 'Password must contain at least two alphabetic characters';
  }
  if (!hasThreeNumbers) {
    return 'Password must contain at least three numeric characters';
  }
  if (!hasOneSpecialChar) {
    return 'Password must contain at least one special character';
  }
  if (!isLengthEight) {
    return 'Password must be exactly eight characters long';
  }

  return '';

};

const RegisterhandleAdd = (e) => {
  e.preventDefault();
  let valid = true;

  if (state.usernameValue.trim() === '') {
    dispatch({ type: 'setUsernameError', error: 'Username is required' });
    valid = false;
  } else {
    dispatch({ type: 'setUsernameError', error: '' });
  }

  if (state.email.trim() === '') {
    dispatch({ type: 'setEmailError', error: 'Email is required' });
    valid = false;
  } else {
    dispatch({ type: 'setEmailError', error: '' });
  }

  const passwordError = validatePassword(state.password, state.usernameValue);
  if (passwordError) {
    dispatch({ type: 'setPasswordError', error: passwordError });
    valid = false;
  } else {
    dispatch({ type: 'setPasswordError', error: '' });
  }

  if (state.repassword.trim() === '') {
    dispatch({ type: 'setRepasswordError', error: 'Confirmation password is required' });
    valid = false;
  } else {
    dispatch({ type: 'setRepasswordError', error: '' });
  }

  if (state.password !== state.repassword) {
    dispatch({ type: 'setRepasswordError', error: 'Passwords do not match' });
    valid = false;
  }

  if (!valid) {
    toast.error('Please fill out all required fields.');
  } else {
    dispatch({ type: 'changeSendRequest' });
    handleClose(); // Only close the modal if the form is valid
  }
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
        console.log(error.response.data);
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
  <DialogTitle>
    Add User{' '}
    <IconButton style={{ float: 'right' }} onClick={handleClose}>
      <CloseIcon color='primary' />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    <Stack spacing={2} margin={2}>
      <TextField
        variant='outlined'
        label='Username'
        id='username'
        placeholder='Enter username'
        value={state.usernameValue}
        onChange={(e) => dispatch({ type: 'catchUsernameChange', usernameChosen: e.target.value })}
        error={Boolean(state.usernameError)}
        helperText={state.usernameError}
      />

      <TextField
        variant='outlined'
        label='Email'
        id='email'
        placeholder='Enter email'
        value={state.email}
        onChange={(e) => dispatch({ type: 'catchUseremailChange', emailChosen: e.target.value })}
        error={Boolean(state.emailError)}
        helperText={state.emailError}
      />

      <TextField
        variant='outlined'
        label='Password'
        id='password'
        type='password'
        value={state.password}
        onChange={(e) => dispatch({ type: 'catchUserpasswordChange', passwordChosen: e.target.value })}
        error={Boolean(state.passwordError)}
        helperText={state.passwordError}
      />

      <TextField
        variant='outlined'
        label='Confirm Password'
        type='password'
        id='password2'
        placeholder='Confirm password'
        value={state.repassword}
        onChange={(e) => dispatch({ type: 'catchUserrepasswordChange', repasswordChosen: e.target.value })}
        error={Boolean(state.repasswordError)}
        helperText={state.repasswordError}
      />

      <Button color='primary' variant='contained' onClick={RegisterhandleAdd}>
        Submit
      </Button>
    </Stack>
  </DialogContent>
  <ToastContainer />
</Dialog>
);
};

export default User_Add;