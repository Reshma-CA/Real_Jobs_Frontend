import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Typography, InputBase, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Admin_Navbar from '../Admin_Navbar';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Add_Profile from './Add_Profile';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import { REACT_APP_API_URL } from '../../Api_Constant';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const columns = [
  { id: 'id', label: 'Id', minWidth: 100 },
  { id: 'job_provider_username', label: 'Job Provider', minWidth: 100 },
  { id: 'agency_name', label: 'Agency name', minWidth: 100 },
  { id: 'phone_number', label: 'Phone Number', minWidth: 100 },
  { id: 'bio', label: 'Bio', minWidth: 100 },
  { id: 'profile_picture', label: 'Profile Picture', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 100 },
];

const Profile_user = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [allListing, setAllListing] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function getAllListings() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ProfileAdmin/', { cancelToken: source.token });
        setAllListing(response.data);
        setSearchResults(response.data);
        setDataIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }
    getAllListings();
    return () => {
      source.cancel();
    }
  }, []);

  
 // Pagination state
const [page, setPage] = useState(1);
const itemsPerPage = 8; // Number of items per page

const pageCount = Math.ceil(searchResults.length / itemsPerPage);

const handlePageChange = (event, value) => {
  setPage(value);
};

  // serch

  const handleSearch = (value) => {
    setInput(value);
    const filteredResults = allListing.filter((item) => {
      return (
        (item.job_provider_username && item.job_provider_username.toLowerCase().includes(value.toLowerCase())) ||
        (item.agency_name && item.agency_name.toLowerCase().includes(value.toLowerCase())) ||
        (item.phone_number && item.phone_number.toLowerCase().includes(value.toLowerCase())) ||
        (item.bio && item.bio.toLowerCase().includes(value.toLowerCase()))
      );
    });
    setSearchResults(filteredResults);
    setPage(1); // Reset to the first page on new search
  };
 // Delete 
  const DeleteAction = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${REACT_APP_API_URL}/api/ProfileAdminedit/${id}/`)
          .then(res => {
            toast.success('Deleted successfully!');
            setAllListing(prev => prev.filter(user => user.id !== id));
            setSearchResults(prev => prev.filter(user => user.id !== id));
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

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
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={input}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
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
                  searchResults.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.job_provider_username}</TableCell>
                      <TableCell>{row.agency_name}</TableCell>
                      <TableCell>{row.phone_number}</TableCell>
                      <TableCell>{row.bio}</TableCell>
                      <TableCell>
                        {row.profile_picture ? (
                          <img src={row.profile_picture} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        ) : (
                          <Typography>No Picture</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link to={`/edit_profile/${row.id}`}>
                          <Button sx={{ cursor: 'pointer', backgroundColor: '#34c762', marginBottom: 2 }} variant="contained">
                            <ModeEditIcon />
                          </Button>
                        </Link>
                        <Button sx={{ cursor: 'pointer', backgroundColor: '#e31f0e' }} variant="contained" onClick={() => DeleteAction(row.id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack spacing={2} style={{ alignItems: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Stack>

        </Paper>
        <Add_Profile open={openAddModal} handleClose={handleCloseAddModal} />
      </Box>
    </Box>
  );
};

export default Profile_user;