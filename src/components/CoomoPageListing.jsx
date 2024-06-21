import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, Box, Paper, InputBase, CardHeader, CardMedia, CardContent, CircularProgress, IconButton, Typography, Button, CardActions, Pagination, Stack } from '@mui/material';
import { useNavigate ,Link} from 'react-router-dom';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import Filter from './Filter/Filter';
import { toast } from 'react-toastify';

const CoomoPageListing = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [allListing, setAllListing] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  const navigate = useNavigate();
  // const [openAddModal, setOpenAddModal] = useState(false);

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/Listing/', { cancelToken: source.token });
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (value) => {
    setInput(value);
    const filteredResults = allListing.filter((item) => (
      (item.job_provider_username && item.job_provider_username.toLowerCase().includes(value.toLowerCase())) ||
      (item.title && item.title.toLowerCase().includes(value.toLowerCase()))
    ));
    setSearchResults(filteredResults);
    setPage(1); // Reset to the first page on new search
  };

  const handleJobClick = async (Id) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/track_click/${Id}/`);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  if (dataIsLoading) {
    return (
      <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  // Calculate total number of pages
  const pageCount = Math.ceil(searchResults.length / itemsPerPage);

  return (
    <div>
      <Grid container spacing={2}>
        <NavBar />

        <Grid container style={{ width: '100%', marginBottom: '1rem', padding: '5px', backgroundColor: '#9cbcf0', marginTop: '0.5rem' }}>
          <Grid item xs={12} sm={6}>
            <Grid item container direction="column" xs={12} sm={5}>
              <Grid item>
                <Typography variant='h5' style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <FilterListIcon onClick={handleOpenAddModal} style={{ cursor: 'pointer' }} /> <span style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleOpenAddModal}>Filter</span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', width: 300 }}>
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
          </Grid>
        </Grid>

        {searchResults.length > 0 ? (
          searchResults.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((lists) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={lists.id}>
              <Card sx={{ border: '1px solid black', height: 580, width: 365, margin: '10px' }}>
                <CardHeader title={<Typography variant="h6" sx={{ fontSize: '20px' }}>{lists.title}</Typography>} />
                <CardMedia
                  component="img"
                  height="200"
                  image={lists.picture1}
                  alt={lists.title}
                />
                <Box sx={{ marginBottom: '0.5rem' }}>
                  <Typography style={{
                    position: 'absolute',
                    backgroundColor: '#991dbf',
                    zIndex: '1000',
                    color: 'white',
                  }}>Rs :{lists.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} per day!</Typography>
                </Box>

                <CardContent sx={{ maxHeight: '100px', marginTop: '1rem' }}>
                  <Typography variant="body2">
                    {lists.description.substring(0, 100)}...
                  </Typography>
                </CardContent>

                <CardActions>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton aria-label='add to favorites' disableRipple style={{ pointerEvents: 'none' }}>
                        <Typography variant="body1" style={{ marginRight: '8px' }}>
                          Job Publisher:
                        </Typography>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          {lists.job_provider_username}
                        </Typography>
                      </IconButton>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton aria-label='share' disableRipple style={{ pointerEvents: 'none' }}>
                        <Typography variant="body1" style={{ marginRight: '8px' }}>
                          Job Publishing Date:
                        </Typography>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          {lists.published_at_date}
                        </Typography>
                      </IconButton>
                    </div>
                  </div>
                </CardActions>

                <Link to={`/listings/${lists.id}`} onClick={() => handleJobClick(lists.id)}>
                  <Button className="glitter"
                    variant='contained'
                    sx={{
                      mt: 2,
                      mb: 4,
                      width: '100%',
                      backgroundColor: '#e15cf2',
                      color: '#1a1819',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#7d1c7d',
                      },
                    }}
                  >
                    More Details!
                  </Button>
                </Link>
              </Card>
            </Grid>
          ))
        ) : (
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
              <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#cf1b6c' }} pt={1}>
                No Result available
              </Typography>
            </Box>
          </Grid>
        )}

        <Stack spacing={2} style={{ alignItems: 'center', marginTop: '1rem', margin: 'auto', marginBottom: '1rem' }} position='sticky' bottom={0}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} color="secondary" showFirstButton showLastButton />
        </Stack>
        <Filter open={openAddModal} handleClose={handleCloseAddModal} />
      </Grid>
      <Footer />
    </div>
  );
}

export default CoomoPageListing;
