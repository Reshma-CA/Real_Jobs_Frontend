import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Box, Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { Link, useNavigate } from 'react-router-dom';
import BackImg from '../assets/img1.jpg';
import '../css/Register.css';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';
import { toast } from 'react-toastify';
import { useImmerReducer } from 'use-immer';

const Register = () => {
    const initialState = {
        usernameValue: '',
        email: '',
        password: '',
        repassword: '',
        sendRequest: 0,
        usernameError: '',
        emailError: '',
        passwordError: '',
        repasswordError: '',
    };

    function ReducerFunction(draft, action) {
        switch (action.type) {
            case 'catchUsernameChange':
                draft.usernameValue = action.usernameChosen;
                draft.usernameError = ''; // Reset error on change
                break;

            case 'catchUseremailChange':
                draft.email = action.emailChosen;
                draft.emailError = ''; // Reset error on change
                break;

            case 'catchUserpasswordChange':
                draft.password = action.passwordChosen;
                draft.passwordError = ''; // Reset error on change
                break;

            case 'catchUserrepasswordChange':
                draft.repassword = action.repasswordChosen;
                draft.repasswordError = ''; // Reset error on change
                break;

            case 'changeSendRequest':
                draft.sendRequest += 1;
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

            default:
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
    const navigate = useNavigate();

    const validatePassword = (password, username) => {
        const hasTwoAlphabets = /[a-zA-Z].*[a-zA-Z]/.test(password);
        const hasThreeNumbers = /\d.*\d.*\d/.test(password);
        const hasThreeSpecialChars = /[^a-zA-Z0-9]/.test(password);
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
        if (!hasThreeSpecialChars) {
            return 'Password must contain at least one special characters';
        }
        if (!isLengthEight) {
            return 'Password must be exactly eight characters long';
        }

        return '';
    };

    const Registerhandle = (e) => {
        e.preventDefault();
        let valid = true;

        if (state.usernameValue.trim() === '') {
            dispatch({ type: 'setUsernameError', error: 'Username is required' });
            valid = false;
        }

        if (state.email.trim() === '') {
            dispatch({ type: 'setEmailError', error: 'Email is required' });
            valid = false;
        }

        const passwordError = validatePassword(state.password, state.usernameValue);
        if (passwordError) {
            dispatch({ type: 'setPasswordError', error: passwordError });
            valid = false;
        }

        if (state.repassword.trim() === '') {
            dispatch({ type: 'setRepasswordError', error: 'Confirmation password is required' });
            valid = false;
        }

        if (state.password !== state.repassword) {
            dispatch({ type: 'setRepasswordError', error: 'Passwords do not match' });
            valid = false;
        }

        if (valid) {
            dispatch({ type: 'changeSendRequest' });
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
                    toast.success('Profile created successfully!');
                    navigate('/login');
                } catch (error) {
                    toast.error('Failed to create profile');
                    console.log(error.response);
                }
            }
            Signup();
            return () => {
                source.cancel();
            };
        }
    }, [state.sendRequest]);

    const paperStyle = {
        padding: 20,
        height: '80vh',
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

    return (
        <div>
            <NavBar />
            <Grid container justifyContent="center" alignItems="center" sx={gridContainerStyle}>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper elevation={10} style={paperStyle} sx={{ backgroundColor: '#f4e6fa' }}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockPersonOutlinedIcon /></Avatar>
                            <h2 style={{ color: '#9d13bf' }}>Sign Up</h2>
                        </Grid>
                        <TextField
                            label='Username'
                            id='username'
                            placeholder='enter username'
                            style={btstyle}
                            fullWidth
                            required
                            value={state.usernameValue}
                            onChange={(e) => dispatch({ type: 'catchUsernameChange', usernameChosen: e.target.value })}
                            error={Boolean(state.usernameError)}
                            helperText={state.usernameError}
                        />
                        <TextField
                            label='Email'
                            id='email'
                            placeholder='enter email'
                            style={btstyle}
                            fullWidth
                            required
                            value={state.email}
                            onChange={(e) => dispatch({ type: 'catchUseremailChange', emailChosen: e.target.value })}
                            error={Boolean(state.emailError)}
                            helperText={state.emailError}
                        />
                        <TextField
                            label='Password'
                            id='password'
                            placeholder='enter password'
                            type='password'
                            style={btstyle}
                            fullWidth
                            required
                            value={state.password}
                            onChange={(e) => dispatch({ type: 'catchUserpasswordChange', passwordChosen: e.target.value })}
                            error={Boolean(state.passwordError)}
                            helperText={state.passwordError}
                        />
                        <TextField
                            label='Confirm Password'
                            id='password2'
                            placeholder='enter confirm password'
                            type='password'
                            style={btstyle}
                            fullWidth
                            required
                            value={state.repassword}
                            onChange={(e) => dispatch({ type: 'catchUserrepasswordChange', repasswordChosen: e.target.value })}
                            error={Boolean(state.repasswordError)}
                            helperText={state.repasswordError}
                        />
                        <Button
                            variant="contained"
                            type='Submit'
                            style={{ ...btstyle, backgroundColor: '#9d13bf', animation: 'glitter 1.5s infinite' }}
                            fullWidth
                            onClick={Registerhandle}
                        >
                            Sign Up
                        </Button>
                        <Grid item container justifyContent='center'>
                            <Typography>
                                Already a member?
                                <Link to="/login"><span style={{ cursor: 'pointer', color: '#9d13bf' }}>Login</span></Link>
                            </Typography>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
        </div>
    );
}

export default Register;
