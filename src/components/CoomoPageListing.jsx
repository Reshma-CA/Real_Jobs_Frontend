
import React from 'react';
import axios from "axios";
import { Grid, Card,Box, CardHeader, CardMedia, CardContent, CircularProgress, IconButton, Typography, Button ,CardActions,Pagination,Stack} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import NavBar from '../layouts/NavBar';
import { useImmerReducer } from 'use-immer';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layouts/Footer';

const CoomoPageListing = () => {
  const initialState = {
    mapInstance: null,
   
  }

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case 'getMap':
        draft.mapInstance = action.mapData;
        break;
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  const navigate = useNavigate();

  const [AllListing, setAllListing] = React.useState([]);
  const [dataIsLoading, setDataIsLoading] = React.useState(true);

   // pagenation 
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  
 // get all list data

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/Listing/', { cancelToken: source.token });
        setAllListing(response.data);
        setDataIsLoading(false);
        rowChange(response)
      } catch (error) {
        console.log(error.response);
      }
    }
    GetAllListings();
    return () => {
      source.cancel();
    }
  }, []);

  // pagenation function

  const pageCount = Math.ceil(AllListing.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (dataIsLoading) {
    return (
      <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div>
    <Grid container spacing={2}  >
       <NavBar/>
      {AllListing.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((lists) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={lists.id}>
          <Card sx={{ border: '1px solid black', height: 580, width: 365 ,margin: '10px'}}>
          <CardHeader title={<Typography variant="h6" sx={{ fontSize: '20px' }}>{lists.title}</Typography>} />
            <CardMedia
              component="img"
              height="200"
              image={lists.picture1}
              // blogHref={`/Listdetails/${post.id}`}
              alt={lists.title}
            />
             <Box sx={{ marginBottom: '0.5rem'}}>
            <Typography style={{position:'absolute',
            backgroundColor:'#991dbf',
            zIndex:'1000',
            color:'white',
            }}>Rs :{lists.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")} per day!</Typography>
            </Box>

                    
            <CardContent sx={{ maxHeight: '100px',marginTop:'1rem' }}>
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
          
            <Link to={`/listings/${lists.id}`}><Button className="glitter"
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
          </Button></Link>
          </Card>
        </Grid>
      ))}
       <Stack spacing={2} style={{ alignItems: 'center', marginTop: '1rem', margin: 'auto', marginBottom:'1rem' }} position='sticky' bottom={0}>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} color="secondary" showFirstButton showLastButton />
        </Stack>
        

    </Grid>
    <Footer/></div>
    
  );
}

export default CoomoPageListing;