import React, { useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Clear potentially corrupt auth data when landing page loads
  useEffect(() => {
    // Clear any potentially corrupt localStorage data
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (!user || !user.token) {
          console.log('Found invalid user data on landing page - clearing it');
          localStorage.removeItem('user');
        }
      }
    } catch (e) {
      console.error('Error processing localStorage data - clearing it:', e);
      localStorage.removeItem('user');
    }
  }, []);

  const handleSignIn = () => {
    // Force clear any existing auth data before redirecting
    localStorage.removeItem('user');
    console.log('Redirecting to login page');
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
            }}
            onClick={() => navigate('/')}
          >
            ProMatch
          </Typography>
          <Button
            color="inherit"
            onClick={handleSignIn}
            sx={{
              mr: 2,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.4)',
                background: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/register')}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              },
            }}
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ pt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default LandingLayout; 