import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Grid, Paper, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../../Api_Constant';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit_User = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [allListings, setAllListings] = useState({
    id: id,
    username: '',
    email: '',
    password: '',
    password2: '',
    passwordError: '',
    password2Error: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/userAdminedit/${id}/`);
        setAllListings((prevState) => ({
          ...prevState,
          username: response.data.username,
          email: response.data.email,
        }));
      } catch (error) {
        console.log('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [id]); 

  const validatePassword = () => {
    let valid = true;

    if (allListings.password.trim() === '') {
      setAllListings((prevState) => ({ ...prevState, passwordError: 'Password is required' }));
      valid = false;
    } else {
      setAllListings((prevState) => ({ ...prevState, passwordError: '' }));
    }

    if (allListings.password2.trim() === '') {
      setAllListings((prevState) => ({ ...prevState, password2Error: 'Confirmation password is required' }));
      valid = false;
    } else {
      setAllListings((prevState) => ({ ...prevState, password2Error: '' }));
    }

    if (allListings.password !== allListings.password2) {
      setAllListings((prevState) => ({ ...prevState, password2Error: 'Passwords do not match' }));
      valid = false;
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    axios.put(`${REACT_APP_API_URL}/api/userAdminedit/${id}/`, {
      username: allListings.username,
      email: allListings.email,
      password: allListings.password,
      password2: allListings.password2
    })
      .then(res => {
        toast.success('User updated successfully!');
        navigate('/user'); 
      })
      .catch(error => {
        console.log('Error updating user:', error);
        toast.error('Failed to update user.');
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/user');
  };

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={10} style={{ padding: 20, height: '70vh', width: '100%', maxWidth: 380, margin: '20px auto', backgroundColor: '#f4e6fa' }}>
            <Grid align='center'>
              <h2 style={{ color: '#9d13bf' }}>Update</h2>
            </Grid>
            <form onSubmit={handleSubmit}>
              <TextField
                label='Username'
                id='username'
                placeholder='Enter username'
                style={{ margin: '8px 0' }}
                fullWidth
                required
                value={allListings.username}
                onChange={(e) => setAllListings({ ...allListings, username: e.target.value })}
              />
              <TextField
                label='Email'
                id='email'
                placeholder='Enter email'
                style={{ margin: '8px 0' }}
                fullWidth
                required
                value={allListings.email}
                onChange={(e) => setAllListings({ ...allListings, email: e.target.value })}
              />
              <TextField
                label='Password'
                id='password'
                placeholder='Enter password'
                type='password'
                style={{ margin: '8px 0' }}
                fullWidth
                value={allListings.password}
                onChange={(e) => setAllListings({ ...allListings, password: e.target.value })}
                error={Boolean(allListings.passwordError)}
                helperText={allListings.passwordError}
              />
              <TextField
                label='Confirm password'
                id='password2'
                placeholder='Confirm password'
                type='password'
                style={{ margin: '8px 0' }}
                fullWidth
                value={allListings.password2}
                onChange={(e) => setAllListings({ ...allListings, password2: e.target.value })}
                error={Boolean(allListings.password2Error)}
                helperText={allListings.password2Error}
              />
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
}

export default Edit_User;
