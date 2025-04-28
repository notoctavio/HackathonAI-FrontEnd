import React, { useEffect, useState } from 'react';
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
import { Work, Person, School, Email, Business } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { cvMatcherService, Candidate } from '../services/cvMatcher.service';
import Chatbot from '../components/Chatbot';

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const { addNotification } = useNotifications();
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Load new candidates
    const newCandidates = cvMatcherService.getNewCandidates();
    setCandidates(newCandidates);
    
    // Add sample notifications for demo (commented out to avoid popup notifications)
    /*if (newCandidates.length > 0) {
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
    }*/
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

  // Get job match for candidates (but only show for special highlighted ones)
  const getJobMatch = (candidateId: string) => {
    const jobs = cvMatcherService.getAllJobDescriptions();
    for (const job of jobs) {
      const matches = cvMatcherService.getMatchesAboveThreshold(job.id, 85);
      const match = matches.find(c => c.id === candidateId);
      if (match && match.matchScore && match.matchScore >= 85) {
        return { job, matchScore: match.matchScore };
      }
    }
    return null;
  };

  // Only show match score for first candidate as a highlight
  const showMatchForCandidate = (candidateId: string) => {
    // Only show for the first candidate in the list
    return candidates.length > 0 && candidates[0].id === candidateId;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
          }}
        >
          Welcome, {currentUser?.firstName || 'User'}
        </Typography>
        
        {currentUser?.company && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Business sx={{ color: theme.palette.primary.main, fontSize: '1.2rem' }} />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              {currentUser.company}
            </Typography>
          </Box>
        )}
      </Box>

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

      {/* Main Content Area with full width recent activity + candidates */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              mb: 4,
              height: '100%',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity & Candidates</Typography>
            <List>
              {/* New candidates from the CV matcher service */}
              {candidates.map((candidate, index) => {
                const match = getJobMatch(candidate.id);
                const showMatch = showMatchForCandidate(candidate.id);
                
                return (
                  <ListItem
                    key={`candidate-${candidate.id}`}
                    sx={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      py: 2,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        }}
                      >
                        {candidate.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {candidate.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            submitted CV
                          </Typography>
                          {match && (
                            <>
                              <Typography variant="body2" color="text.secondary">
                                for
                              </Typography>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {match.job.title}
                              </Typography>
                            </>
                          )}
                          <Chip
                            label="New"
                            size="small"
                            color="success"
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            {candidate.lastUpdated ? new Date(candidate.lastUpdated).toLocaleString() : 'Today'}
                          </Typography>
                          {match && showMatch && (
                            <Chip
                              label={`Strong Match`}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                color: 'success.main',
                              }}
                            />
                          )}
                          <Chip
                            label="pending review"
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(158, 158, 158, 0.1)',
                              color: 'text.secondary',
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                );
              })}

              {/* Other activity items */}
              <ListItem
                sx={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  py: 2,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    }}
                  >
                    M
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Maria Popescu
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        submitted CV
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Frontend Developer
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        2 hours ago
                      </Typography>
                      <Chip
                        label="pending"
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(158, 158, 158, 0.1)',
                          color: 'text.secondary',
                        }}
                      />
                    </Box>
                  }
                />
              </ListItem>
              <ListItem
                sx={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  py: 2,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    }}
                  >
                    I
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Ion Ionescu
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        applied for
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Backend Developer
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        4 hours ago
                      </Typography>
                      <Chip
                        label="review"
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255, 152, 0, 0.1)',
                          color: 'warning.main',
                        }}
                      />
                    </Box>
                  }
                />
              </ListItem>
              <ListItem
                sx={{
                  py: 2,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    }}
                  >
                    A
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Alexandra Dumitrescu
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        completed profile
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Senior UX Designer
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        1 day ago
                      </Typography>
                      <Chip
                        label="completed"
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          color: 'success.main',
                        }}
                      />
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Chatbot Component */}
      <Chatbot />
    </Box>
  );
};

export default DashboardPage; 