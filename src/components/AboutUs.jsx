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
          margin: 'auto', // Center the Box on the page
          borderRadius: '8px', // Add rounded corners for a polished look
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' // Add a subtle shadow for depth
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 'bold', color:'#cf1b6c' }} pt={1}>
          Welcome to Realjobs
        </Typography>
        <Typography variant='body1' sx={{ color: '#333', mt: 2, fontWeight: 'bold' }}>
          This platform for skilled professionals for all your home service needs. Whether you need a plumber, electrician, painter, coconut plucker, or cleaner, we've got you covered.
        </Typography>
        <Typography variant='body1' sx={{ color: '#333', mt: 2 ,fontWeight: 'bold'}}>
          Our mission is to connect you with reliable and experienced tradespeople who can efficiently handle any job you need done around your house.
        </Typography>
      </Box>

      </Box>
      <Footer/>
    </Box>
  );
};



export default AboutUs