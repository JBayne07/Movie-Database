import React from 'react';
import {Link} from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {
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
              <Button variant="contained" color="inherit">               
                  <Link to='/profile' className='SortPage' color="inherit">
                    Profile
                  </Link>
              </Button>
              <Button variant="contained" color="inherit">               
                  <Link to='/search' className='SortPage' color="inherit">
                    Search
                  </Link>
              </Button>
              <Button variant="contained" color="inherit">               
                  <Link to='/login' className='SortPage' color="inherit">
                    Login
                  </Link>
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
    )
}