import React from 'react'
import {AppBar,Toolbar,styled,Box,Typography,Button,Popper,Grow,Paper,Menu,MenuItem,Fade} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import MenuIcon from '@mui/icons-material/Menu';
import Person2Icon from '@mui/icons-material/Person2';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import axios from 'axios'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { Link,useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import { useContext } from 'react';
import Swal from 'sweetalert2';

// Contexts

import StateContext from '../context/StateContext';
import DispatchContxt from '../context/DispatchContxt';


const NavBar = () => {


    const navigate = useNavigate()
    const GlobalState = useContext(StateContext)
    const GlobalDispatch = useContext(DispatchContxt)


    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //   setAnchorEl(null);
    // };

    

    const StyledToolbar = styled(Toolbar)({
        display:"flex",
        justifyContent:'space-between',
        

    })

    const StyledBox = styled(Box)({
      display:'flex',
      gap:15,
      alignItems: 'center',      
    })

    const MenuBox = styled(Box)({
        display:'flex',
        gap:30,
          
      })
     

      const AuthBox = styled(Box)({
        display:'flex',
        gap:30,
        alignItems: 'center',
          
      })
      
      const MenuItems = [
        { Name: "Job Listings", Link: "/listings" },
        { Name: "Job Vacancy", Link: "/home" },
        { Name: "Add Jobs", Link: "/home" },
        { Name: "About Us", Link: "/home"},
        
      ];
      async function HandleLogOut() {
        try {
          const { isConfirmed } = await Swal.fire({
            title: "Do you want to logout ?",
            showDenyButton: true,
            confirmButtonText: "Logout",
            denyButtonText: "Cancel",
          });
      
          if (isConfirmed) {
            const response = await axios.post(
              'http://127.0.0.1:8000/api-auth-djoser/token/logout/', // Replace with your actual endpoint
              {}, // Djoser might not require data in the body for logout
              {
                headers: { Authorization: `Token ${GlobalState.userToken}` },
              }
            );
      
            if (response.status === 204 || response.status === 200) { // Handle both 204 (No Content) and 200 (OK)
              GlobalDispatch({ type: 'logout' });
              navigate('/');
              Swal.fire("Logout successful", "", "success");
            } else {
              console.error('Error occurred during logout:', response.data);
              Swal.fire("Error", "An error occurred during logout", "error");
            }
          } else {
            Swal.fire("Logout cancelled", "", "info");
          }
        } catch (error) {
          console.error('Error occurred during logout:', error);
          Swal.fire("Error", "An error occurred during logout", "error");
        }
      }
      
      
  return (
    <AppBar sx ={{backgroundColor:'#cb23de'}} position={'static'}>
        <StyledToolbar>
        <StyledBox >
           

        <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <MenuIcon
            sx={{ color: 'white', display: { xs: 'block', sm: 'block', md: 'none' } }}
            {...bindTrigger(popupState)}
          />
          <Menu {...bindMenu(popupState)} sx={{ color: 'white', display: { xs: 'block', sm: 'block', md: 'none' } }}>

          
        {MenuItems.map((items, index) => (
        <MenuItem key={index} sx={{ cursor: 'pointer', fontSize: '16px' }} onClick={popupState.close}>
          <Link to={items.Link} style={{ textDecoration: 'none', color: 'inherit' }}>
            {items.Name}
          </Link>
        </MenuItem>
      ))}
            
          </Menu>
        </React.Fragment>
      )}
    </PopupState>



           
        <WorkIcon sx={{ display: { xs: "none", sm: "none", md: "flex" } }}/>
        <Typography   style={{ fontWeight: 'bold' ,fontSize: '1.3rem',}}> REALJOBS</Typography>
         </StyledBox >
        
        <MenuBox  sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
          
        
          {MenuItems.map((items, index) => (
            <Typography key={index} sx={{ cursor: 'pointer', fontSize: '20px' }} component={Link} to={items.Link} style={{ textDecoration: 'none', color: 'inherit' }}>{items.Name}</Typography>
          ))}
        </MenuBox>

        <AuthBox>
          {GlobalState.userIsLogged ? 
          <Button 
       
        sx={{ cursor: 'pointer', backgroundColor: '#55c98d', color: '#faf5f9', fontSize: '15px', fontWeight: 'bold' }}>
              
             Hi, {GlobalState.userUserName}
          </Button>

          

          
          :
          <Link to='/login'>
              <Button sx={{ cursor: 'pointer', backgroundColor: '#55c98d', color: '#faf5f9', fontSize: '15px', fontWeight: 'bold' }}>
                  Login
              </Button>
          </Link>
      }



          {GlobalState.userIsLogged ? 
          <Button onClick={HandleLogOut}
       
        sx={{ cursor: 'pointer', backgroundColor: '#f2ca5c  ', color: '#faf5f9', fontSize: '15px', fontWeight: 'bold' }}>
              
             Logout
          </Button>

                  
          :
          <Link to='/login'>
             
          </Link>
      }

      {/* Register */}
      

      {GlobalState.userIsLogged ? 
         <Link></Link>
        
          :
          <Link to = '/register'><Button sx ={{cursor:'pointer',backgroundColor: '#f23366', color: '#faf5f9', fontSize: '15px',fontWeight:'bold'}}>Signup</Button></Link>
      }
           
            
        
        </AuthBox>
       
        </StyledToolbar>
        
        </AppBar>
  )
}

export default NavBar