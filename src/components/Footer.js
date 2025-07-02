import { Box, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <>
    <Box sx={{ bgcolor: '#42adeb', color: '#fff', p: 3, mt: 4, textAlign: 'center' }}>
        <Typography variant='body2' >&copy; 2025 Book Management System. All rights reserved.</Typography>
    </Box>
    </>
  )
}

export default Footer
