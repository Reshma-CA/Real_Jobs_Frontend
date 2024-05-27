import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, MenuItem, FormControl, InputLabel, Select, Button, IconButton, Stack, TextField, Grid } from '@mui/material';
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
    // picture2Value: '',
    // picture3Value: '',
    // picture4Value: '',
    // picture5Value: '',
    mapInstance: null,
    markerPosition: { lat: '8.5241', lng: '76.9366' },
    uploadedPictures: [],
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
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
      case 'catchPicture1ValueChange':
        draft.picture1Value = action.picture1ValueChosen;
        break;
      // case 'catchPicture2ValueChange':
      //   draft.picture2Value = action.picture2ValueChosen;
      //   break;
      // case 'catchPicture3ValueChange':
      //   draft.picture3Value = action.picture3ValueChosen;
      //   break;
      // case 'catchPicture4ValueChange':
      //   draft.picture4Value = action.picture4ValueChosen;
      //   break;
      // case 'catchPicture5ValueChange':
      //   draft.picture5Value = action.picture5ValueChosen;
      //   break;
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
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  const [profileData, setProfileData] = useState({
    job_provider: '',

  });
  const [jobProviders, setJobProviders] = useState([]);

  // useEffect(() => {
  //   axios.get(`${REACT_APP_API_URL}/api/job_providers/`)
  //     .then((response) => {
  //       setJobProviders(response.data);
  //     })
  //     .catch((error) => {
  //       console.log('Error fetching job providers:', error);
  //     });
  // }, []);

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

  // useEffect(() => {
  //   if (state.uploadedPictures[1]) {
  //     dispatch({ type: 'catchPicture2ValueChange', picture2ValueChosen: state.uploadedPictures[1] });
  //   }
  // }, [state.uploadedPictures[1], dispatch]);

  // useEffect(() => {
  //   if (state.uploadedPictures[2]) {
  //     dispatch({ type: 'catchPicture3ValueChange', picture3ValueChosen: state.uploadedPictures[2] });
  //   }
  // }, [state.uploadedPictures[2], dispatch]);

  // useEffect(() => {
  //   if (state.uploadedPictures[3]) {
  //     dispatch({ type: 'catchPicture4ValueChange', picture4ValueChosen: state.uploadedPictures[3] });
  //   }
  // }, [state.uploadedPictures[3], dispatch]);

  // useEffect(() => {
  //   if (state.uploadedPictures[4]) {
  //     dispatch({ type: 'catchPicture5ValueChange', picture5ValueChosen: state.uploadedPictures[4] });
  //   }
  // }, [state.uploadedPictures[4], dispatch]);

  function HandleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'changeSendRequest' });
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
                  required
                  value={state.titleValue}
                  onChange={(e) => dispatch({ type: 'catchTitleChange', titleChosen: e.target.value })}
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

                <FormControl fullWidth>
                  <InputLabel id="listingTypeLabel">Listing Type</InputLabel>
                  <Select
                    labelId="listingTypeLabel"
                    id="listingType"
                    value={state.listingTypeValue}
                    label="Listing Type"
                    onChange={(e) => dispatch({ type: 'catchListingTypeChange', listingTypeChosen: e.target.value })}
                  >
                    {listingtypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
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
                />
                <FormControl fullWidth>
                  <InputLabel id="areaLabel">Area</InputLabel>
                  <Select
                    labelId="areaLabel"
                    id="area"
                    value={state.areaValue}
                    label="Area"
                    onChange={(e) => dispatch({ type: 'catchAreaValueChange', areaValueChosen: e.target.value })}
                  >
                    {AreaOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
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
