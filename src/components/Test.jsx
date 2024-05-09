import React from 'react'
import axios from "axios";
// leaflet
import { MapContainer, TileLayer, useMap,Marker,Popup ,Polyline,Polygon} from 'react-leaflet'
import { Icon } from "leaflet";
// MUI
import { Box,Grid,AppBar,Typography,Button,Card,CardHeader,CardMedia,CardContent,CircularProgress,IconButton,CardActions,} from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
// Map icons
import  houseIconPng from '../assets/Mapicons/house.png';
import apartmentIconPng from '../assets/Mapicons/apartment.png';
import officeIconPng from '../assets/Mapicons/office.png';
import { useNavigate } from 'react-router-dom';
import {useImmerReducer} from 'use-immer';
//Assets
import Img1 from '../assets/img1.jpg'
import { useState,useEffect } from 'react';
import Tvmlisting from '../assets/Data/DummydataTvm'
import polygonOne from './Shape';
import { TvOff } from '@mui/icons-material';


// Context
import DispatchContxt from '../context/DispatchContxt';
import StateContext from '../context/StateContext';
const Listings = () => {
  
    


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
      

      const [Latitude,setLatitude] = useState(8.5241)
      const [Longitude,setLongitude] = useState(76.9366)

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
    const navigate = useNavigate()


    function TheMapcomponent(){
        const map = useMap()
        dispatch({type:'getMap', mapData:map})
        return null;
    }

      
      function GoEast(){
        setLatitude(8.609229625462214)
        setLongitude(77.00523563642957)
      }

      function GoCenter(){
        setLatitude(8.5241)
        setLongitude(76.9366)
      }
    
   
      
    const polyOne = [
        [8.5241, 76.9366], // Thiruvananthapuram
        [8.5034, 76.9745], // Kazhakootam
        [8.5375, 76.8706], // Kovalam
      ];

    const[AllListing,setAllListing] = useState([]);

    const[dataIsLoading,setdataIsLoading] = useState(true);


      
   useEffect(() => {
    const source = axios.CancelToken.source()
    async function GetAllListings(){
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/Listing/',{cancelToken:source.token})
      // console.log(response.data)
      setAllListing(response.data);
      setdataIsLoading(false)

      }catch(error){
        console.log(error.response)
      }
    }
    GetAllListings()
    return()=>{
      source.cancel();
    }
   }, [])
   
   if(dataIsLoading === false ){
    
   console.log(AllListing[0].location);
   }

   if(dataIsLoading === true ){
    
    return (
      <Grid container justifyContent='center' alignItems='center' style={{height:'100vh'}}>
        <CircularProgress />
      </Grid>
    )
    }
      
      

  return (
  <Grid container >
    <Grid item xs={4} >
      {AllListing.map((lists)=>{
        return(
          <Card key={lists.id} sx={{margin:'0.5rem',border:'1px solid black'}} style={{padding:'10xp',marginBottom:"30px"}}>
            <CardHeader
          
            action={
              <IconButton aria-label="settings" onClick={()=>state.mapInstance.flyTo([lists.latitude,lists.longitude],16)}>
                <RoomIcon />
              </IconButton>
            }
          
            title={lists.title}
        
          />
          <Box >
        <CardMedia
          sx={{  height: '20rem',
          width: '28rem',
          objectFit: 'cover',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
         
          }}
         style={{paddingLeft:'1rem'}}
          component="img"
          image={lists.picture1}
          alt={lists.title}
        />
        </Box>
          <CardContent >
                
            <Typography variant="body2" >
              {lists.description.substring(0,100)}...
            </Typography>
            <br/>
            <Box sx={{ marginBottom: '0.5rem'}}>
          <Typography style={{position:'absolute',
          backgroundColor:'#991dbf',
          zIndex:'1000',
          color:'white',
         }}>Rs.{lists.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}</Typography>
         </Box>
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
          
        </Card>
            )
      })}
      </Grid>
      <Grid item xs={8} style={{marginTop:'0.5em'}}>
      <AppBar position='sticky'>
          <div style={{height:"100vh"}}>
            <MapContainer center={[8.5241, 76.9366]} zoom={14} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
           <TheMapcomponent/>
          
              {AllListing.map((item)=>{
                   function iconDisplay() {
                    if (item.listing_type === 'House') { 
                      return houseIcon;
                    } else if (item.listing_type === 'Apartment') {
                      return apartmentIcon;
                    } else if (item.listing_type === 'Office') {
                      return officeIcon;
                    }
                  }
                return(
                  <Marker 
                  key={item.id}
                  icon={iconDisplay()}
                  position={[item.latitude, item.longitude]}>

                  <Popup>
                    <Typography variant="h5">{item.title}</Typography>
                    <img src={item.picture1} style={{ height: '14rem', width: '18rem' }} alt="listing" />
                    <Typography variant="body1">{item.description.substring(0,150)}...
                    </Typography>
                    <Button sx={{ backgroundColor: '#857be3' }} variant="container" fullWidth>
                      Details
                    </Button>
                  </Popup>

                  </Marker>
                )
              })}
        </MapContainer>
        </div>
      </AppBar>
      </Grid>
    </Grid>
  )
}

export default Listings
