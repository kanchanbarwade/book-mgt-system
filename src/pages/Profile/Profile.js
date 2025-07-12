import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Stack
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';
import { useSelector } from 'react-redux';

function Profile() {
  const { name, email, role } = useSelector((state) => state.user);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 ,  p: 3, pb: 4}}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 400,
          backgroundColor: '#f3f6f9',
          borderRadius: 3
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#64b5f6', width: 60, height: 60, mx: 'auto' }}>
            {name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          <Typography variant="h5" sx={{ mt: 1 }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome to your profile
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Box display="flex" alignItems="center">
            <PersonIcon color="primary" sx={{ mr: 1 }} />
            <Typography>Name: {name}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <EmailIcon color="primary" sx={{ mr: 1 }} />
            <Typography>Email: {email}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <SecurityIcon color="primary" sx={{ mr: 1 }} />
            <Typography>Role: {role}</Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Profile;
