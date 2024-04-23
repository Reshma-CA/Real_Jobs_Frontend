import React, { useState,useEffect, useLayoutEffect  } from 'react';
import axios from "axios";
import { Box, Avatar, Button, Grid, Paper,  Typography, InputAdornment, Input,FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, useNavigate } from 'react-router-dom';
import BackImg from '../assets/img1.jpg';
import '../css/Register.css';
import {useImmerReducer} from 'use-immer';
//Leaflet

import { MapContainer, TileLayer, useMap ,Marker,} from 'react-leaflet'


const AreaOptions = [
    {
        value: '',
        label: '',
      },
      {
        value: 'Kerala',
        label: 'Kerala',
      },
    
]
const AddProperty = () => {

    
    const initialState= {
        titleValue:'',
        listingTypeValue:'',
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

           
           
                
        }
}
    const [state,dispatch] = useImmerReducer(ReducerFunction,initialState)

    // Draggable marker

    // const [position, setPosition] = useState(center)
    // const markerRef = useRef(null)
    // const eventHandlers = useMemo(
    //   () => ({
    //     dragend() {
    //       const marker = markerRef.current
    //       if (marker != null) {
    //         setPosition(marker.getLatLng())
    //       }
    //     },
    //   }),
    //   [],
    // )
    // const toggleDraggable = useCallback(() => {
    //   setDraggable((d) => !d)
    // }, [])


    function TheMapcomponent(){
        const map = useMap()
        dispatch({type:'getMap', mapData:map})
        return null;
    }

    // Use Effect to change the map view depending on chosen borough
    useEffect(()=>{
        if(state.boroughValue === 'Kaniyapuram'){
            state.mapInstance.setView([8.585878830425447, 76.85187976830409],12)
        }
        else if(state.boroughValue === 'Menamkulam'){
            state.mapInstance.setView([8.571620604327292, 76.85531299595218],12)
        }

    },[state.boroughValue])

    const Addjobhandle = (e) => {
        e.preventDefault();
        console.log('the form has been submitted')
        // dispatch({type:'changeSendRequest'})
    }

    const paperStyle = {
        padding: 20,
        height: '160vh',
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
    <Grid container justifyContent="center" alignItems="center" sx={gridContainerStyle}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={10} style={paperStyle} sx={{ backgroundColor: '#f4e6fa' }}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><WorkOutlineIcon /></Avatar>
                        <h2 style={{ color: '#9d13bf' }}>Add Job</h2>
                    </Grid>
                    <Grid item container style={{marginTop:'1rem'}}>
                    <TextField label='Job Title' id='title' placeholder='enter job title' variant='standard' style={btstyle} fullWidth required  value={state.titleValue} onChange={(e)=>dispatch({type:'catchTitleChange',titleChosen:e.target.value})}/>                    
                    </Grid>  

                    <Grid item container style={{marginTop:'1rem'}}>
                    <TextField label='Type of building' id='listing_type' placeholder='enter Type of building' variant='standard' style={btstyle} fullWidth required  value={state.listingTypeValue} onChange={(e)=>dispatch({type:'catchListingTypeChange',listingTypeChosen:e.target.value})}/>                    
                    </Grid>       
                    
                    <Grid item container style={{marginTop:'1rem'}}>
                    <TextField label='Description' id='description' placeholder='enter Description' variant='standard' style={btstyle} fullWidth required  value={state.descriptionValue} onChange={(e)=>dispatch({type:'catchDescriptionValueChange',descriptionChosen:e.target.value})}/>                    
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

                    <Grid item xs={5} style={{marginTop:'1rem'}}>
                    <TextField label='Borough' id='borough' placeholder='enter borough' variant='standard' style={btstyle} fullWidth required  value={state.boroughValue} onChange={(e)=>dispatch({type:'catchBoroughValueChange',boroughValueChosen:e.target.value})}/>                    
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

                   {/* <Marker
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    position={position}
                    ref={markerRef}>
                    
                    </Marker> */}
                    </MapContainer>


                </Grid>

                 {/* map */}

                    <Grid item container style={{marginTop:'1rem'}}>
                    <TextField label='price' id='price' placeholder='enter price' variant='standard' style={btstyle} fullWidth required  value={state.priceValue} onChange={(e)=>dispatch({type:'catchPriceValueChange',priceValueChosen:e.target.value})}/>                    
                    </Grid> 

                    

                    
                   
                    <Button variant="contained" type='Submit' style={{ btstyle, backgroundColor: '#9d13bf', animation: 'glitter 1.5s infinite' }} fullWidth onClick={Addjobhandle}>Submit </Button>
                    <Button onClick={()=>state.mapInstance.flyTo([8.5241, 76.9366],15)}>Map test BUTTON</Button>
                </Paper>
            </Grid>
        </Grid>
  )
}

export default AddProperty