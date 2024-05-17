import React, { useState,useEffect, useLayoutEffect  } from 'react';
import axios from "axios";
import { Box, Avatar, Button, Grid, Paper, TextField, Typography, InputAdornment, Input } from '@mui/material';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit_Profile = () => {
  return (
    <div>
        
        {/* <Grid container justifyContent="center" alignItems="center" sx={gridContainerStyle}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={10} style={paperStyle} sx={{ backgroundColor: '#f4e6fa' }}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockPersonOutlinedIcon /></Avatar>
                        <h2 style={{ color: '#9d13bf' }}>Sign Up</h2>
                    </Grid>
                    <TextField label='Username' id='username' placeholder='enter username' style={btstyle} fullWidth required  />                    
                    <TextField label='email' id='email' placeholder='enter email' style={btstyle} fullWidth required  />
                    <TextField label='password' id='password' placeholder='enter password' type='password' style={btstyle} fullWidth required  />
                    <TextField label='Confirm password' id='password2' placeholder='enter Confirm password' type='password' style={btstyle} fullWidth required  />
                    <Button variant="contained" type='Submit' style={{ btstyle, backgroundColor: '#9d13bf', animation: 'glitter 1.5s infinite' }} fullWidth onClick={Registerhandle}>Sign Up</Button>
                    <Grid item container justifyContent='center'>
                        <Typography >
                            Already a member?
                            <Link to="/login"><span style={{ cursor: 'pointer', color: '#9d13bf' }}>Login</span></Link>
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid> */}

        </div>
  )
}

export default Edit_Profile