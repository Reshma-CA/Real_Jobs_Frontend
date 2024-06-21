import React from 'react'
import { Grid, Card, CircularProgress, Typography, CardHeader, CardMedia, Box, CardContent, CardActions, IconButton, Button } from '@mui/material';

import NavBar from '../../layouts/NavBar';
import Footer from '../../layouts/Footer';

const Email_info = () => {
  return (
    <div>
    <NavBar/>
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Box
          sx={{
            width: { xs: '90%', sm: '70%', md: '50%', lg: '40%' },
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
          }}
        >
            <Box style={{width:'100%', border:'2px solid black', padding:'5px',backgroundColor:'#f0b6db',}}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#0a0a0a' }} pt={1}>
            Thanks for Signing up! To activate your account , please click on the link that has been sent to you!
          </Typography>
          </Box>
        </Box>
      </Grid>
      <Footer/>
      </div>
  )
}

export default Email_info