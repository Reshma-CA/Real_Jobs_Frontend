import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, FormLabel, Select, InputLabel, FormControl, Button, MenuItem, Stack, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../Api_Constant';

const titleOptions = [
  { value: 'Plumber', label: 'Plumber' },
  { value: 'Electrician', label: 'Electrician' },
  { value: 'Coconut Plucker', label: 'Coconut Plucker' },
  { value: 'Painter', label: 'Painter' },
  { value: 'Cleaner', label: 'Cleaner' }
];

const placesOptions = [
  { value: 'Kovalam', label: 'Kovalam' },
  { value: 'Karamana', label: 'Karamana' },
  { value: 'Nedumangad', label: 'Nedumangad' },
  { value: 'Kanjiramkulam', label: 'Kanjiramkulam' }
];

const Filter = ({ open, handleClose }) => {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const params = {};
    if (selectedTitle) params.title = selectedTitle;
    if (selectedPlace) params.borough = selectedPlace;
    if (selectedPriceRange) params.priceRange = selectedPriceRange;

    axios.post(`${REACT_APP_API_URL}/api/job/filters/`, params)
      .then(response => {
        navigate('/filterdata', { state: { filteredData: response.data.data } }); // Use response.data.data to access filtered data
        handleClose();
      })
      .catch(error => {
        console.error('Error fetching filtered jobs:', error);
        handleClose();
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>
        Filter Jobs 
        <CloseIcon style={{ float: 'right', cursor: 'pointer' }} onClick={handleClose} />
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="title-label">Available Jobs</InputLabel>
            <Select
              labelId="title-label"
              id="title"
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              label="Available Jobs"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {titleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="places-label">Job Available Places</InputLabel>
            <Select
              labelId="places-label"
              id="places"
              value={selectedPlace}
              onChange={(e) => setSelectedPlace(e.target.value)}
              label="Job Available Places"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {placesOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Price Per Day</FormLabel>
            <RadioGroup
              aria-label="price-range"
              name="price-range"
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <FormControlLabel value="" control={<Radio />} label="All" />
              <FormControlLabel value="0-500" control={<Radio />} label="0₹-500₹" />
              <FormControlLabel value="500-1000" control={<Radio />} label="500₹-1000₹" />
              <FormControlLabel value="1000-1500" control={<Radio />} label="1000₹-1500₹" />
            </RadioGroup>
          </FormControl>

          <Button color='primary' variant='contained' onClick={handleSubmit}>Submit</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Filter;
