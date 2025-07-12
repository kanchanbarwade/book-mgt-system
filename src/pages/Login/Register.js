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
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/authService';

function Register() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    const { name, email, password } = user;

    // ✅ Validation
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      toast.error('Password should be at least 6 characters');
      return;
    }

    try {
      await register(user);
      toast.success('Registered successfully');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Register failed');
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
          Register
        </Typography>

        <TextField
          label="Name"
          fullWidth
          size="small"
          margin="normal"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          size="small"
          margin="normal"
          autoComplete="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          size="small"
          margin="normal"
          autoComplete="new-password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <Typography sx={{ my: 2 }}>
          Already have an account?{' '}
          <MuiLink component={Link} to="/login" underline="hover">
            Login here
          </MuiLink>
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#64b5f6' }}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
}

export default Register;
