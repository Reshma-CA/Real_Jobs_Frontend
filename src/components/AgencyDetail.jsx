import React, { useState,useEffect, useRef,useMemo ,useContext} from 'react';
import { Link, useNavigate ,useParams} from 'react-router-dom';
import axios from "axios";
import {useImmerReducer} from 'use-immer';
import NavBar from '../layouts/NavBar';
//img
import BackImg from '../assets/image15.jpg';
import profileImg from '../assets/defaultProfilePicture.jpg'
// Contexts
import StateContext from '../context/StateContext';

import { Box, Avatar, Button, Grid, Paper, Card,CardMedia,CardContent,CardActions, Typography, CircularProgress,InputAdornment, Input,FormControl, InputLabel, MenuItem, Select, TextField, IconButton } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import Person4Icon from '@mui/icons-material/Person4';
import { REACT_APP_API_URL } from './Api_Constant';

const AgencyDetail = () => {
    const GlobalState = useContext(StateContext)

    const params = useParams()

    const initialState= {
       userProfile:{
        agencyName: '',
        phoneNumber:'',
        profilePic:'',
        bio:'',
        },
        dataIsLodding:true,
        job_providerListings:[],
      
    }

    function ReducerFunction(draft,action){
        switch (action.type) {
            
            case 'catchProfileInfo':
                draft.userProfile.agencyName = action.profileObject.agency_name;
                draft.userProfile.phoneNumber= action.profileObject.phone_number;
                draft.userProfile.profilePic = action.profileObject.profile_picture;
                draft.userProfile.bio = action.profileObject.bio;
                draft.userProfile.job_providerListings = action.profileObject.job_provider_listings
                break;

            case 'loadingDone' :
                draft. dataIsLodding=false
                break;

  
          

           
           
                
        }
}
    const [state,dispatch] = useImmerReducer(ReducerFunction,initialState)
    const navigate = useNavigate()

    const loginHandle =(e) => {
        e.preventDefault();
        
        
  
    // useEffects to catch uploaded picture


    };
    
    // request to get profile info
    useEffect(()=>{
        async function getProfileInfo(){
            try{
                const response = await axios.get(`${REACT_APP_API_URL}/api/profiles/${params.id}/`)
                
                console.log(response.data)
                dispatch({type:'catchProfileInfo',profileObject:response.data})
                dispatch({type:'loadingDone'})
                
            }
            catch(e){
                console.log(e.response)
            }
        }
        getProfileInfo()
    },[])

    if(state.dataIsLodding === true ){
    
        return (
          <Grid container justifyContent='center' alignItems='center' style={{height:'100vh'}}>
            <CircularProgress />
          </Grid>
        )
        }

  return (
    <div>
       <NavBar/>
        <Grid container justifyContent="center" alignItems="center" style={{ width: '50%', border: '2px solid black', padding: '5px', backgroundColor: '#ded3e3', margin: '0 auto', minHeight: '200px', marginTop:'1rem',marginBottom:'1rem' }}>
                        <Grid item xs={12} sm={6}>
                            <img style={{height:'10rem',width:'100%', maxWidth: '15rem', border:'0.5px solid black'}} src={state.userProfile.profilePic !== null ? state.userProfile.profilePic: profileImg}/> 
                        </Grid>
                        <Grid item container direction="column" xs={12} sm={6}>
                            <Grid item>
                                <Typography variant='h5' style={{textAlign:'center',marginTop:'1rem'}}>
                                    <span style={{color:'#db2c78',fontWeight:'bold'}}>{state.userProfile.agencyName}</span>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5' style={{textAlign:'center',marginTop:'1rem'}}>
                                    <IconButton>
                                   <LocalPhoneIcon/> {state.userProfile.phoneNumber} 
                                   </IconButton>    
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item style={{marginTop:'1rem',padding:'5px',fontSize:'20px'}}>
                            {state.userProfile.bio}

                        </Grid>
                    </Grid>

        <Grid container justifyContent='flex-start' spacing={2} style={{padding:'10px'}}>
        {state.userProfile.job_providerListings.map(list=>{
        const completeImageUrl = `${REACT_APP_API_URL}${list.picture1}`;
            console.log(list.picture1)
        return(
          <Grid key={list.id} item style ={{marginTop:'1rem',maxWidth:'20rem'}}>
            <Card >
            <CardMedia
              component= 'img'
              sx={{ height: 140 }}
              image={completeImageUrl ? completeImageUrl : profileImg}
            
              alt=" list picture1"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{fontWeight: 'bold',fontSize: '20px',color:'#9311ba'}}>
                {list.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" >
                {list.description.substring(0,100)}...
                <Typography style ={{color:'#0e0112',fontWeight: 'bold',marginTop:'1rem'}}> Working Building Type: <span style={{color:'#791f94', fontSize: '15px',
              fontWeight: 'bold',}}>{list.listing_type}</span></Typography>
              </Typography>
            </CardContent>
            <CardActions style={{fontWeight: 'bold'}}>
            
             Rs:{list.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <br></br><span>Per Day!</span>
            </CardActions>
            
            
          
          </Card>
          </Grid>
        )
    })}</Grid>
    </div>
  )
}

export default AgencyDetail