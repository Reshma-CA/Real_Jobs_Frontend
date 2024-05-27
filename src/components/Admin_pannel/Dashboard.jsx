
import React from 'react';
import { Box, Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, Typography } from '@mui/material';
import imageSrc from '../../assets/graph-wiki_ver_1.png';
import Admin_Navbar from './Admin_Navbar'; 
import JobClickGraph from './Graph/JobClickGraph';
const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Admin_Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "20px" }}>
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 15, marginRight: 5, marginBottom: '200px' }}>

        
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "20px" }}>
                <JobClickGraph/>
                
            </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
