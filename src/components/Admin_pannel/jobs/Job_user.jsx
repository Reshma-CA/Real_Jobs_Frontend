import React from 'react';
import { Box, Button, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Admin_Navbar from '../Admin_Navbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { REACT_APP_API_URL } from '../../Api_Constant';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Add_job from './Add_job';

const columns = [
    { id: 'id', label: 'Id', minWidth: 100 },
    { id: 'Job Provider', label: 'Job Provider', minWidth: 100 },
    { id: 'title', label: 'title', minWidth: 100 },
    { id: 'description', label: 'description', minWidth: 100 },
    { id: 'area', label: 'area', minWidth: 100 },
    { id: 'borough', label: 'borough', minWidth: 100 },
    { id: 'listing type', label: 'listing type', minWidth: 100 },
    { id: 'price', label: 'price', minWidth: 100 },
    { id: 'latitude', label: 'latitude', minWidth: 100 },
    { id: 'longitude', label: 'longitude', minWidth: 100 },
    { id: 'published at', label: 'published at', minWidth: 100 },
    { id: 'picture1', label: 'picture1', minWidth: 100 },
    { id: 'Action', label: 'Action', minWidth: 100 },
];

const Job_user = () => {

    const navigate = useNavigate();

    const [input, setInput] = useState('');
    const [AllListing, setAllListing] = useState([]);
    const [dataIsLoading, setDataIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    // Pagination state
    const [page, setPage] = useState(1);
    const itemsPerPage = 8; // Number of items per page

    // Calculate total number of pages
    const pageCount = Math.ceil(searchResults.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSearch = (value) => {
        setInput(value);
        const filteredResults = AllListing.filter((item) => (
            (item.job_provider_username && item.job_provider_username.toLowerCase().includes(value.toLowerCase())) ||
            (item.title && item.title.toLowerCase().includes(value.toLowerCase()))
        ));
        setSearchResults(filteredResults);
        setPage(1); // Reset to the first page on new search
    };

    // get all list data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${REACT_APP_API_URL}/api/Listing/`);
                setAllListing(response.data);
                setSearchResults(response.data);
                setDataIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const [openAddModal, setOpenAddModal] = useState(false);

    const handleOpenAddModal = () => {
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
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
                axios.delete(`${REACT_APP_API_URL}/api/jobEdit/${id}/`)
                    .then(res => {
                        toast.success('Deleted successfully!');
                        setAllListing(prev => prev.filter(user => user.id !== id));
                        setSearchResults(prev => prev.filter(user => user.id !== id));
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
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
                                    searchResults.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row["id"]}</TableCell>
                                            <TableCell>{row["job_provider_username"]}</TableCell>
                                            <TableCell>{row["title"]}</TableCell>
                                            <TableCell>{row["description"]}</TableCell>
                                            <TableCell>{row["area"]}</TableCell>
                                            <TableCell>{row["borough"]}</TableCell>
                                            <TableCell>{row["listing_type"]}</TableCell>
                                            <TableCell>{row["price"]}</TableCell>
                                            <TableCell>{row["latitude"]}</TableCell>
                                            <TableCell>{row["longitude"]}</TableCell>
                                            <TableCell>{row["published_at"]}</TableCell>
                                            <TableCell>
                                                {row["picture1"] ? (
                                                    <img src={row["picture1"]} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                                ) : (
                                                    <Typography>No Picture</Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/edit_job/${row.id}`}><Button sx={{ cursor: 'pointer', backgroundColor: '#34c762', marginBottom: 2 }} variant="contained">
                                                    <ModeEditIcon />
                                                </Button></Link>
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
                <Add_job open={openAddModal} handleClose={handleCloseAddModal} />
            </Box>
        </Box>
    );
};

export default Job_user;
