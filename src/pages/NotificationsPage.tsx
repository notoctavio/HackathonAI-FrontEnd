import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, useTheme, CircularProgress, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Description as CvIcon } from '@mui/icons-material';
import { cvMatcherService, Candidate } from '../services/cvMatcher.service';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const NotificationsPage: React.FC = () => {
  const theme = useTheme();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load all candidates from the CV matcher service
    const loadCandidates = async () => {
      setIsLoading(true);
      try {
        const allCandidates = cvMatcherService.getAllCandidates();
        setCandidates(allCandidates);
      } catch (error) {
        console.error("Error loading candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidates();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 72px)',
        }}
      >
        <CircularProgress 
          sx={{
            color: 'primary.main',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            CV Applicants
          </Typography>
        </Box>

        <Paper
          sx={{
            p: 3,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
          }}
        >
          {candidates.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No applicants found
            </Typography>
          ) : (
            <List>
              {candidates.map((candidate) => (
                <ListItem
                  key={candidate.id}
                  sx={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    py: 2,
                    '&:last-child': {
                      borderBottom: 'none',
                    },
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
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                        {candidate.name} {candidate.isNew && ' (New)'}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          CV: {candidate.fileName.replace('cv_', '').replace('.docx', '')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                          Received: {candidate.lastUpdated ? new Date(candidate.lastUpdated).toLocaleString() : 'Unknown date'}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
};

export default NotificationsPage; 