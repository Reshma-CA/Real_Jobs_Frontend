import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; // Import useMap hook
import { Icon } from 'leaflet';
import {
  Box,
  Grid,
  AppBar,
  Typography,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CircularProgress,
  IconButton,
  CardActions,
} from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import houseIconPng from '../assets/Mapicons/house.png';
import apartmentIconPng from '../assets/Mapicons/apartment.png';
import officeIconPng from '../assets/Mapicons/office.png';
import {useImmerReducer} from 'use-immer';
// Context
import DispatchContxt from '../context/DispatchContxt';

import { REACT_APP_API_URL } from './Api_Constant';

const Listings = () => {
  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const { id } = useParams();
  const completeImageUrl = `${REACT_APP_API_URL}${allListings.picture1}`;

  const initialState= {
    mapInstance:null,
  
}

function ReducerFunction(draft,action){
  switch (action.type) {
      
      case 'getMap':
        draft.mapInstance = action.mapData;
        break;
      default:
        break;    
          
  }
}

const [state,dispatch] = useImmerReducer(ReducerFunction,initialState)

function TheMapcomponent(){
  const map = useMap()
  dispatch({type:'getMap', mapData:map})
  return null;
}

  useEffect(() => {
    const getListings = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/Listdetails/${id}/`);
        console.log(response.data);
        setAllListings(response.data);
        setDataIsLoading(false);
      } catch (error) {
        console.log('Error fetching listing details:', error);
        setDataIsLoading(false);
      }
    };

    getListings();
  }, [id]);

  if (dataIsLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40, 40],
  });

  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng,
    iconSize: [40, 40],
  });

  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconSize: [40, 40],
  });

  function iconDisplay() {
    if (allListings.type === 'House') {
      return houseIcon;
    } else if (allListings.type === 'Apartment') {
      return apartmentIcon;
    } else if (allListings.type === 'Office') {
      return officeIcon;
    } else {
      return houseIcon;
    }
  }


  return (
    <Grid container>
      <Grid item xs={4}>
        {/* Render each listing individually */}
        <Card sx={{ margin: '0.5rem', border: '1px solid black' }}>
          <CardHeader
           action={
            <IconButton aria-label="settings" onClick={()=>state.mapInstance.flyTo([allListings.latitude,allListings.longitude],16)}>
              <RoomIcon />
            </IconButton>
          }
        
            title={allListings.title}
          />
          <CardMedia
            sx={{
              height: '20rem',
              width: '28rem',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
            component="img"
            image={completeImageUrl}
            alt={allListings.title}
          />
          <CardContent>
            <Typography variant="body2">{allListings.description.substring(0, 100)}...</Typography>
            <Box sx={{ marginBottom: '0.5rem' }}>
              <Typography
                style={{
                  position: 'absolute',
                  backgroundColor: '#991dbf',
                  zIndex: '1000',
                  color: 'white',
                }}
              >
                Rs.{allListings.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="add to favorites">
                  <Typography variant="body1" style={{ marginRight: '8px' }}>
                    Job Publisher:
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {allListings.job_provider_username}
                  </Typography>
                </IconButton>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="share">
                  <Typography variant="body1" style={{ marginRight: '8px' }}>
                    Job Publishing Date:
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {allListings.published_at_date}
                  </Typography>
                </IconButton>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="share">
                  <Typography variant="body1" style={{ marginRight: '8px' }}>
                    Contact Number:
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {allListings.phone_number}
                  </Typography>
                </IconButton>
              </div>
            </div>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={8} style={{ marginTop: '0.5em' }}>
        <AppBar position="sticky">
          <div style={{ height: '100vh' }}>
            <MapContainer center={[8.5241, 76.9366]} zoom={14} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <TheMapcomponent/>

              {allListings && (
                <Marker icon={iconDisplay()} position={[allListings.latitude, allListings.longitude]}>
                  <Popup>
                    <Typography variant="h5">{allListings.title}</Typography>
                    <img src={completeImageUrl} style={{ height: '14rem', width: '18rem' }} alt="listing" />
                    <Typography variant="body1">{allListings.description.substring(0, 150)}...</Typography>
                    <Button sx={{ backgroundColor: '#857be3' }} variant="container" fullWidth>
                      Details
                    </Button>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </AppBar>
      </Grid>
    </Grid>
  );
};

export default Listings;