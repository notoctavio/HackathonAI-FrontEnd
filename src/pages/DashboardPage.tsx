import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  useTheme, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Chip 
} from '@mui/material';
import { Work, Person, School, Email } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import Chatbot from '../components/Chatbot';

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const { addNotification } = useNotifications();

  // Add sample notifications
  useEffect(() => {
    // Add sample notifications for CV submissions
    addNotification(
      'New CV Submission',
      'Maria Popescu has submitted her CV for Frontend Developer position',
      'cv'
    );

    addNotification(
      'CV Review Needed',
      'Ion Ionescu\'s CV requires your review for Backend Developer role',
      'cv'
    );

    addNotification(
      'New Job Application',
      'Alexandra Dumitrescu applied for Senior UX Designer position',
      'application'
    );
  }, [addNotification]);

  const stats = [
    { 
      title: 'CVs Received', 
      value: '45', 
      change: '+8%', 
      trend: 'up', 
      icon: <Person sx={{ fontSize: '2rem', color: '#fff' }} /> 
    },
    { 
      title: 'Active Applications', 
      value: '23', 
      change: '+12%', 
      trend: 'up', 
      icon: <Work sx={{ fontSize: '2rem', color: '#fff' }} /> 
    },
    { 
      title: 'Interviews Scheduled', 
      value: '15', 
      change: '+5%', 
      trend: 'up', 
      icon: <Email sx={{ fontSize: '2rem', color: '#fff' }} /> 
    },
    { 
      title: 'New Candidates', 
      value: '32', 
      change: '+15%', 
      trend: 'up', 
      icon: <School sx={{ fontSize: '2rem', color: '#fff' }} /> 
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
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800,
        }}
      >
        Welcome, {currentUser?.firstName || 'User'}
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {stat.icon}
                  </Box>
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
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
        <List>
          {recentActivity.map((activity, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: index !== recentActivity.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                py: 2,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  }}
                >
                  {activity.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {activity.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.action}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {activity.position}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                    <Chip
                      label={activity.status}
                      size="small"
                      sx={{
                        background: activity.status === 'completed' 
                          ? 'rgba(76, 175, 80, 0.1)' 
                          : activity.status === 'review'
                          ? 'rgba(255, 152, 0, 0.1)'
                          : 'rgba(158, 158, 158, 0.1)',
                        color: activity.status === 'completed'
                          ? 'success.main'
                          : activity.status === 'review'
                          ? 'warning.main'
                          : 'text.secondary',
                      }}
                    />
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      
      {/* Chatbot Component */}
      <Chatbot />
    </Box>
  );
};

export default DashboardPage; 