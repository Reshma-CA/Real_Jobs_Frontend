import React, { useState,useEffect, useRef,useMemo ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useImmerReducer} from 'use-immer';

//img
import BackImg from '../assets/image15.jpg';
import profileImg from '../assets/defaultProfilePicture.jpg'
// Contexts
import StateContext from '../context/StateContext';

import { Box, Avatar, Card,Button,CardMedia,CardContent,CardActions, Grid, Paper,  Typography, CircularProgress,InputAdornment, Input,FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import Person4Icon from '@mui/icons-material/Person4';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';


const Agencies = () => {

    const GlobalState = useContext(StateContext)

    const initialState= {
        dataIsLoading:true,
        agenciesList:[],
   
      
    }

    function ReducerFunction(draft,action){
        switch (action.type) {
            case 'catchAgencies':
                draft.agenciesList = action.AgenciesArray
                break;

            case 'loadingDone':
                draft.dataIsLoading = false
                break;
            
           
                
        }
}
    const [state,dispatch] = useImmerReducer(ReducerFunction,initialState)
    const navigate = useNavigate()

    // request to get all profiles
    useEffect(()=>{
        async function getAgencies(){
            try{
                const response = await axios.get(`http://127.0.0.1:8000/api/profiles/`)
                console.log(response.data)
                dispatch({type:'catchAgencies',AgenciesArray:response.data})
                dispatch({type:'loadingDone'})
                
            }
            catch(e){
                console.log(e.response)
            }
        }
        getAgencies()
    },[])

    if(state.dataIsLoading === true ){
    
        return (
          <Grid container justifyContent='center' alignItems='center' style={{height:'100vh'}}>
            <CircularProgress />
          </Grid>
        )
        }

  return (
    <div>
    <Grid container justifyContent='flex-start' spacing={2} style={{padding:'10px'}}>
      <NavBar/>
        {state.agenciesList.map(agency=>{
            function PropertyDisplay(){
                if(agency.job_provider_listings.length === 0){
                    return(
                        <Button disabled size="small">No Vacancy</Button>
                    )
                }else if(agency.job_provider_listings.length ===1){
                    return(
                        <Button size="small" onClick={()=>navigate(`/agencydetail/${agency.job_provider}`)}>One Vacancy</Button>
                    )
                }else{
                    return(
                        <Button size="small" onClick={()=>navigate(`/agencydetail/${agency.job_provider}`)}>{agency.job_provider_listings.length} vacancies</Button>
                    )
                }
            }
        if(agency.agency_name && agency.phone_number)
        return(
          <Grid key={agency.id} item style ={{marginTop:'1rem',maxWidth:'20rem'}}>
            <Card >
            <CardMedia
              component= 'img'
              sx={{ height: 140 }}
              image={agency.profile_picture ? agency.profile_picture : profileImg}
              alt="profile picture"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {agency.agency_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {agency.bio.substring(0,100)}...
              </Typography>
            </CardContent>
            <CardActions>
            
              {PropertyDisplay()}
            </CardActions>
          </Card>
          </Grid>
        )
    })}
   
    
    </Grid>
    <Footer/></div>
  )
}

export default Agencies