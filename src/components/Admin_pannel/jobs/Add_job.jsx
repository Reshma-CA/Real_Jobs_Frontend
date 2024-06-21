import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, MenuItem,Alert, FormControl, InputLabel, Select, Button, IconButton, Stack, TextField, Grid ,FormHelperText} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MapContainer, TileLayer, useMap, Marker, Polygon } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { REACT_APP_API_URL } from '../../Api_Constant';
import Kovalam from '../../../assets/Boroughs/Kovalam';
import Karamana from '../../../assets/Boroughs/Karamana';
import Nedumangad from '../../../assets/Boroughs/Nedumangad';
import Kanjiramkulam from '../../../assets/Boroughs/Kanjiramkulam';
import { useImmerReducer } from 'use-immer';
import StateContext from '../../../context/StateContext';

const AreaOptions = [
  { value: '', label: '' },
  { value: 'kerala', label: 'Kerala' },
];

const TVMOptions = [
  { value: 'Kovalam', label: 'Kovalam' },
  { value: 'Karamana', label: 'Karamana' },
  { value: 'Nedumangad', label: 'Nedumangad' },
  { value: 'Kanjiramkulam', label: 'Kanjiramkulam' },
];

const listingtypeOptions = [
  { value: '', label: '' },
  { value: 'Apartment', label: 'Apartment' },
  { value: 'House', label: 'House' },
  { value: 'Office', label: 'Office' },
];

