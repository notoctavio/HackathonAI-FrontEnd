import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function LandingLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
      }}
    >
      <Outlet />
    </Box>
  );
} 