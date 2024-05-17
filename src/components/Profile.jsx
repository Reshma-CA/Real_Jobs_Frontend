import React, { useState,useEffect, useRef,useMemo ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useImmerReducer} from 'use-immer';

//img
import BackImg from '../assets/image15.jpg';
import profileImg from '../assets/defaultProfilePicture.jpg'
// Contexts
import StateContext from '../context/StateContext';

import { Box, Avatar, Button, Grid, Paper,  Typography, CircularProgress,InputAdornment, Input,FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import Person4Icon from '@mui/icons-material/Person4';
import ProfileUpdate from './ProfileUpdate';
const Profile = () => {

    const GlobalState = useContext(StateContext)

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
        console.log('the form has been submitted')
        dispatch({type:'changeSendRequest'})
        if (state.uploadedPictures) {
            dispatch({ type: 'changeSendRequest' });
        }
        
  
    // useEffects to catch uploaded picture


    };
    // request to get profile info
    useEffect(()=>{
        async function getProfileInfo(){
            try{
                const response = await axios.get(`http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`)
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


    const gridContainerStyle = {
   
        backgroundImage: `url(${BackImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };
        const paperStyle={padding:20,height:'85vh', width:'100%', maxWidth:600 ,margin:'20px auto'}
        const avatarStyle = {backgroundColor:'#9d13bf'}
        const btstyle= {margin:'8px 0'}

        function PropertyDisplay() {
            const vacancyCount = state.job_providerListings.length;
        
            if (vacancyCount === 0) {
                return <Button disabled size="small">No Vacancy listed</Button>;
            } else if (vacancyCount === 1) {
                return <Button size="small">One Vacancy listed</Button>;
            } else {
                return <Button size="small">{vacancyCount} vacancies listed</Button>;
            }
        }
        function WelcomeDisplay() {
            if (
                state.userProfile.agencyName === null ||
                state.userProfile.agencyName === '' ||
                state.userProfile.phoneNumber === null ||
                state.userProfile.phoneNumber === ''
            ) {
                return (
                    <Typography variant='h5' style={{textAlign:'center',marginTop:'1rem'}}>
                        Welcome <span style={{color:'#db2c78',fontWeight:'bold'}}>{GlobalState.userUserName}</span>,
                        Please submit this form below to update your profile
                    </Typography>
                );
            } else {
                return (
                    <Grid container style={{width:'100%', border:'2px solid black', padding:'5px', backgroundColor:'#f0b6db',marginTop:''} }>
                        <Grid item xs={12} sm={6}>
                            <img style={{height:'10rem',width:'100%', maxWidth: '15rem', border:'0.5px solid black'}} src={state.userProfile.profilePic !== null ? state.userProfile.profilePic: profileImg}/> 
                        </Grid>
                        <Grid item container direction="column" xs={12} sm={6}>
                            <Grid item>
                                <Typography variant='h5' style={{textAlign:'center',marginTop:'1rem'}}>
                                    Welcome <span style={{color:'#db2c78',fontWeight:'bold'}}>{GlobalState.userUserName}</span>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5' style={{textAlign:'center',marginTop:'1rem'}}>
                                    You have {PropertyDisplay()}      
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            }
        }

        if(state.dataIsLodding === true ){
    
            return (
              <Grid container justifyContent='center' alignItems='center' style={{height:'100vh'}}>
                <CircularProgress />
              </Grid>
            )
            }
              
        
                
  return (
    <>
    <Box >
    {WelcomeDisplay()}
   
    </Box>
   <ProfileUpdate userProfile={state.userProfile}/>
    </>
  )
}

export default Profile