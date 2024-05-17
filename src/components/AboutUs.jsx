import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import HomeImg from '../assets/image14.jpg';
import { useState,useEffect } from 'react';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';

const AboutUs = () => {
  
 
  

  return (
    <Box>
      <NavBar/>
      
      <Typography align='center' variant='h4' sx={{ fontWeight: 800 }}> About <span style={{ color: 'red' }}>us</span> </Typography>
      <Typography align='center' variant='h6' sx={{ fontWeight: 'bold', color: '#bd0886' }}> "Ready for a New Job? Start Your Search Here!"</Typography>
      <Box
        sx={{
          backgroundImage: `url(${HomeImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'black',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          minHeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: { xs: '90%', sm: '70%', md: '50%', lg: '40%' },
            padding: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 'bold', color:'#cf1b6c' }} pt={1}>
          Realjobs Tech Solutions is a leading job provideing company specializing in cutting-edge 
          solutions for the healthcare industry. With a focus on innovation and quality, 
          we strive to empower healthcare providers with advanced technology to improve job care and streamline operations.
          </Typography>
          
        </Box>
      </Box>
      <Footer/>
    </Box>
  );
};



export default AboutUs