const Add_job = ({ open, handleClose }) => {
  
  const GlobalState = useContext(StateContext);
  const navigate = useNavigate();

  const initialState = {
    titleValue: '',
    listingTypeValue: '',
    descriptionValue: '',
    areaValue: '',
    boroughValue: '',
    latitudeValue: '',
    longitudeValue: '',
    priceValue: '',
    picture1Value: '',
    mapInstance: null,
    markerPosition: { lat: '8.5241', lng: '76.9366' },
    uploadedPictures: [],
    sendRequest: 0,
    titleErrors:{
      hashErrors:false,
      errorMessage:'',
  },
  listingTypeErrors:{
      hashErrors:false,
      errorMessage:'',
  },   
  PriceErrors:{
      hashErrors:false,
      errorMessage:'',
  }, 

  DescriptionErrors:{
      hashErrors:false,
      errorMessage:'',
  }, 
  AreaErrors:{
      hashErrors:false,
      errorMessage:'',
  },  
  BoroughErrors:{
      hashErrors:false,
      errorMessage:'',
  }, 
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case 'catchTitleChange':
        draft.titleValue = action.titleChosen;
        draft.titleErrors.hasErrors= false;
        draft.titleErrors.errorMessage= '';
        break;
      case 'catchListingTypeChange':
        draft.listingTypeValue = action.listingTypeChosen;
        draft.listingTypeErrors.hasErrors= false;
        draft.listingTypeErrors.errorMessage= '';
        break;
      case 'catchDescriptionValueChange':
        draft.descriptionValue = action.descriptionChosen;
        draft.DescriptionErrors.hasErrors= false;
        draft.DescriptionErrors.errorMessage= '';
        break;
      case 'catchAreaValueChange':
        draft.areaValue = action.areaValueChosen;
        draft.AreaErrors.hasErrors= false;
        draft.AreaErrors.errorMessage= '';
        break;
      case 'catchBoroughValueChange':
        draft.boroughValue = action.boroughValueChosen;
        draft.BoroughErrors.hasErrors= false;
        draft.BoroughErrors.errorMessage= '';
        break;
      case 'catchLatitudeValueChange':
        draft.latitudeValue = action.latitudeValueChosen;
        break;
      case 'catchLongitudeValueChange':
        draft.longitudeValue = action.longitudeValueChosen;
        break;
      case 'catchPriceValueChange':
        draft.priceValue = action.priceValueChosen;
        draft.PriceErrors.hasErrors= false;
        draft.PriceErrors.errorMessage= '';
        break;
      case 'catchPicture1ValueChange':
        draft.picture1Value = action.picture1ValueChosen;
        break;
  
      case 'getMap':
        draft.mapInstance = action.mapData;
        break;
      case 'changeMarkerposition':
        draft.markerPosition.lat = action.changeLatitude;
        draft.markerPosition.lng = action.changeLongitude;
        draft.latitudeValue = '';
        draft.longitudeValue = '';
        break;
      case 'catchUploadedPictures':
        draft.uploadedPictures = action.picturesChosen;
        break;
      case 'changeSendRequest':
        draft.sendRequest = draft.sendRequest + 1;
        break;


      case 'catchTitleErrors':
          if(action.titleChosen.length ===0){
              draft.titleErrors.hasErrors = true;
              draft.titleErrors.errorMessage = 'Title is required'
          }
          break;


      case 'catchListingTypeErrors':
          if(action.listingTypeChosen.length ===0){
              draft.listingTypeErrors.hasErrors = true;
              draft.listingTypeErrors.errorMessage = 'Type of building is required'
          }
          break;

      case 'catchPriceErrors':
          if(action.priceValueChosen.length ===0){
              draft.PriceErrors.hasErrors = true;
              draft.PriceErrors.errorMessage = 'Price is required'
          }
          break;
          
     case 'catchDescriptionErrors':
          if(action.descriptionChosen.length <= 100){
              draft.DescriptionErrors.hasErrors = true;
              draft.DescriptionErrors.errorMessage = 'Description must be 100 words';
          }
          break;

      case 'catchAreaErrors':
          if(action.areaValueChosen.length ===0){
              draft.AreaErrors.hasErrors = true;
              draft.AreaErrors.errorMessage = 'Area is required'
          }
          break;

      case 'catchBoroughErrors':
          if(action.boroughValueChosen.length ===0){
              draft.BoroughErrors.hasErrors = true;
              draft.BoroughErrors.errorMessage = 'Borough is required'
          }
          break; 
          
      case 'emptyTitle':
          draft.titleErrors.hasErrors = true
          draft.titleErrors.errorMessage = 'This field must not be empty'
          break;

      case 'emptylistingType':
          draft.listingTypeErrors.hasErrors = true
          draft.listingTypeErrors.errorMessage = 'This field must not be empty'
          break;

      case 'emptyprice':
          draft.PriceErrors.hasErrors = true
          draft.PriceErrors.errorMessage = 'This field must not be empty'
          break;

      case 'emptydescription':
          draft.DescriptionErrors.hasErrors = true
          draft.DescriptionErrors.errorMessage = 'This field must not be empty'
          break;

      case 'emptyarea':
          draft.AreaErrors.hasErrors = true
          draft.AreaErrors.errorMessage = 'This field must not be empty'
          break;

      case 'emptyborough':
          draft.BoroughErrors.hasErrors = true
          draft.BoroughErrors.errorMessage = 'This field must not be empty'
          break;

     
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  const [profileData, setProfileData] = useState({
    job_provider: '',

  });
  const [jobProviders, setJobProviders] = useState([]);

 

    useEffect(() => {
      axios.get(`${REACT_APP_API_URL}/api/job_providers/`)
          .then((response) => {
              setJobProviders(response.data);
          })
          .catch((error) => {
              console.log('Error fetching job providers:', error);
          });
  }, []);

  const handleSelect = (e) => {
    setProfileData({ ...profileData, job_provider: e.target.value });
    console.log(`Selected job provider: ${e.target.value}`); // Debugging line
}

  useEffect(() => {
    if (state.sendRequest) {
        async function AddProperty() {
            const formData = new FormData();
            formData.append('title', state.titleValue);
            formData.append('job_provider', profileData.job_provider); // Ensure this is correct
            formData.append('description', state.descriptionValue);
            formData.append('area', state.areaValue);
            formData.append('borough', state.boroughValue);
            formData.append('listing_type', state.listingTypeValue);
            formData.append('price', state.priceValue);
            formData.append('latitude', state.latitudeValue);
            formData.append('longitude', state.longitudeValue);
            formData.append('picture1', state.picture1Value);

            console.log([...formData]); // Debugging line to check the form data

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/job/create/', formData);
                console.log(response.data);
                navigate('/job_user');
                toast.success('User updated successfully!');
                navigate(0);
            } catch (e) {
                console.log(e.response);
                toast.error('Failed to update user.');
            }
        }
        AddProperty();
    }
}, [state.sendRequest, navigate]);

  useEffect(() => {
    if (state.boroughValue === 'Kovalam') {
      state.mapInstance.setView([8.399845986344863, 76.98308472374298], 13);
      dispatch({ type: 'changeMarkerposition', changeLatitude: 8.399845986344863, changeLongitude: 76.98308472374298 });
    } else if (state.boroughValue === 'Karamana') {
      state.mapInstance.setView([8.482109045600668, 76.9661929115117], 13);
      dispatch({ type: 'changeMarkerposition', changeLatitude: 8.482109045600668, changeLongitude: 76.9661929115117 });
    } else if (state.boroughValue === 'Nedumangad') {
      state.mapInstance.setView([8.612719832912235, 76.99735717160095], 15);
      dispatch({ type: 'changeMarkerposition', changeLatitude: 8.612719832912235, changeLongitude: 76.99735717160095 });
    } else if (state.boroughValue === 'Kanjiramkulam') {
      state.mapInstance.setView([8.360465475683004, 77.05244061054387], 15);
      dispatch({ type: 'changeMarkerposition', changeLatitude: 8.360465475683004, changeLongitude: 77.05244061054387 });
    }
  }, [state.boroughValue, state.mapInstance]);

  function TheMapComponent() {
    const map = useMap();
    dispatch({ type: 'getMap', mapData: map });
    return null;
  }

  function BoroughDisplay() {
    if (state.boroughValue === 'Kovalam') {
      return <Polygon positions={Kovalam} />;
    } else if (state.boroughValue === 'Karamana') {
      return <Polygon positions={Karamana} />;
    } else if (state.boroughValue === 'Nedumangad') {
      return <Polygon positions={Nedumangad} />;
    } else if (state.boroughValue === 'Kanjiramkulam') {
      return <Polygon positions={Kanjiramkulam} />;
    }
    return null;
  }

  const markerRef = useRef(null);
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker) {
        dispatch({ type: 'catchLatitudeValueChange', latitudeValueChosen: marker.getLatLng().lat });
        dispatch({ type: 'catchLongitudeValueChange', longitudeValueChosen: marker.getLatLng().lng });
      }
    },
  }), [dispatch]);

  useEffect(() => {
    if (state.uploadedPictures[0]) {
      dispatch({ type: 'catchPicture1ValueChange', picture1ValueChosen: state.uploadedPictures[0] });
    }
  }, [state.uploadedPictures[0], dispatch]);

 
  function HandleSubmit(e) {
    e.preventDefault();
        console.log('the form has been submitted')

        if(!state.titleErrors.hasErrors && 
            !state.listingTypeErrors. hasErrors && 
            !state.PriceErrors.hasErrors &&
            !state.DescriptionErrors.hasErrors &&
            !state.AreaErrors.hasErrors &&
            !state.BoroughErrors.hasErrors &&
            state.latitudeValue && 
            state.longitudeValue 
           
        ){
            dispatch({type:'changeSendRequest'})

        }
        else if(state.titleValue === ''){
            dispatch({type:'emptyTitle'})
            window.scrollTo(0,0);
        }
        else if(state.listingTypeValue === ''){
            dispatch({type:'emptylistingType'})
            window.scrollTo(0,0);
        }

        else if(state.priceValue === ''){
            dispatch({type:'emptyprice'})
            window.scrollTo(0,0);
        }
        else if(state.descriptionValue === ''){
            dispatch({type:'emptydescription'})
            window.scrollTo(0,0);
        }
        
        else if(state.areaValue === ''){
            dispatch({type:'emptyarea'})
            window.scrollTo(0,0);
        }
        else if(state.boroughValue === ''){
            dispatch({type:'emptyborough'})
            window.scrollTo(0,0);
        }
       
    }


 

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
      <DialogTitle sx={{ textAlign: 'center' }}>
        Add New Property
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={HandleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <TextField
                  id="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                 
                  value={state.titleValue}
                  onChange={(e) => dispatch({ type: 'catchTitleChange', titleChosen: e.target.value })}
                  onBlur={(e) => dispatch({ type: 'catchTitleErrors', titleChosen: e.target.value })}
                  error={state.titleErrors.hasErrors}
                  helperText={state.titleErrors.errorMessage}
                />
                
      

        <FormControl variant="outlined" fullWidth>
            <InputLabel id="job-provider-label">Job Provider</InputLabel>
            <Select
                labelId="job-provider-label"
                id="job_provider"
                name="job_provider"
                value={profileData.job_provider}
                onChange={handleSelect}
                label="Job Provider"
            >
                <MenuItem value=""><em>None</em></MenuItem>
                {jobProviders.map((provider) => (
                    <MenuItem key={provider.username} value={provider.username}>{provider.username}</MenuItem>
                ))}
            </Select>
        </FormControl>

                <FormControl fullWidth error={state.listingTypeErrors.hasErrors}>
                  <InputLabel id="listingTypeLabel">Listing Type</InputLabel>
                  <Select
                    labelId="listingTypeLabel"
                    id="listingType"
                    value={state.listingTypeValue}
                    label="Listing Type"
                    onChange={(e) => dispatch({ type: 'catchListingTypeChange', listingTypeChosen: e.target.value })}
                    onBlur={(e)=>dispatch({type:'catchListingTypeErrors',listingTypeChosen:e.target.value})}
                  >
                    {listingtypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {state.listingTypeErrors.hasErrors && (
                        <FormHelperText>{state.listingTypeErrors.errorMessage}</FormHelperText>
                    )}
                </FormControl>
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={state.descriptionValue}
                  onChange={(e) => dispatch({ type: 'catchDescriptionValueChange', descriptionChosen: e.target.value })}
                  onBlur={(e)=>dispatch({type:'catchDescriptionErrors',descriptionChosen:e.target.value})}
                  error ={state.DescriptionErrors.hasErrors ? true:false}
                  helperText={state.DescriptionErrors.errorMessage}/>  
            
                <FormControl fullWidth  error={state.AreaErrors.hasErrors}>
                  <InputLabel id="areaLabel">Area</InputLabel>
                  <Select
                    labelId="areaLabel"
                    id="area"
                    value={state.areaValue}
                    label="Area"
                    onChange={(e) => dispatch({ type: 'catchAreaValueChange', areaValueChosen: e.target.value })}
                    onBlur={(e) => dispatch({ type: 'catchAreaErrors', areaValueChosen: e.target.value })}
                  >
                    {AreaOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {state.AreaErrors.hasErrors && (
                    <FormHelperText>{state.AreaErrors.errorMessage}</FormHelperText>
                )}
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="boroughLabel">Borough</InputLabel>
                  <Select
                    labelId="boroughLabel"
                    id="borough"
                    value={state.boroughValue}
                    label="Borough"
                    onChange={(e) => dispatch({ type: 'catchBoroughValueChange', boroughValueChosen: e.target.value })}
                  >
                    {TVMOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id="latitude"
                  label="Latitude"
                  variant="outlined"
                  fullWidth
                  value={state.latitudeValue}
                  onChange={(e) => dispatch({ type: 'catchLatitudeValueChange', latitudeValueChosen: e.target.value })}
                />
                <TextField
                  id="longitude"
                  label="Longitude"
                  variant="outlined"
                  fullWidth
                  value={state.longitudeValue}
                  onChange={(e) => dispatch({ type: 'catchLongitudeValueChange', longitudeValueChosen: e.target.value })}
                />
                <TextField
                  id="price"
                  label="Price"
                  variant="outlined"
                  fullWidth
                  value={state.priceValue}
                  onChange={(e) => dispatch({ type: 'catchPriceValueChange', priceValueChosen: e.target.value })}
                  onBlur={(e)=>dispatch({type:'catchPriceErrors',priceValueChosen:e.target.value})}
                    
                  error ={state.PriceErrors.hasErrors ? true:false}
                  helperText={state.PriceErrors.errorMessage}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  component="label"
                >
                  Upload Pictures
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={(e) => dispatch({ type: 'catchUploadedPictures', picturesChosen: Array.from(e.target.files) })}
                  />
                </Button>

                    {/* map */}

                    <Grid item style ={{marginTop:'1rem'}}>
                        {state.latitudeValue && state.longitudeValue ? <Alert severity='success'>Your property is located @ 
                            {state.latitudeValue} ,{state.longitudeValue} 

                        </Alert>: <Alert severity='warning'>Locate your property on the map before submitting this form</Alert>}


                    </Grid>
                <MapContainer center={[8.5241, 76.9366]} zoom={13} style={{ height: '400px' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={state.markerPosition}
                    draggable={true}
                    eventHandlers={eventHandlers}
                    ref={markerRef}
                  />
                  <BoroughDisplay />
                  <TheMapComponent />
                </MapContainer>
              </Stack>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }} 
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Add_job;