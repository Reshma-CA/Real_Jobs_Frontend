import { Box, Avatar, Button, Grid, Paper, TextField, Typography, InputAdornment, Input, Icon } from '@mui/material';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BackImg from '../assets/img1.jpg';
import '../css/Login.css';
import { useImmerReducer } from 'use-immer';
import GoogleAuth from './GoogleAuth';
import { toast } from 'react-toastify';

// Context
import DispatchContxt from '../context/DispatchContxt';
import StateContext from '../context/StateContext';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';

const Login = () => {
  const navigate = useNavigate();
  const GlobalDispatch = useContext(DispatchContxt);
  const GlobalState = useContext(StateContext);

  const initialState = {
    usernameValue: '',
    password: '',
    sendRequest: 0,
    token: '',
    usernameError: '',
    passwordError: ''
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case 'catchUsernameChange':
        draft.usernameValue = action.usernameChosen;
        draft.usernameError = ''; // Reset error on change
        break;

      case 'catchUserpasswordChange':
        draft.password = action.passwordChosen;
        draft.passwordError = ''; // Reset error on change
        break;

      case 'changeSendRequest':
        draft.sendRequest = draft.sendRequest + 1;
        break;

      case 'catchToken':
        draft.token = action.tokenValue;
        break;

      case 'setUsernameError':
        draft.usernameError = action.error;
        break;

      case 'setPasswordError':
        draft.passwordError = action.error;
        break;

      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  const loginHandle = (e) => {
    e.preventDefault();
    let valid = true;

    if (state.usernameValue.trim() === '') {
      dispatch({ type: 'setUsernameError', error: 'Username is required' });
      valid = false;
    }

    if (state.password.trim() === '') {
      dispatch({ type: 'setPasswordError', error: 'Password is required' });
      valid = false;
    }

    if (valid) {
      dispatch({ type: 'changeSendRequest' });
    }
  };

  useEffect(() => {
    if (state.sendRequest) {
      const source = axios.CancelToken.source();
      async function SignIn() {
        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/api-auth-djoser/token/login/',
            {
              username: state.usernameValue,
              password: state.password
            },
            { cancelToken: source.token }
          );
          console.log(response);
          dispatch({ type: 'catchToken', tokenValue: response.data.auth_token });
          GlobalDispatch({ type: 'catchToken', tokenValue: response.data.auth_token });
        } catch (error) {
          toast.error('Failed to Login');
          console.log(error.response);
        }
      }
      SignIn();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);

  useEffect(() => {
    if (state.token !== '') {
      const source = axios.CancelToken.source();
      async function GetUserInfo() {
        try {
          const response = await axios.get(
            'http://127.0.0.1:8000/api-auth-djoser/users/me/',
            {
              headers: { Authorization: 'Token ' + state.token },
              cancelToken: source.token
            }
          );
          console.log(response);
          GlobalDispatch({
            type: 'userSignIn',
            usernameInfo: response.data.username,
            emailInfo: response.data.email,
            IdInfo: response.data.id
          });
          // toast.success('Login successfully!');
          navigate('/');
        } catch (error) {
          toast.error('Failed to Login');
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
    minHeight: '100vh'
  };

  const paperStyle = { padding: 20, height: '60vh', width: '100%', maxWidth: 350, margin: '20px auto' };
  const avatarStyle = { backgroundColor: '#9d13bf' };
  const btstyle = { margin: '8px 0' };

  return (
    <div>
      <NavBar />
      <Grid container justifyContent="center" alignItems="center" sx={gridContainerStyle}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={10} style={paperStyle} sx={{ backgroundColor: '#f4e6fa' }}>
            <Grid align="center">
              <Avatar style={avatarStyle}><LockPersonOutlinedIcon /></Avatar>
              <h2 style={{ color: '#9d13bf' }}>Login</h2>
            </Grid>
            <TextField
              label="username"
              id="username"
              placeholder="enter username"
              style={btstyle}
              fullWidth
              required
              value={state.usernameValue}
              onChange={(e) => dispatch({ type: 'catchUsernameChange', usernameChosen: e.target.value })}
              error={Boolean(state.usernameError)}
              helperText={state.usernameError}
            />
            <TextField
              label="password"
              id="password"
              placeholder="enter password"
              type="password"
              style={btstyle}
              fullWidth
              required
              value={state.password}
              onChange={(e) => dispatch({ type: 'catchUserpasswordChange', passwordChosen: e.target.value })}
              error={Boolean(state.passwordError)}
              helperText={state.passwordError}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{ ...btstyle, animation: 'glitter 1.5s infinite' }}
              fullWidth
              onClick={loginHandle}
            >
              Login
            </Button>
            <GoogleAuth />
            <Grid item container justifyContent="center">
              <Typography>
                Don't have an account yet?
                <Link to="/register">
                  <span style={{ cursor: 'pointer', color: '#9d13bf' }}> Signup</span>
                </Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Login;
