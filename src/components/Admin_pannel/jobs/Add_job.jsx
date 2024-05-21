import React, { useState,useEffect, useRef,useMemo ,useContext} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, MenuItem,DialogActions,Grid, FormControl,InputLabel,Select,Button ,IconButton,Stack,TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MapContainer, TileLayer, useMap ,Marker, Polygon,} from 'react-leaflet'

import Kovalam from '../../../assets/Boroughs/Kovalam';
import Karamana from '../../../assets/Boroughs/Karamana';
import Nedumangad from '../../../assets/Boroughs/Nedumangad';
import Kanjiramkulam from '../../../assets/Boroughs/Kanjiramkulam';



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
// Dummy job provider
const jobProviders=[
  {
      value: '',
      label: '',
    },
    {
      value: 'kerala',
      label: 'kerala',
    },
  
]


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
 const areaValue = 'kerala'
 const boroughValue = ''
 const  latitudeValueChosen =''
 const vlongitudeValueChosen =''

 const markerPosition={
  lat:'8.5241',
  lng:'76.9366'
}

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
 
];

const Add_job = ({ open, handleClose }) => {
  const [JobData, setJobData] = useState({
    
    
  });

  function TheMapcomponent(){
    const map = useMap()
    // dispatch({type:'getMap', mapData:map})
    return null;
}

 // Borough dispaly function

 function BoroughDisplay(){
  if(boroughValue === 'Kovalam'){
      return <Polygon positions={Kovalam}/>
  }
  else if(boroughValue === 'Karamana'){
      return <Polygon positions={Karamana}/>

  }
  else if(boroughValue === 'Nedumangad'){
      return <Polygon positions={Nedumangad}/>

  }
  else if(boroughValue === 'Kanjiramkulam'){
      return <Polygon positions={Kanjiramkulam}/>

  }
}

const markerRef = useRef(null)
const eventHandlers = useMemo(
    () => ({
    dragend() {
        const marker = markerRef.current;
        latitudeValueChosen: marker.getLatLng().lat; // Corrected action type
        longitudeValueChosen: marker.getLatLng().lng;
       
    },
    }),
    [],
);

  
  const btstyle = { margin: '8px 0' };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
    <DialogTitle>Add Job <IconButton style={{ float: 'right' }} onClick={handleClose}><CloseIcon color='primary' /></IconButton></DialogTitle>
    <DialogContent>
      <Stack spacing={2} margin={2}>
      <Grid item container style={{marginTop:'1rem'}}>
        <TextField label='Job Title' id='title' placeholder='enter job title' variant='standard' style={btstyle} fullWidth required />                    
        </Grid>

        <FormControl variant="standard" fullWidth>
            <InputLabel id="job-provider-label">Job Provider</InputLabel>
            <Select
              labelId="job-provider-label"
              id="job_provider"
              name="job_provider"
       
              label="Job Provider"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {jobProviders.map((provider) => (
                <MenuItem key={provider.id} value={provider.value}>{provider.value}</MenuItem>
              ))}
            </Select>
          </FormControl>


        <Grid item container justifyContent='space-between' >
                    <Grid item xs={5} style={{ marginTop: '1rem' }}>
                        <FormControl fullWidth required>
                            <InputLabel id="Type of building">Type of building</InputLabel>
                            <Select
                                variant='standard'
                                id="listing_type"
                               
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
                    <TextField label='Payment Amount per day' id='price' type="number" placeholder='enter price' variant='standard' style={btstyle} fullWidth required  />                    
                    </Grid> 
                    </Grid>

                    <Grid item container style={{marginTop:'1rem'}}>
                    <TextField label='Job Description' id='description' placeholder='enter Description' variant='outlined' 
                    multiline rows={6}
                    style={btstyle} fullWidth required  />                    
                    </Grid> 

                    <Grid item container justifyContent='space-between' >
                    <Grid item xs={5} style={{ marginTop: '1rem' }}>
                        <FormControl fullWidth required>
                            <InputLabel id="area">Area</InputLabel>
                            <Select
                                variant='standard'
                                id="area"
                                
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
                               
                            >
                                {areaValue === 'kerala' ? TVMOptions.map((option) => (
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
                    position={markerPosition}
                    ref={markerRef}>
                   
                    </Marker>

                   

                   {/* </Polygon> */}

                    </MapContainer>


                </Grid>

                
                <Button variant="contained" component="label"  sx={{marginBottom:'15px'}} style={{ btstyle, backgroundColor: '#eb2f77', }} 
                     fullWidth >UPLOAD PICTURES (MAX 5)
                    <input type="file" multiple accept='image/png, image/gif,image/jpeg' hidden
                    onChange={(e)=>dispatch({type:'catchUploadedPictures',picturesChosen:e.target.files,})}
                    />
                    </Button>

                 {/* map */}
            
        
        <Button sx={{ cursor: 'pointer', backgroundColor: '#34c762' }} variant='contained'>Submit</Button>
      </Stack>
    </DialogContent>
  </Dialog>
  )
}

export default Add_job