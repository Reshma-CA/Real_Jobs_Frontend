import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, MenuItem, FormControl, InputLabel, Box, Button, Grid, Paper, TextField, Avatar, Select, IconButton, Stack } from '@mui/material';
import { REACT_APP_API_URL } from '../../Api_Constant';
import { useParams, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit_job = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    job_provider: '',
    job_provider_username: '',
    title: '',
    description: '',
    area: '',
    borough: '',
    listing_type: '',
    price: '',
    latitude: '',
    longitude: '',
    picture1: null,
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileData({ ...profileData, picture1: e.target.files[0] });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/jobEdit/${id}/`);
        setProfileData({
          job_provider: response.data.job_provider,
          job_provider_username: response.data.job_provider_username,
          title: response.data.title,
          description: response.data.description,
          area: response.data.area,
          borough: response.data.borough,
          listing_type: response.data.listing_type,
          price: response.data.price,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          picture1: null,
        });
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching profile details:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', profileData.title);
    formData.append('job_provider', profileData.job_provider);
    formData.append('description', profileData.description);
    formData.append('area', profileData.area);
    formData.append('borough', profileData.borough);
    formData.append('listing_type', profileData.listing_type);
    formData.append('price', profileData.price);
    formData.append('latitude', profileData.latitude);
    formData.append('longitude', profileData.longitude);

    if (profileData.picture1) {
      formData.append('picture1', profileData.picture1);
    }

    try {
      const response = await axios.put(`${REACT_APP_API_URL}/api/jobEdit/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/job_user');
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.log('Error updating profile:', error);
      toast.error('Failed to update profile.');
    }
  };

  const handleCancel = () => {
    navigate('/job_user');
  };

  return (
    <div>
    
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={10} style={{ padding: 20, height: '130vh', width: '100%', maxWidth: 380, margin: '20px auto', backgroundColor: '#f4e6fa' }}>
            <Grid align='center'>
              <h2 style={{ color: '#9d13bf' }}>Update</h2>
            </Grid>
            <form onSubmit={handleSubmit}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                style={{ margin: '8px 0' }}
                fullWidth
                required
                value={profileData.title}
                onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
              />

              <TextField
                label='Job provider name'
                id='job_provider_username'
                style={{ margin: '8px 0' }}
                fullWidth
                required
                value={profileData.job_provider_username}
                onChange={(e) => setProfileData({ ...profileData, job_provider_username: e.target.value })}
              />

              <TextField
                id="description"
                label="Description"
                style={{ margin: '8px 0' }}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={profileData.description}
                onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
              />

              <TextField
                id="area"
                label="Area"
                style={{ margin: '8px 0' }}
                variant="outlined"
                fullWidth
                value={profileData.area}
                onChange={(e) => setProfileData({ ...profileData, area: e.target.value })}
              />

              <TextField
                id="borough"
                label="Location"
                style={{ margin: '8px 0' }}
                variant="outlined"
                fullWidth
                value={profileData.borough}
                onChange={(e) => setProfileData({ ...profileData, borough: e.target.value })}
              />

              <TextField
                id="listing_type"
                label="Building type"
                style={{ margin: '8px 0' }}
                variant="outlined"
                fullWidth
                value={profileData.listing_type}
                onChange={(e) => setProfileData({ ...profileData, listing_type: e.target.value })}
              />

              <TextField
                id="price"
                label="Price"
                type='number'
                style={{ margin: '8px 0' }}
                variant="outlined"
                fullWidth
                value={profileData.price}
                onChange={(e) => setProfileData({ ...profileData, price: e.target.value })}
              />

              <TextField
                id="latitude"
                label="Latitude"
                type='number'
                style={{ margin: '8px 0' }}
                variant="outlined"
                fullWidth
                value={profileData.latitude}
                onChange={(e) => setProfileData({ ...profileData, latitude: e.target.value })}
              />

              <TextField
                id="longitude"
                label="Longitude"
                type='number'
                style={{ margin: '8px 0' }}
                variant="outlined"
                fullWidth
                value={profileData.longitude}
                onChange={(e) => setProfileData({ ...profileData, longitude: e.target.value })}
              />

              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: '15px' }}
                fullWidth
              >
                Upload Picture
                <input
                  type="file"
                  accept='image/png, image/jpeg'
                  hidden
                  onChange={handleFileChange}
                />
              </Button>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%' }}>
                  <Button variant="contained" style={{ backgroundColor: '#9d13bf' }} type="submit">Update</Button>
                  <Button variant="contained" style={{ backgroundColor: '#ff0000' }} onClick={handleCancel}>Cancel</Button>
                </div>
              </div>
            </form>
          </Paper>
       
        </Grid>
      </Grid>
    </div>
  );
};

export default Edit_job;
