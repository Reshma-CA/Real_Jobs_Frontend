import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Typography, InputBase, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Admin_Navbar from '../Admin_Navbar';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { REACT_APP_API_URL } from '../../Api_Constant';
import 'react-toastify/dist/ReactToastify.css';
import User_Add from './User_Add';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const columns = [
  { id: 'id', label: 'Id', minWidth: 100 },
  { id: 'username', label: 'Username', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'Action', label: 'Action', minWidth: 100 },
];

const Admin_User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [AllListing, setAllListing] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  const pageCount = Math.ceil(searchResults.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/userdetails/', { cancelToken: source.token });
        setAllListing(response.data);
        setSearchResults(response.data);
        setDataIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }
    GetAllListings();
    return () => {
      source.cancel();
    }
  }, []);

  const handleSearch = (value) => {
    setInput(value);
    if (value) {
      const filteredResults = AllListing.filter((user) =>
        user.username && user.username.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(AllListing);
    }
    setPage(1); // Reset to the first page on new search
  };

  const DeleteAction = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want delete this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${REACT_APP_API_URL}/api/userAdminedit/${id}/`)
          .then(res => {
            toast.success('Deleted successfully!');
            setAllListing(prev => prev.filter(user => user.id !== id));
            setSearchResults(prev => prev.filter(user => user.id !== id));
          })
          .catch(error => {
            toast.error('Failed to delete user.');
          });
      }
    });
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

          {/* Start of Search button */}
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
          >
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
          {/* End of Search button */}

          <TableContainer sx={{ marginTop: 5, marginLeft: '7rem' }}>
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
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <Link to={`/edit/${row.id}`}>
                          <Button sx={{ marginLeft: 5, cursor: 'pointer', backgroundColor: '#34c762' }} variant="contained">
                            <ModeEditIcon />
                          </Button>
                        </Link>
                        <Button
                          sx={{ marginLeft: 3, cursor: 'pointer', backgroundColor: '#e31f0e' }}
                          variant="contained"
                          onClick={() => DeleteAction(row.id)}
                        >
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

        <User_Add open={openAddModal} handleClose={handleCloseAddModal} />
      </Box>
    </Box>
  );
};

export default Admin_User;
 