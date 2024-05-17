
import React from 'react';
import { Box, Button, Paper, TableContainer, Table, TableHead, TableRow,TableBody, TableCell, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Admin_Navbar from '../Admin_Navbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Add_Profile from './Add_Profile';
import Edit_Profile from './Edit_Profile'

const columns = [
  { id: 'id', label: 'Id', minWidth: 100 },
  { id: 'Job Provider', label: 'Job Provider', minWidth: 100 },
  { id: 'Agency name', label: 'Agency name', minWidth: 100 },
  { id: 'phone number', label: 'phone number', minWidth: 100 },
  { id: 'bio', label: 'bio', minWidth: 100 },
  { id: 'profile picture', label: 'profile picture', minWidth: 100 },

  { id: 'Action', label: 'Action', minWidth: 100 },

];

const Profile_user = () => {

  const navigate = useNavigate();

  const [AllListing, setAllListing] = React.useState([]);
  const [dataIsLoading, setDataIsLoading] = React.useState(true);

  const [openAddModal, setOpenAddModal] = useState(false);

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };


  // get all list data

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ProfileAdmin/', { cancelToken: source.token });
        setAllListing(response.data);
        setDataIsLoading(false);
        // rowChange(response)
        console.log(response)
      } catch (error) {
        console.log(error.response);
      }
    }
    GetAllListings();
    return () => {
      source.cancel();
    }
  }, []);


  return (
    <Box sx={{ display: 'flex' }}>
      <Admin_Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "20px" }}>
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 15, marginRight: 5, marginBottom: '200px' }}>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: 15 }}>
            <Button variant="contained" endIcon={<AddCircleOutlineIcon />} onClick={handleOpenAddModal}>
              Add
            </Button>
          </Box>

              {/* Start of Search button */}

    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
    >

      <InputBase
        sx={{ ml: 1, flex: 1}}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>

    </Paper>

    {/* End of Search button */}


      <TableContainer sx={{ marginTop: 5, marginLeft: '0.1rem' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataIsLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              AllListing.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row["id"]}</TableCell>
                  <TableCell>{row["job_provider_username"]}</TableCell>
                  <TableCell>{row["agency_name"]}</TableCell>
                  <TableCell>{row["phone_number"]}</TableCell>
                  <TableCell>{row["bio"]}</TableCell>
                  <TableCell>
                  {/* Render the profile picture */}
                  {row["profile_picture"] ? (
                    <img src={row["profile_picture"]} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  ) : (
                    <Typography>No Picture</Typography>
                  )}
                </TableCell>

                  <TableCell>
                    {/* Action buttons */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Button sx={{ cursor: 'pointer', backgroundColor: '#34c762', marginBottom: 2 }} variant="contained" onClick={() => handleAction(row.id)}>
                    <ModeEditIcon />
                  </Button>

                  <Button sx={{ cursor: 'pointer', backgroundColor: '#e31f0e' }} variant="contained" onClick={() => handleAction(row.id)}>
                    <DeleteIcon />
                  </Button>
                </Box>


                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

        </Paper>
        <Add_Profile open={openAddModal} handleClose={handleCloseAddModal}/>
      </Box>
    </Box>
  );
};






export default Profile_user