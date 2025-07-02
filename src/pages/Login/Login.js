import React, { useState } from 'react'
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login(email, password)) {
      navigate('/books');
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 10 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" fullWidth onClick={handleLogin} sx={{ bgcolor: '#42adeb'}}>Login</Button>
    </Box>
  )
}

export default Login
