import { Box, Typography } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#21244d',
        color: '#fff',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
        borderTop: '2px solid #2a2e5b',
        fontSize: '14px'
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
