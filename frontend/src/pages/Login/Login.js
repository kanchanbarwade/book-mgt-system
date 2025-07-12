import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link as MuiLink
} from '@mui/material';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../../redux/userSlice'

function Login() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    
    if (!user.email || !user.password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      const res = await login(user);
      dispatch(setUserDetails(res.user));
      toast.success('Login successful');
      navigate('/books');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, p: 3, pb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 350,
          backgroundColor: '#f1f8e9',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          size="small"
          type="email"
          autoComplete="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          size="small"
          autoComplete="current-password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <Typography sx={{ my: 2 }}>
          Don&apos;t have an account?{' '}
          <MuiLink component={Link} to="/register" underline="hover">
            Register here
          </MuiLink>
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#64b5f6' }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;
