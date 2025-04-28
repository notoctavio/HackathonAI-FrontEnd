import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const TroubleshootInfo: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [showDetails, setShowDetails] = React.useState(false);

  const userStr = localStorage.getItem('user');
  let parsedUser = null;
  try {
    if (userStr) {
      parsedUser = JSON.parse(userStr);
    }
  } catch (e) {
    console.error('Error parsing localStorage user data', e);
  }

  return (
    <Paper sx={{ 
      p: 3, 
      my: 2, 
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 2,
    }}>
      <Typography variant="h6" color="error.main" sx={{ mb: 2 }}>Troubleshooting Information</Typography>
      
      <Typography><strong>Authentication Status:</strong> {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</Typography>
      
      <Button 
        variant="outlined" 
        size="small" 
        sx={{ my: 1 }} 
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </Button>
      
      {showDetails && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Current User from Context:</Typography>
          <Box component="pre" sx={{ 
            p: 2, 
            background: 'rgba(0, 0, 0, 0.5)', 
            borderRadius: 1,
            overflow: 'auto',
            maxHeight: '200px'
          }}>
            {JSON.stringify(currentUser, null, 2)}
          </Box>
          
          <Typography variant="h6" sx={{ mt: 2 }}>User from localStorage:</Typography>
          <Box component="pre" sx={{ 
            p: 2, 
            background: 'rgba(0, 0, 0, 0.5)', 
            borderRadius: 1,
            overflow: 'auto',
            maxHeight: '200px'
          }}>
            {JSON.stringify(parsedUser, null, 2)}
          </Box>
          
          <Button 
            variant="contained" 
            color="error" 
            size="small" 
            sx={{ mt: 2 }} 
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
          >
            Clear Auth & Redirect to Login
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default TroubleshootInfo; 