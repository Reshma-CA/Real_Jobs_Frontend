import React, { useState, useEffect } from 'react';
import { Grid, Card, CircularProgress, Typography, CardHeader, CardMedia, Box, CardContent, CardActions, IconButton, Button } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import NavBar from '../../layouts/NavBar';
import Footer from '../../layouts/Footer';
import { REACT_APP_API_URL } from '../Api_Constant';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const FilterData = () => {
  const location = useLocation();
  const { filteredData } = location.state || { filteredData: [] };
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const BASE_URL = REACT_APP_API_URL;
  const fallbackImage = 'fallback-image-url'; // Replace with your fallback image URL

  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // Simulate data loading delay to show the loading indicator
    setTimeout(() => {
      setDataIsLoading(false);
    }, 1000); // Adjust delay as needed
  }, [filteredData]);

  return (
    <div>
      <NavBar />
      {dataIsLoading ? (
        <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
          <CircularProgress />
        </Grid>
      ) : filteredData.length > 0 ? (
        <Grid container spacing={2}>
          {filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((lists) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={lists.id}>
              <Card sx={{ border: '1px solid black', height: 580, width: 365, margin: '10px' }}>
                <CardHeader title={<Typography variant="h6" sx={{ fontSize: '20px' }}>{lists.title}</Typography>} />
                <CardMedia
                  component="img"
                  height="200"
                  image={BASE_URL + lists.picture1 || fallbackImage}  // Construct full image URL
                  alt={lists.title}
                  onError={(e) => e.target.src = fallbackImage}  // Handle error case
                />
                <Box sx={{ marginBottom: '0.5rem' }}>
                  <Typography style={{ position: 'absolute', backgroundColor: '#991dbf', zIndex: '1000', color: 'white' }}>
                    Rs :{lists.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} per day!
                  </Typography>
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
                <Link to={`/listings/${lists.id}`}>
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
          ))}
        </Grid>
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
          <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#0a0a0a' }} pt={1}>
            No Result available
          </Typography>
        </Box>
      </Grid>
        
      )}
      <Stack spacing={2} style={{ alignItems: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="secondary"
          showFirstButton
          showLastButton
        />
      </Stack>
      <Footer />
    </div>
  );
};

export default FilterData;
