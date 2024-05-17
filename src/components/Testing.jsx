
// import React from 'react';
// import { Box, Button, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Typography } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import Admin_Navbar from '../Admin_Navbar';
// import InputBase from '@mui/material/InputBase';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import axios from "axios";
// import { Link } from 'react-router-dom';
// import { useImmerReducer } from 'use-immer';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import User_Add from './User_Add';
// import Edit_User from './Edit_User';
// import { useParams } from 'react-router-dom';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { REACT_APP_API_URL } from '../../Api_Constant';

// import { useEffect } from'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Swal from 'sweetalert2';
// const columns = [
//   { id: 'id', label: 'Id', minWidth: 100 },
//   { id: 'name', label: 'Name', minWidth: 100 },
//   { id: 'email', label: 'Email', minWidth: 100 },
//   { id: 'Action', label: 'Action', minWidth: 100 },

// ];

// const Testing = () => {

//   const { id } = useParams();

//   const navigate = useNavigate();

//   const[input,setInput] = useState('')
//   const [searchResults, setSearchResults] = useState([]);
//   const [AllListing, setAllListing] = React.useState([]);
//   const [dataIsLoading, setDataIsLoading] = React.useState(true);

//   // ////////////////////////////////////////////////////////////////
//    // Add user Modal
//   const [openAddModal, setOpenAddModal] = useState(false); 
//   // get all list data

//   const handleOpenAddModal = () => {
//     setOpenAddModal(true);
//   };

//   const handleCloseAddModal = () => {
//     setOpenAddModal(false);
//   };

 

//   React.useEffect(() => {
//     const source = axios.CancelToken.source();
//     async function GetAllListings() {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/userdetails/', { cancelToken: source.token });
//         setAllListing(response.data);
//         setSearchResults(response.data); // Initialize search results with all listings
//         setDataIsLoading(false);
//         // rowChange(response)
//         // console.log(response)
//       } catch (error) {
//         console.log(error.response);
//       }
//     }
//     GetAllListings();
//     return () => {
//       source.cancel();
//     }
//   }, []);

 

 
//   const handleSearch = (value) => {
//     setInput(value);
//     if (value) {
//       const filteredResults = AllListing.filter((user) => 
//         user.username && user.username.toLowerCase().includes(value.toLowerCase())
//       );
//       setSearchResults(filteredResults);
//     } else {
//       setSearchResults(AllListing); // Show all listings if search input is empty
//     }
//   };


//   const DeleteAction = (id) => {
//     // Show confirmation dialog
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want delete this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // If confirmed, proceed with deletion
//         axios.delete(`${REACT_APP_API_URL}/api/ProfileAdminedit/${id}/`)
//           .then(res => {
//             console.log(res.data);
//             toast.success('Deleted successfully!');
//             navigate(0); // Navigate to the user page
//           })
//           .catch(error => {
//             console.log('Error deleting user:', error);
//             toast.error('Failed to delete user.');
//           });
//       }
//     });
//   };

//   // const DeleteAction = async (id) => {


//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Admin_Navbar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "20px" }}>
//         <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 15, marginRight: 5, marginBottom: '200px' }}>

//          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: 15 }}>
//             <Button variant="contained" endIcon={<AddCircleOutlineIcon />} onClick={handleOpenAddModal}>
//               Add
            
//             </Button>
//           </Box>
 

//               {/* Start of Search button */}

//     <Paper
//       component="form"
//       sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
//     >

//       <InputBase
//         sx={{ ml: 1, flex: 1}}
//         placeholder="Search"
//         inputProps={{ 'aria-label': 'search google maps' }}
//         value={input}
//         onChange={(e) => handleSearch(e.target.value)}
//       />
   
//       <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//         <SearchIcon />
//       </IconButton>

//     </Paper>

//     {/* End of Search button */}

//     {/* Display search results */}
//     <div className="results-list">
//         {dataIsLoading ? (
//           <p>Loading...</p>
//         ) : searchResults.length > 0 ? (
//           searchResults.map((user) => (
//             <div key={user.id}>
//               <p>{user.username}</p> {/* Display username or other relevant information */}
//             </div>
//           ))
//         ) : (
//           <p>No results found</p>
//         )}
//       </div>
    

//   <TableContainer sx={{marginTop: 5 ,marginLeft:'7rem'}}>
//             <Table stickyHeader aria-label="sticky table">
//               <TableHead>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         {column.label}
//                       </Typography>
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {dataIsLoading ? (
//                   <TableRow>
//                     <TableCell colSpan={columns.length} align="center">
//                       Loading...
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   AllListing.map((row) => (
//                     <TableRow key={row.id}>
//                       <TableCell>{row.id}</TableCell>
//                       <TableCell>{row.username}</TableCell>
//                       <TableCell>{row.email}</TableCell>
//                       <TableCell>
//                         {/* Action buttons */}
//                         <Link to={`/edit/${row.id}`}><Button sx={{marginLeft: 5,cursor: 'pointer', backgroundColor: '#34c762'}} variant="contained" >
//                           <ModeEditIcon/>
//                         </Button></Link>


//                         <Button  sx={{marginLeft: 3,cursor: 'pointer', backgroundColor: '#e31f0e'}} variant="contained" onClick={() => DeleteAction(row.id)}>
//                         <DeleteIcon/>
//                         </Button>

//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//         <User_Add open={openAddModal} handleClose={handleCloseAddModal} />

//       </Box>
//     </Box>
//   );
// };



// export default Testing
