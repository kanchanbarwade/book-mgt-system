import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isLoggedIn } from '../services/authService';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#21244d' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
          📚 Library Management System
        </Typography>

        {isLoggedIn() && (
          <Box>
            <Button component={Link} to="/dashboard" sx={navBtnStyle}>Dashboard</Button>
            <Button component={Link} to="/books" sx={navBtnStyle}>Books</Button>
            <Button component={Link} to="/issue" sx={navBtnStyle}>Issue Book</Button>
            <Button component={Link} to="/issued" sx={navBtnStyle}>Issued List</Button>
            <Button component={Link} to="/profile" sx={navBtnStyle}>Profile</Button>
            <Button onClick={handleLogout} sx={{ ...navBtnStyle, color: '#f44336' }}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

const navBtnStyle = {
  color: '#fff',
  textTransform: 'none',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#2a2e5b',
  },
  mx: 0.5
};

export default Navbar;
