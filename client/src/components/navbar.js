import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector, useDispatch} from 'react-redux';
import {logoutAction} from '../actions/index'

export const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const userData = useSelector(state => state.userdata);
  const dispatch = useDispatch();
  
  useEffect(() =>{
    if(userData._id){
      setProfile(true);
    }else{
      setProfile(false);
    }
  }, [userData]);

  const logout = () => {
    console.log('Logged out');
    dispatch(logoutAction());
  }

  return(
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Movie Database
            </Typography>
            <Button variant="contained" color="inherit">               
                <Link to='/' className='HomePage' color="inherit">
                  Home
                </Link>
            </Button>
            {
            profile ? (
            <Button variant="contained" color="inherit" >
              <Link to='/profile' className='ProfilePage' color="inherit">
                Profile
              </Link>
            </Button>
            ) : (
            <Button variant="contained" color="inherit" >
              <Link to='/login' className='ProfilePage' color="inherit">
                Profile
              </Link>
            </Button>
            )}
            
            <Button variant="contained" color="inherit">
                <Link to='/search' className='SearchPage' color="inherit">
                  Search
                </Link>
            </Button>
            {profile ? (
              <Button variant="contained" color="inherit" onClick={logout}>               
                <Link to='/login' className='LoginPage' color="inherit">
                  Logout
                </Link>
              </Button>
            ) : (
              <Button variant="contained" color="inherit">
                <Link to='/login' className='LoginPage' color="inherit">
                  Login
                </Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
  )
}