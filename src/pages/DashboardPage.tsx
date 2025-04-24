import React from 'react';
import { Box, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
<<<<<<< Updated upstream
=======
import { useNotifications } from '../context/NotificationContext';
import { Work, Description, Assignment, School, Email } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { styled } from '@mui/material/styles';
>>>>>>> Stashed changes

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const DashboardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '-1px',
  marginBottom: '2rem',
  textAlign: 'center',
  '&:hover': {
    transform: 'scale(1.02)',
    transition: 'transform 0.2s ease',
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  minWidth: 48,
  minHeight: 48,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '& .MuiSvgIcon-root': {
    fontSize: 24,
    color: 'white',
    width: 24,
    height: 24,
  },
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
}));

const DashboardPage: React.FC = () => {
  const theme = useTheme();

  const stats = [
<<<<<<< Updated upstream
    { title: 'Total Candidates', value: '245', change: '+12%', trend: 'up' },
    { title: 'Active Jobs', value: '18', change: '+5%', trend: 'up' },
    { title: 'Interviews', value: '32', change: '-3%', trend: 'down' },
    { title: 'Hired', value: '15', change: '+8%', trend: 'up' },
=======
    { 
      title: 'CVs Received', 
      value: '45', 
      change: '+8%', 
      trend: 'up', 
      icon: <Description sx={{ width: 24, height: 24 }} />
    },
    { 
      title: 'Active Applications', 
      value: '23', 
      change: '+12%', 
      trend: 'up', 
      icon: <Assignment sx={{ width: 24, height: 24 }} />
    },
    { 
      title: 'Interviews Scheduled', 
      value: '15', 
      change: '+5%', 
      trend: 'up', 
      icon: <Email sx={{ width: 24, height: 24 }} />
    },
    { 
      title: 'New Candidates', 
      value: '32', 
      change: '+15%', 
      trend: 'up', 
      icon: <School sx={{ width: 24, height: 24 }} />
    },
  ];

  const recentActivity = [
    {
      name: 'Maria Popescu',
      action: 'submitted CV',
      position: 'Frontend Developer',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      name: 'Ion Ionescu',
      action: 'applied for',
      position: 'Backend Developer',
      time: '4 hours ago',
      status: 'review'
    },
    {
      name: 'Alexandra Dumitrescu',
      action: 'completed profile',
      position: 'Senior UX Designer',
      time: '1 day ago',
      status: 'completed'
    }
>>>>>>> Stashed changes
  ];

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
<<<<<<< Updated upstream
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Dashboard
        </Typography>
=======
        <DashboardTitle>
          Welcome, {user?.name || 'User'}
        </DashboardTitle>
>>>>>>> Stashed changes

        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardContent>
<<<<<<< Updated upstream
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'text.secondary',
                        mb: 1,
                        fontSize: '0.875rem',
                      }}
                    >
                      {stat.title}
                    </Typography>
=======
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <StatIcon
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                          boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
                          mr: 2,
                        }}
                      >
                        {stat.icon}
                      </StatIcon>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.875rem',
                        }}
                      >
                        {stat.title}
                      </Typography>
                    </Box>
>>>>>>> Stashed changes
                    <Typography
                      variant="h4"
                      sx={{
                        mb: 1,
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: stat.trend === 'up' ? 'success.main' : 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      {stat.change}
                      {stat.trend === 'up' ? '↑' : '↓'}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: 'text.primary',
              fontWeight: 600,
            }}
          >
            Recent Activity
          </Typography>
          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  textAlign: 'center',
                  py: 4,
                }}
              >
                No recent activity to display
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </Box>
  );
};

export default DashboardPage; 