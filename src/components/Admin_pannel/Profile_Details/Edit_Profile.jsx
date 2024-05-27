import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Box, Button, Grid, Paper, TextField, Avatar } from '@mui/material';
import { REACT_APP_API_URL } from '../../Api_Constant';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit_Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    job_provider: '', // Store the job provider ID here
    job_provider_username: '',
    agency_name: '',
    phone_number: '',
    bio: '',
    profile_picture: null,
  });

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, profile_picture: e.target.files[0] });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/ProfileAdminedit/${id}/`);
        setProfileData({
          job_provider: response.data.job_provider, // Assuming response includes job provider ID
          job_provider_username: response.data.job_provider_username,
          agency_name: response.data.agency_name,
          phone_number: response.data.phone_number,
          bio: response.data.bio,
          profile_picture: null, // Assuming the picture is not loaded initially
        });
      } catch (error) {
        console.log('Error fetching profile details:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
     formData.append('job_provider', profileData.job_provider); // Use the ID here
    formData.append('agency_name', profileData.agency_name);
    formData.append('phone_number', profileData.phone_number);
    formData.append('bio', profileData.bio);
    if (profileData.profile_picture) {
      formData.append('profile_picture', profileData.profile_picture);
    }

    try {
      const response = await axios.put(`${REACT_APP_API_URL}/api/ProfileAdminedit/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      
      navigate('/profile_user');
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.log('Error updating profile:', error);
      toast.error('Failed to update profile.');
    }
  };

  const handleCancel = () => {
    navigate('/profile_user');
  };

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={10} style={{ padding: 20, height: '80vh', width: '100%', maxWidth: 380, margin: '20px auto', backgroundColor: '#f4e6fa' }}>
            <Grid align='center'>
              <h2 style={{ color: '#9d13bf' }}>Update</h2>
            </Grid>
            <form onSubmit={handleSubmit}>
              <TextField
                label='Job provider name'
                id='job_provider_username'
                placeholder='Enter job provider name'
                style={{ margin: '8px 0' }}
                fullWidth
                required
                value={profileData.job_provider_username}
                onChange={(e) => setProfileData({ ...profileData, job_provider_username: e.target.value })}
              />
              <TextField
                label='Agency name'
                id='agency_name'
                placeholder='Enter Agency name'
                style={{ margin: '8px 0' }}
                fullWidth
                required
                value={profileData.agency_name}
                onChange={(e) => setProfileData({ ...profileData, agency_name: e.target.value })}
              />
              <TextField
                label='Phone Number'
                id='phone_number'
                placeholder='Enter phone number'
                type='number'
                style={{ margin: '8px 0' }}
                fullWidth
                required
                value={profileData.phone_number}
                onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
              />
              <TextField
                label='Bio'
                id='bio'
                placeholder='Enter Bio'
                type='text'
                style={{ margin: '8px 0' }}
                multiline
                rows={6}
                fullWidth
                required
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
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

export default Edit_Profile;
