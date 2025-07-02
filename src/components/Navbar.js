import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {logout, isLoggedIn} from '../services/authService'

function Navbar() {
    const navigate = useNavigate();
    const handleLogout =()=>{
        logout();
        navigate('/login');
    }
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#42adeb'}}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Book Management
        </Typography>
        {isLoggedIn() && (
          <>
            <Button color="inherit" component={Link} to="/books">Books</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
