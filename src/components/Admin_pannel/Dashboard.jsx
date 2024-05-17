
import React from 'react';
import { Box, Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, Typography } from '@mui/material';
import imageSrc from '../../assets/graph-wiki_ver_1.png';
import Admin_Navbar from './Admin_Navbar'; 
// frontend\job\src\assets\graph-wiki_ver_1.png
const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Admin_Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "20px" }}>
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 15, marginRight: 5, marginBottom: '200px' }}>

        
         <Box >
         <img src={imageSrc} alt="Your Image"  /> {/* Add your image here */}
         </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
