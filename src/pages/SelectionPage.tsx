import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, List, ListItemText, ListItemButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Paper, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { cvMatcherService, Candidate, JobDescription } from '../services/cvMatcher.service';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  margin: 'auto',
  position: 'relative',
  minHeight: '70vh',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  overflowY: 'auto',
  paddingBottom: '80px',
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: '22%',
  height: '100vh',
  padding: theme.spacing(2),
  overflowY: 'auto',
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  borderRight: '1px solid rgba(255, 255, 255, 0.1)',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.05)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
    },
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: '4px 0',
  borderRadius: theme.spacing(1),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(5px)',
  },
  '&.Mui-selected': {
    background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
    '&:hover': {
      background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
    },
  },
}));

const SkillChip = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  margin: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.spacing(2),
  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: '50%',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const SwipeCard = styled(motion.div)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    background: 'rgba(30, 41, 59, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: '100%',
  height: 200,
  backgroundColor: 'transparent',
  '& .MuiSvgIcon-root': {
    width: '40%',
    height: '40%',
    opacity: 0.7,
  },
}));

const SelectionPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [openJobDialog, setOpenJobDialog] = useState(false);
  const [newJob, setNewJob] = useState({ 
    title: '', 
    company: '', 
    description: '',
    requiredSkills: [] as string[]
  });

  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // Data states
  const [jobs, setJobs] = useState<JobDescription[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from the service
  useEffect(() => {
    try {
      // Load jobs and candidates from the service
      const allJobs = cvMatcherService.getAllJobDescriptions();
      const allCandidates = cvMatcherService.getAllCandidates();
      
      setJobs(allJobs);
      setCandidates(allCandidates);
      
      console.log('Loaded jobs:', allJobs);
      console.log('Loaded candidates:', allCandidates);
      
      // Select the first job by default if available
      if (allJobs.length > 0) {
        setSelectedJob(allJobs[0].id);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    setCurrentCandidateIndex(0);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && selectedJob) {
      // Process match/like
      console.log('Matched candidate:', candidates[currentCandidateIndex]);
    }
    
    // Move to next candidate regardless of direction
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    } else {
      // Reset or show end of candidates message
      setCurrentCandidateIndex(0);
    }
  };

  const handleAddJob = () => {
    setJobs(prev => [...prev, { 
      id: prev.length + 1, 
      title: newJob.title, 
      company: newJob.company,
      description: newJob.description,
      requiredSkills: newJob.requiredSkills
    }]);
    setNewJob({ title: '', company: '', description: '', requiredSkills: [] });
    setOpenJobDialog(false);
  };

  const handleDragStart = (event: any, info: any) => {
    setDragStart({ x: info.point.x, y: info.point.y });
    setIsDragging(true);
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    const dragDistance = info.point.x - dragStart.x;
    
    if (Math.abs(dragDistance) > 100) {
      handleSwipe(dragDistance > 0 ? 'right' : 'left');
    }
  };

  // Render current candidate
  const currentCandidate = candidates[currentCandidateIndex];
  
  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      minHeight: '100%',
      position: 'relative',
    }}>
      {/* Sidebar with jobs */}
      <Sidebar>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Available Jobs
          </Typography>
          <List sx={{ px: 0 }}>
            {jobs.map((job) => (
              <StyledListItemButton
                key={job.id}
                selected={selectedJob === job.id}
                onClick={() => handleJobSelect(job.id)}
              >
                <ListItemText 
                  primary={job.title}
                  secondary={`ID: ${job.id}`}
                  primaryTypographyProps={{ fontWeight: 500 }}
                  secondaryTypographyProps={{ fontSize: '0.8rem', opacity: 0.7 }}
                />
              </StyledListItemButton>
            ))}
          </List>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenJobDialog(true)}
            sx={{
              mt: 2,
              width: '100%',
              background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              color: '#F8FAFC',
              textTransform: 'none',
              py: 1,
              '&:hover': {
                background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
              },
            }}
          >
            Add New Job
          </Button>
        </Box>

        <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: 600 }}>
          All Candidates
        </Typography>
        <List sx={{ px: 0 }}>
          {candidates.map((candidate) => (
            <StyledListItemButton 
              key={candidate.id}
              onClick={() => {
                const index = candidates.findIndex(c => c.id === candidate.id);
                if (index !== -1) {
                  setCurrentCandidateIndex(index);
                }
              }}
              selected={currentCandidate && currentCandidate.id === candidate.id}
            >
              <ListItemText 
                primary={candidate.name}
                secondary={`ID: ${candidate.id}`}
                primaryTypographyProps={{ fontWeight: 500 }}
                secondaryTypographyProps={{ fontSize: '0.8rem', opacity: 0.7 }}
              />
            </StyledListItemButton>
          ))}
        </List>
      </Sidebar>

      {/* Main content */}
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
      }}>
        {!selectedJob ? (
          <Typography variant="h5" sx={{ opacity: 0.6 }}>
            Please select a job from the sidebar
          </Typography>
        ) : loading ? (
          <Typography variant="h5" sx={{ opacity: 0.6 }}>
            Loading candidates...
          </Typography>
        ) : !currentCandidate ? (
          <Typography variant="h5" sx={{ opacity: 0.6 }}>
            No candidates available
          </Typography>
        ) : (
          <StyledCard>
            <CardMedia
              component="div"
              sx={{
                height: 240,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
              }}
            >
              <StyledAvatar>
                <PersonIcon />
              </StyledAvatar>
            </CardMedia>
            <CardContent sx={{ flexGrow: 1, p: 4 }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                {currentCandidate.name}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {currentCandidate.experience || 'No experience provided'}
              </Typography>
              
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Skills
              </Typography>
              <Box sx={{ mb: 4 }}>
                {currentCandidate.skills && currentCandidate.skills.length > 0 ? (
                  currentCandidate.skills.map((skill, index) => (
                    <SkillChip key={index} variant="body2">
                      {skill}
                    </SkillChip>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No skills listed
                  </Typography>
                )}
              </Box>
              
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                About
              </Typography>
              <Typography variant="body1" paragraph>
                {currentCandidate.education || 'No detailed information available.'}
              </Typography>
              
              {/* Match score if available */}
              {currentCandidate.matchScore && (
                <Box sx={{ 
                  mt: 3, 
                  p: 2, 
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center' }}>
                    Match Score: {Math.round(currentCandidate.matchScore)}%
                  </Typography>
                </Box>
              )}
            </CardContent>
            
            <Box sx={{ 
              position: 'absolute', 
              bottom: 20, 
              left: 0, 
              right: 0, 
              display: 'flex', 
              justifyContent: 'center',
              gap: 4
            }}>
              <ActionButton 
                onClick={() => handleSwipe('left')}
                sx={{ 
                  background: 'rgba(255, 99, 132, 0.1)',
                  '&:hover': { background: 'rgba(255, 99, 132, 0.2)' }
                }}
              >
                <CloseIcon sx={{ fontSize: 36, color: '#FF6384' }} />
              </ActionButton>
              <ActionButton 
                onClick={() => handleSwipe('right')}
                sx={{ 
                  background: 'rgba(75, 192, 192, 0.1)',
                  '&:hover': { background: 'rgba(75, 192, 192, 0.2)' }
                }}
              >
                <FavoriteIcon sx={{ fontSize: 36, color: '#4BC0C0' }} />
              </ActionButton>
            </Box>
          </StyledCard>
        )}
      </Box>

      {/* Add Job Dialog */}
      <StyledDialog
        open={openJobDialog}
        onClose={() => setOpenJobDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            Add New Job Position
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Job Title"
              fullWidth
              margin="normal"
              value={newJob.title}
              onChange={(e) => setNewJob({...newJob, title: e.target.value})}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              label="Company"
              fullWidth
              margin="normal"
              value={newJob.company}
              onChange={(e) => setNewJob({...newJob, company: e.target.value})}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={newJob.description}
              onChange={(e) => setNewJob({...newJob, description: e.target.value})}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              label="Required Skills (comma separated)"
              fullWidth
              margin="normal"
              placeholder="React, TypeScript, Node.js"
              onChange={(e) => {
                const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
                setNewJob({...newJob, requiredSkills: skills});
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpenJobDialog(false)}
            sx={{ 
              color: '#F8FAFC',
              textTransform: 'none', 
              mr: 2
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // Handle job creation
              // For demo, just add to local state
              const newJobWithId = { 
                ...newJob, 
                id: (Math.max(...jobs.map(job => parseInt(job.id))) + 1).toString(),
                fileName: `job_description_new_${newJob.title}.docx`,
                lastUpdated: new Date()
              };
              setJobs([...jobs, newJobWithId as any]);
              setOpenJobDialog(false);
              setNewJob({ title: '', company: '', description: '', requiredSkills: [] });
            }}
            sx={{
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              textTransform: 'none',
              px: 4,
              py: 1,
            }}
          >
            Add Job
          </Button>
        </DialogActions>
      </StyledDialog>
    </Box>
  );
};

export default SelectionPage; 