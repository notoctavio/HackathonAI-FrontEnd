import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  position: 'relative',
  height: '80vh',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: '25%',
  height: '100vh',
  padding: theme.spacing(2),
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const SelectionPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

  // Mock data - înlocuiește cu date reale
  const jobs = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Corp' },
    { id: 2, title: 'Backend Developer', company: 'Soft Inc' },
    // ... alte joburi
  ];

  const candidates = [
    {
      id: 1,
      name: 'John Doe',
      photo: 'https://via.placeholder.com/300',
      skills: ['React', 'TypeScript', 'Node.js'],
      experience: '3 years',
      description: 'Passionate about creating beautiful user interfaces...',
    },
    // ... alți candidați
  ];

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    setCurrentCandidateIndex(0);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Logică pentru acceptare candidat
      console.log('Candidate accepted');
    } else {
      // Logică pentru respingere candidat
      console.log('Candidate rejected');
    }
    setCurrentCandidateIndex(prev => prev + 1);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar - Jobs */}
      <Sidebar>
        <Typography variant="h6" gutterBottom>
          Available Jobs
        </Typography>
        <List>
          {jobs.map((job) => (
            <ListItemButton
              key={job.id}
              selected={selectedJob === job.id.toString()}
              onClick={() => handleJobSelect(job.id.toString())}
            >
              <ListItemText
                primary={job.title}
                secondary={job.company}
              />
            </ListItemButton>
          ))}
        </List>
      </Sidebar>

      {/* Main Content - Tinder Card */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Selection
        </Typography>
        {selectedJob ? (
          <StyledCard>
            <CardMedia
              component="img"
              height="300"
              image={candidates[currentCandidateIndex]?.photo}
              alt={candidates[currentCandidateIndex]?.name}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {candidates[currentCandidateIndex]?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {candidates[currentCandidateIndex]?.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Experience: {candidates[currentCandidateIndex]?.experience}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {candidates[currentCandidateIndex]?.skills.map((skill, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      display: 'inline-block',
                      mr: 1,
                      mb: 1,
                      p: 0.5,
                      bgcolor: 'primary.light',
                      borderRadius: 1,
                    }}
                  >
                    {skill}
                  </Typography>
                ))}
              </Box>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 'auto', p: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleSwipe('left')}
                sx={{ width: 100 }}
              >
                No
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleSwipe('right')}
                sx={{ width: 100 }}
              >
                Yes
              </Button>
            </Box>
          </StyledCard>
        ) : (
          <Typography variant="h6" color="text.secondary">
            Select a job to start reviewing candidates
          </Typography>
        )}
      </Box>

      {/* Right Sidebar - Candidates */}
      <Sidebar>
        <Typography variant="h6" gutterBottom>
          All Candidates
        </Typography>
        <List>
          {candidates.map((candidate) => (
            <ListItem key={candidate.id}>
              <ListItemText
                primary={candidate.name}
                secondary={candidate.skills.join(', ')}
              />
            </ListItem>
          ))}
        </List>
      </Sidebar>
    </Box>
  );
};

export default SelectionPage; 