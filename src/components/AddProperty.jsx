import React, { useState,useEffect, useRef,useMemo ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useImmerReducer} from 'use-immer';

import { Box, Avatar, Button, Grid, Paper,  Typography, InputAdornment, Input,FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


import BackImg from '../assets/img2.jpg'; 
import '../css/Register.css';

import Kovalam from '../assets/Boroughs/Kovalam';
import Karamana from '../assets/Boroughs/Karamana';
import Nedumangad from '../assets/Boroughs/Nedumangad';
// import Neyyatinkara from '../assets/Boroughs/Neyyatinkara';
import Kanjiramkulam from '../assets/Boroughs/Kanjiramkulam';

// Contexts
import StateContext from '../context/StateContext';


// import AdapterDayjs from '@mui/lab/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'

//Leaflet

import { MapContainer, TileLayer, useMap ,Marker, Polygon,} from 'react-leaflet'
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';


const AreaOptions = [
    {
        value: '',
        label: '',
      },
      {
        value: 'kerala',
        label: 'kerala',
      },
    
]

const TVMOptions = [
    {
        value: "Kovalam",
        label: "Kovalam",
    },
    {
        value: "Karamana", 
        label: "Karamana",
    },
    {
        value: "Nedumangad",
        label: "Nedumangad",
    },
    {
        value: "Kanjiramkulam",
        label: "Kanjiramkulam",
    },
    // {
    //     value: "Shanghumukham Beach",
    //     label: "Shanghumukham Beach",
    // },
    // {
    //     value: "Vizhinjam Lighthouse",
    //     label: "Vizhinjam Lighthouse",
    // },
    // {
    //     value: "Ponmudi",
    //     label: "Ponmudi",
    // },
    // {
    //     value: "Vellayani Lake",
    //     label: "Vellayani Lake",
    // },
    // {
    //     value: "Kuthiramalika Palace Museum",
    //     label: "Kuthiramalika Palace Museum",
    // },
    // {
    //     value: "Poovar Island",
    //     label: "Poovar Island",
    // },
    // {
    //     value: "Poovathoor",
    //     label: "Poovathoor",
    // },
];

const listingtypeOptions = [
    {
        value:'',
        label:'',
    },
    {
        value:'Apartment',
        label:'Apartment',
    },
    {
        value:'House',
        label:'House',
    },
    {
        value:'Office',
        label:'Office',
    },

]
const AddProperty = () => {

    const GlobalState = useContext(StateContext)

    
    const initialState= {
        titleValue:'',
        listingTypeValue:'',
        jobPublishedValue:'',
        descriptionValue:'',
        areaValue:'',
        boroughValue:'',
        latitudeValue:'',
        longitudeValue:'',
        priceValue:'',
        pricture1Value:'',
        pricture2Value:'',
        pricture3Value:'',
        pricture4Value:'',
        pricture5Value:'',
        mapInstance:null,
        markerPosition:{
            lat:'8.5241',
            lng:'76.9366'
        }, 
        uploadedPictures:[], 
        sendRequest:0,
        userProfile:{
            agencyName:'',
            phoneNumber:'',
        }  
    }

    function ReducerFunction(draft,action){
        switch (action.type) {
            case 'catchTitleChange':
                draft.titleValue = action.titleChosen;
                break;   
                
            case 'catchListingTypeChange':
                draft.listingTypeValue = action.listingTypeChosen;
                break; 
                    
            case 'catchDescriptionValueChange':
                draft.descriptionValue = action.descriptionChosen;
                break; 
                

            case 'catchAreaValueChange':
                draft.areaValue = action.areaValueChosen;
                break; 

            case 'catchBoroughValueChange':
                draft.boroughValue = action.boroughValueChosen;
                break; 

            case 'catchLatitudeValueChange':
                draft.latitudeValue = action.latitudeValueChosen;
                break;
                
            case 'catchLongitudeValueChange':
                draft.longitudeValue = action.longitudeValueChosen;
                break;
                
            case 'catchPriceValueChange':
                draft.priceValue = action.priceValueChosen;
                break; 

            case 'catchPricture1ValueChange':
                draft.pricture1Value = action.pricture1ValueChosen;
                break;

            case 'catchPricture2ValueChange':
                draft.pricture2Value = action.pricture2ValueChosen;
                break;

            case 'catchPricture3ValueChange':
                draft.pricture3Value = action.pricture3ValueChosen;
                break;

            case 'catchPricture4ValueChange':
                draft.pricture4Value = action.pricture4ValueChosen;
                break;

            case 'catchPricture5ValueChange':
                draft.pricture5Value = action.pricture5ValueChosen;
                break;

            case 'getMap':
                draft.mapInstance = action.mapData;
                break;

            case 'changeMarkerposition':
                draft.markerPosition.lat = action.changeLatitude;
                draft.markerPosition.lng = action.changeLongitude;
                draft.latitudeValue = ''
                draft.longitudeValue= ''
                break;
            

            case 'catchUploadedPictures':
                draft.uploadedPictures = action.picturesChosen;
                break;

            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest+1
                break;

            case 'catchProfileInfo':
                draft.userProfile.agencyName = action.profileObject.agency_name;
                draft.userProfile.phoneNumber= action.profileObject.phone_number;
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

    // Use Effect to change the map view depending on chosen borough
    useEffect(()=>{
        if(state.boroughValue === 'Kovalam'){
            state.mapInstance.setView([8.399845986344863, 76.98308472374298],13)
            dispatch({type:'changeMarkerposition',changeLatitude:8.399845986344863,changeLongitude:76.98308472374298})
        }
        else if(state.boroughValue === 'Karamana'){
            state.mapInstance.setView([8.482109045600668, 76.9661929115117],13)
            dispatch({type:'changeMarkerposition',changeLatitude:8.482109045600668,changeLongitude:76.9661929115117})
        }
        else if(state.boroughValue === 'Nedumangad'){
            state.mapInstance.setView([8.612719832912235, 76.99735717160095],15)
            dispatch({type:'changeMarkerposition',changeLatitude:8.612719832912235,changeLongitude:76.99735717160095})
        }
        else if(state.boroughValue === 'Kanjiramkulam'){
            state.mapInstance.setView([8.360465475683004, 77.05244061054387],15)
            dispatch({type:'changeMarkerposition',changeLatitude:8.360465475683004,changeLongitude:77.05244061054387})
        }

    },[state.boroughValue])

    // Borough dispaly function

    function BoroughDisplay(){
        if(state.boroughValue === 'Kovalam'){
            return <Polygon positions={Kovalam}/>
        }
        else if(state.boroughValue === 'Karamana'){
            return <Polygon positions={Karamana}/>

        }
        else if(state.boroughValue === 'Nedumangad'){
            return <Polygon positions={Nedumangad}/>

        }
        else if(state.boroughValue === 'Kanjiramkulam'){
            return <Polygon positions={Kanjiramkulam}/>

        }
    }

    function submitButtonDisplay(){
        if(GlobalState.userIsLogged && state.userProfile.agencyName !== null && state.userProfile.agencyName !== ''&& 
        state.userProfile.phoneNumber !== null && state.userProfile.phoneNumber !== ''){
            return (
                <Button variant="contained" type='Submit' 
                style={{ btstyle, backgroundColor: '#9d13bf', animation: 'glitter 1.5s infinite' }}
                 fullWidth onClick={Addjobhandle}>Submit </Button>
            )

        }else if(GlobalState.userIsLogged && (
            state.userProfile.agencyName === null || state.userProfile.agencyName === ''|| 
            state.userProfile.phoneNumber === null || state.userProfile.phoneNumber === '')){
            return (
                <Button variant="outlined" 
                style={{ btstyle, backgroundColor: '#9d13bf', animation: 'glitter 1.5s infinite' }}
                 fullWidth onClick={()=>navigate('/profile')}>Complete your profile to add property </Button>
            )}
            else if(!GlobalState.userIsLogged ){
                return (
                    <Button variant="outlined" 
                    style={{ btstyle, backgroundColor: '#9d13bf', animation: 'glitter 1.5s infinite' }}
                     fullWidth onClick={()=>navigate('/login')}>Login to add property </Button>
                )}



    }

    // Draggable marker

    
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
        dragend() {
            const marker = markerRef.current;
            dispatch({type:'catchLatitudeValueChange', latitudeValueChosen: marker.getLatLng().lat}); // Corrected action type
            dispatch({type:'catchLongitudeValueChange', longitudeValueChosen: marker.getLatLng().lng});
           
        },
        }),
        [],
    );
    
    // catching picture fields

    useEffect(()=>{
        if(state.uploadedPictures[0]){
            dispatch({type:'catchPricture1ValueChange',pricture1ValueChosen:state.uploadedPictures[0]})
        }

    },[state.uploadedPictures[0]])
      
    useEffect(()=>{
        if(state.uploadedPictures[1]){
            dispatch({type:'catchPricture2ValueChange',pricture2ValueChosen:state.uploadedPictures[1]})
        }

    },[state.uploadedPictures[1]])

    useEffect(()=>{
        if(state.uploadedPictures[2]){
            dispatch({type:'catchPricture3ValueChange',pricture3ValueChosen:state.uploadedPictures[2]})
        }

    },[state.uploadedPictures[2]])

    useEffect(()=>{
        if(state.uploadedPictures[3]){
            dispatch({type:'catchPricture4ValueChange',pricture4ValueChosen:state.uploadedPictures[3]})
        }

    },[state.uploadedPictures[3]])

    useEffect(()=>{
        if(state.uploadedPictures[4]){
            dispatch({type:'catchPricture5ValueChange',pricture5ValueChosen:state.uploadedPictures[4]})
        }

    },[state.uploadedPictures[4]])

    // request to get profile info
    useEffect(()=>{
        async function getProfileInfo(){
            try{
                const response = await axios.get(`http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`)
                console.log(response.data)
                dispatch({type:'catchProfileInfo',profileObject:response.data})
            }
            catch(e){
                console.log(e.response)
            }
        }
        getProfileInfo()
    },[])

    const Addjobhandle = (e) => {
        e.preventDefault();
        console.log('the form has been submitted')
        dispatch({type:'changeSendRequest'})
    }

    useEffect(() => {
        if (state.sendRequest) {
            async function AddProperty() {
                const formData = new FormData();
                formData.append('title', state.titleValue);
                formData.append('description', state.descriptionValue);
                formData.append('area', state.areaValue);
                formData.append('borough', state.boroughValue); // corrected field name
                formData.append('listing_type', state.listingTypeValue);
                formData.append('price', state.priceValue);
                formData.append('latitude', state.latitudeValue);
                formData.append('longitude', state.longitudeValue);
                formData.append('picture1', state.pricture1Value);
                formData.append('picture2', state.pricture2Value);
                formData.append('picture3', state.pricture3Value);
                formData.append('picture4', state.pricture4Value);
                formData.append('picture5', state.pricture5Value);
                formData.append('job_provider', GlobalState.userId);
    
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/Listing/create/', formData); // pass formData here
                    console.log(response.data);
                    navigate('/listings')
                } catch (e) {
                    console.log(e.response);
                }
            }
            AddProperty();
        }
    }, [state.sendRequest, GlobalState.userId]); // Include GlobalState.userId as dependency
    
    const paperStyle = {
        padding: 20,
        height: '180vh',
        width: '120%', // or specify a specific width like '500px'
        margin: '20px auto',
    };

    const avatarStyle = { backgroundColor: '#9d13bf' };
    const btstyle = { margin: '8px 0' };
    const gridContainerStyle = {
        backgroundImage: `url(${BackImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };
  return (
    <div>
    <Grid container justifyContent="center" alignItems="center" sx={gridContainerStyle}>
        <NavBar/>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={10} style={paperStyle} sx={{ backgroundColor: '#f4e6fa' }}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><WorkOutlineIcon /></Avatar>
                        <h2 style={{ color: '#9d13bf' }}>Add Job</h2>
                    </Grid>
                    <Grid item container style={{marginTop:'1rem'}}>
                    <TextField label='Job Title' id='title' placeholder='enter job title' variant='standard' style={btstyle} fullWidth required  value={state.titleValue} onChange={(e)=>dispatch({type:'catchTitleChange',titleChosen:e.target.value})}/>                    
                    </Grid>  

                   
                    <Grid item container justifyContent='space-between' >
                    <Grid item xs={5} style={{ marginTop: '1rem' }}>
                        <FormControl fullWidth required>
                            <InputLabel id="Type of building">Type of building</InputLabel>
                            <Select
                                variant='standard'
                                id="listing_type"
                                value={state.listingTypeValue}
                                onChange={(e)=>dispatch({type:'catchListingTypeChange',listingTypeChosen:e.target.value})}
                            >
                                {listingtypeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item container xs={5} style={{marginTop:'1rem'}}>
                    <TextField label='Payment Amount per day' id='price' type="number" placeholder='enter price' variant='standard' style={btstyle} fullWidth required  value={state.priceValue} onChange={(e)=>dispatch({type:'catchPriceValueChange',priceValueChosen:e.target.value})}/>                    
                    </Grid> 
                    </Grid>
                    
                    <Grid item container style={{marginTop:'1rem'}}>
                    <TextField label='Job Description' id='description' placeholder='enter Description' variant='outlined' 
                    multiline rows={6}
                    style={btstyle} fullWidth required  value={state.descriptionValue} onChange={(e)=>dispatch({type:'catchDescriptionValueChange',descriptionChosen:e.target.value})}/>                    
                    </Grid> 

                    

                    <Grid item container justifyContent='space-between' >
                    <Grid item xs={5} style={{ marginTop: '1rem' }}>
                        <FormControl fullWidth required>
                            <InputLabel id="area">Area</InputLabel>
                            <Select
                                variant='standard'
                                id="area"
                                value={state.areaValue}
                                onChange={(e) => dispatch({ type: 'catchAreaValueChange', areaValueChosen: e.target.value })}
                            >
                                {AreaOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    

                        <Grid item xs={5} style={{ marginTop: '1rem' }}>
                        <FormControl fullWidth required>
                            <InputLabel id="borough">Landmark</InputLabel>
                            <Select
                                variant='standard'
                                id="borough"
                                value={state.boroughValue}
                                onChange={(e)=>dispatch({type:'catchBoroughValueChange',boroughValueChosen:e.target.value})}
                            >
                                {state.areaValue === 'kerala' ? TVMOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    )):""}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {/* map */}

                <Grid item container style ={{height:'35rem',marginTop:'1rem'}}>
                    <MapContainer center={[8.5241, 76.9366]} zoom={14} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                   <TheMapcomponent/>
                   {BoroughDisplay()}

                   <Marker
                    draggable
                    eventHandlers={eventHandlers}
                    position={state.markerPosition}
                    ref={markerRef}>
                   
                    </Marker>

                   

                   {/* </Polygon> */}

                    </MapContainer>


                </Grid>

                 {/* map */}

                    

                    

                    
                   
                     <Button variant="contained" component="label"  sx={{marginBottom:'15px'}} style={{ btstyle, backgroundColor: '#eb2f77', }} 
                     fullWidth >UPLOAD PICTURES (MAX 5)
                    <input type="file" multiple accept='image/png, image/gif,image/jpeg' hidden
                    onChange={(e)=>dispatch({type:'catchUploadedPictures',picturesChosen:e.target.files,})}
                    />
                    </Button> 
                    
                    <Grid item container>
                        <ul>
                        {state.pricture1Value ?<li>{state.pricture1Value.name}</li>:''}
                        {state.pricture2Value ?<li>{state.pricture2Value.name}</li>:''}
                        {state.pricture3Value ?<li>{state.pricture3Value.name}</li>:''}
                        {state.pricture4Value ?<li>{state.pricture4Value.name}</li>:''}
                        {state.pricture5Value ?<li>{state.pricture5Value.name}</li>:''}
                        </ul>

                    </Grid>
                    


                   {submitButtonDisplay()}
                    {/* <Button onClick={()=> console.log(state.uploadedPictures)}>Map test BUTTON</Button> */}
                </Paper>
            </Grid>
            
        </Grid>
        <Footer/></div>
  )
}

export default AddProperty