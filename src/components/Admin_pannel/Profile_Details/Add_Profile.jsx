import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Stack, TextField, MenuItem, Select, IconButton, InputLabel, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../../Api_Constant';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add_Profile = ({ open, handleClose }) => {
  const [profileData, setProfileData] = useState({
    job_provider: '',
    agency_name: '',
    phone_number: '',
    bio: '',
    profile_picture: null,
  });
  const [jobProviders, setJobProviders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/api/job_providers/`)
      .then((response) => {
        setJobProviders(response.data);
      })
      .catch((error) => {
        console.log('Error fetching job providers:', error);
      });
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    setProfileData({ ...profileData, job_provider: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, profile_picture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('job_provider', profileData.job_provider);
    formData.append('agency_name', profileData.agency_name);
    formData.append('phone_number', profileData.phone_number);
    formData.append('bio', profileData.bio);
    if (profileData.profile_picture) {
      formData.append('profile_picture', profileData.profile_picture);
    }

    axios.post(`${REACT_APP_API_URL}/profiles/create/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        toast.success('Profile created successfully!');
        handleClose();
        navigate(0)
      })
      .catch((error) => {
        console.log('Error creating profile:', error);
        toast.error('Failed to create profile.');
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>
        Add Profile
        <IconButton style={{ float: 'right' }} onClick={handleClose}>
          <CloseIcon color='primary' />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
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
                <MenuItem key={provider.id} value={provider.username}>{provider.username}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant='outlined'
            label='Agency Name'
            id='agency_name'
            name='agency_name'
            placeholder='Enter agency name'
            value={profileData.agency_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            variant='outlined'
            label='Phone Number'
            id='phone_number'
            name='phone_number'
            placeholder='Enter phone number'
            value={profileData.phone_number}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            variant='outlined'
            label='Bio'
            id='bio'
            name='bio'
            placeholder='Enter bio'
            value={profileData.bio}
            onChange={handleChange}
            multiline
            rows={6}
            fullWidth
          />
          <Button
            variant="contained"
            component="label"
            sx={{ marginBottom: '15px' }}
            fullWidth
          >
            PROFILE PICTURE
            <input
              type="file"
              accept='image/png, image/jpeg'
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Button
            color='primary'
            variant='contained'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default Add_Profile;
