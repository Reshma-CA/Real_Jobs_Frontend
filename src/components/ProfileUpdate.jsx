import React, { useState,useEffect, useRef,useMemo ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useImmerReducer} from 'use-immer';

//img
import BackImg from '../assets/image15.jpg';

// Contexts
import StateContext from '../context/StateContext';

import { Box, Avatar, Button, Grid, Paper,  Typography, InputAdornment, Input,FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import Person4Icon from '@mui/icons-material/Person4';
const ProfileUpdate = (props) => {
    console.log(props.userProfile)

    const GlobalState = useContext(StateContext)

    const initialState= {
    
        agencyNameValue:props.userProfile.agencyName,
        PhoneNumberValue:props.userProfile.phoneNumber,
        bioValue:props.userProfile.bio,
        uploadedPictures:null,
        pricture1Value:props.userProfile.profilePic,
        sendRequest:0,
    }

    function ReducerFunction(draft,action){
        switch (action.type) {
            

            case 'catchAgencyNameChange':
                draft.agencyNameValue = action.AgencyNameChosen
                break;

            case 'catchPhoneNumberChange':
                draft.PhoneNumberValue = action.phoneNumberChosen
                break;

            case 'catchBioChange':
                draft.bioValue = action.bioChosen
                break;

            case 'catchUploadedPictures':
                draft.uploadedPictures = action.picturesChosen;
                break;

            // case 'catchPricture1ValueChange':
            //     draft.pricture1Value = action.pricture1ValueChosen;
            //     break;

            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest+1
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
        } else {
            console.log('Please select a profile picture');
        }
        
  
    // useEffects to catch uploaded picture
    useEffect(()=>{
        if(state.uploadedPictures[0]){
            dispatch({type:'catchPricture1ValueChange',pricture1ValueChosen:state.uploadedPictures[0]})
        }

    },[state.uploadedPictures[0]]) 

    };


    // useEffect to send request

    useEffect(() => {
      if (state.sendRequest) {
          async function UpdateProfile() {
              const formData = new FormData();
              formData.append('agency_name', state.agencyNameValue);
              formData.append('phone_number', state.PhoneNumberValue);
              formData.append('bio', state.bioValue);
              formData.append('profile_picture', state.uploadedPictures[0]); // Include profile picture
              formData.append('job_provider', GlobalState.userId);
             
              try {
                  const response = await axios.patch(`http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/update/`, formData); // pass formData here
                  console.log(response.data);
                  navigate(0)
              } catch (e) {
                  console.log(e.response);
              }
          }
          UpdateProfile();
      }
  }, [state.sendRequest, GlobalState.userId]); // Include GlobalState.userId as dependency



    const gridContainerStyle = {
   
        backgroundImage: `url(${BackImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };
        const paperStyle={padding:20,height:'85vh', width:'100%', maxWidth:600 ,margin:'20px auto'}
        const avatarStyle = {backgroundColor:'#9d13bf'}
        const btstyle= {margin:'8px 0'}



    function profilePictureDisplay() {
        if (typeof state.uploadedPictures !== 'string') {
            return (
                <ul>
                    {state.uploadedPictures ? <li>{state.uploadedPictures[0].name}</li> : ''}
                </ul>
            );
        } else if (typeof state.uploadedPictures === 'string') {
            return (
                <Grid item style={{ marginTop: '0.5rem', marginRight: 'auto', marginLeft: 'auto' }}>
                    <img src={props.userProfile.profilePic} style={{ height: '5rem', width: '5rem' }} alt="Profile" />
                </Grid>
            );
        }
    }

                
  return (
    <>

    
    <Grid container justifyContent="center" alignItems="center" sx={gridContainerStyle} style={{marginTop:'1rem'}}>
    <Grid item xs={12} sm={8} md={6} lg={4} >
    <Paper elevation={10} style={paperStyle} sx={{ backgroundColor: '#f4e6fa' }}>
      <Grid align='center'>
      <Avatar style={avatarStyle}><Person4Icon/> </Avatar>
      <h2 style={{color:'#9d13bf'}}>Profile</h2>
      </Grid>
      <Grid item container style={{marginTop:'1rem'}}>
      <TextField label='House Name' id='agency_name' placeholder='enter username' style={btstyle} fullWidth 
      required value={state.agencyNameValue} onChange={(e)=>dispatch({type:'catchAgencyNameChange',AgencyNameChosen:e.target.value})}  />
     </Grid>
      
      <Grid item container style={{marginTop:'1rem'}}>      
      <TextField label='Phone Number' id='phone_number' placeholder='enter phone Number'
        style={btstyle} fullWidth required value={state.PhoneNumberValue}
        onChange={(e)=>dispatch({type:'catchPhoneNumberChange',phoneNumberChosen:e.target.value})}/>
      </Grid>    

      <Grid item container style={{marginTop:'1rem'}}>      
      <TextField label='Bio' id='bio' placeholder='enter phone bio'
      multiline
      rows={6}
        style={btstyle} fullWidth required value={state.bioValue}
        onChange={(e)=>dispatch({type:'catchBioChange',bioChosen:e.target.value})}/>
      </Grid>

      <Grid item container> 
           {profilePictureDisplay()}

        </Grid>
      
      <Button variant="contained" component="label"  sx={{marginBottom:'15px'}} style={{ btstyle, backgroundColor: '#eb2f77', }} 
        fullWidth >PROFILE PICTURE
        <input type="file"  accept='image/png,  image/jpeg' hidden
        onChange={(e)=>dispatch({type:'catchUploadedPictures',picturesChosen:e.target.files,})}
        />
        </Button> 

       

      
      <Button   variant="contained" type='Submit' color='primary' style={{btstyle,animation: 'glitter 1.5s infinite'}} fullWidth onClick={loginHandle}> update
       
      </Button>     

      </Paper>
    </Grid>
    </Grid>
    </>
  )
}


export default ProfileUpdate