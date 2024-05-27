import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import axios from 'axios'

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import DehazeIcon from '@mui/icons-material/Dehaze';

import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link,Button } from '@mui/material';
import { useContext } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import Swal from 'sweetalert2'; 
// Contexts

import StateContext from '../../context/StateContext';
import DispatchContxt from '../../context/DispatchContxt';

import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});


const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Admin_Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
     
  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContxt)

    const navigate=useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // //////////////////////////////////////////////////////////////////

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
            localStorage.removeItem('The username');
            localStorage.removeItem('The email');
            localStorage.removeItem('The userId');
            localStorage.removeItem('The userToken');
            localStorage.removeItem('The GoogleToken');
            GlobalDispatch({ type: 'logout' });
            navigate('/alogin');
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

  // //////////////////////////////////////////////////////////////////

  

 
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
  

<AppBar position="fixed" open={open}>
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: 2,
          ...(open && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx ={{ cursor:'pointer'}}onClick={() => { navigate("/dash") }}>
        Admin Dashboard
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

      {GlobalState.userUserName ?  <Button
        sx={{ cursor: 'pointer', backgroundColor: '#f2ca5c  ', color: '#faf5f9', fontSize: '15px', 
        fontWeight: 'bold' , marginRight: 3, }}>
             Hi {GlobalState.userUserName}
     </Button>
      :
      <Link to='/login'>
              <Button sx={{ cursor: 'pointer', backgroundColor: '#f2ca5c', color: '#faf5f9', fontSize: '15px', fontWeight: 'bold' , marginRight: 3,}}>
                  Login
              </Button>
          </Link> 
     
     
     }

   


    <Button
          sx={{ cursor: 'pointer', backgroundColor: '#34c762', color: '#faf5f9', fontSize: '15px', fontWeight: 'bold', marginRight: 2 }}
              onClick={HandleLogOut} // Assuming you have a function to handle logout
            >
              Logout
            </Button>





    </Box>
  </Toolbar>
</AppBar>



      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
           
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <DehazeIcon /> : <DehazeIcon/>}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
        {/* Start of users*/}
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/user") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
          
               < GroupIcon/>
              </ListItemIcon>

              <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

           {/* End of users*/}

            {/*  Start Profile Detail */}

            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/profile_user") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <PersonIcon />
              </ListItemIcon>

              <ListItemText primary="Profile Details" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>


            {/* end of profile Details */}

             {/* start of Job */}

           <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/job_user") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <WorkIcon />
              </ListItemIcon>

              <ListItemText primary="Jobs" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

              {/* end of Job */}

          

          {/* Other ListItems here... */}

          {/* Logout Button */}
          <ListItem disablePadding sx={{ display: 'block' }} >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ExitToAppIcon /> {/* Import ExitToAppIcon from '@mui/icons-material/ExitToApp'; */}
              </ListItemIcon>

              <ListItemText  onClick={HandleLogOut} primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>


         
       
    
      </Drawer>
     
    
    </Box>
  );
}