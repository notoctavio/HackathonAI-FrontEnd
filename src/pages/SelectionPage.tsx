import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, List, ListItemText, ListItemButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';

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

const ActionButton = styled(Button)(({ theme }) => ({
  width: 120,
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(2),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

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

  // Mock data - replace with real data
  const [jobs, setJobs] = useState([
    { 
      id: 1, 
      title: 'Frontend Developer', 
      company: 'Tech Corp', 
      description: 'Looking for a frontend developer with experience in React and TypeScript to build modern and responsive interfaces. UI/UX knowledge is a plus.',
      requiredSkills: ['React', 'TypeScript', 'CSS', 'HTML']
    },
    { 
      id: 2, 
      title: 'Backend Developer', 
      company: 'Soft Inc', 
      description: 'Backend developer for cloud architecture and microservices. Experience required in Node.js and databases.',
      requiredSkills: ['Node.js', 'PostgreSQL', 'REST API', 'Docker']
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Digital Solutions',
      description: 'Full-stack developer for e-commerce platform development. Experience in MERN stack and online payment integration.',
      requiredSkills: ['React', 'Node.js', 'MongoDB', 'Express']
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      description: 'Designer for creating intuitive and attractive interfaces. Experience in design systems and prototyping.',
      requiredSkills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping']
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Cloud Tech',
      description: 'DevOps engineer for process automation and cloud infrastructure management.',
      requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
    }
  ]);

  const candidates = [
    {
      id: 1,
      name: 'John Doe',
      photo: '', // Empty for testing default avatar
      skills: ['React', 'TypeScript', 'Node.js', 'CSS', 'HTML'],
      experience: '3 years',
      description: 'Frontend developer passionate about creating modern and intuitive interfaces. Experience in developing responsive web applications and performance optimization.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      photo: '',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      experience: '4 years',
      description: 'Backend developer focused on scalable systems and cloud architecture. Experience in developing RESTful APIs and microservices.',
    },
    {
      id: 3,
      name: 'Alex Johnson',
      photo: '',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
      experience: '5 years',
      description: 'Full-stack developer with experience in MERN stack. Passionate about software architecture and performance.',
    },
    {
      id: 4,
      name: 'Maria Garcia',
      photo: '',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping', 'HTML', 'CSS'],
      experience: '3 years',
      description: 'UI/UX Designer with experience in design systems and user research. Rich portfolio in e-commerce projects.',
    },
    {
      id: 5,
      name: 'David Chen',
      photo: '',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
      experience: '4 years',
      description: 'DevOps engineer with experience in automation and CI/CD. AWS certified and containerization expert.',
    },
    {
      id: 6,
      name: 'Sarah Wilson',
      photo: '',
      skills: ['React', 'Vue.js', 'Angular', 'JavaScript', 'SASS'],
      experience: '4 years',
      description: 'Frontend specialist with experience in multiple frameworks. Passionate about animations and responsive design.',
    },
    {
      id: 7,
      name: 'Michael Brown',
      photo: '',
      skills: ['Node.js', 'Python', 'MongoDB', 'Redis', 'GraphQL'],
      experience: '5 years',
      description: 'Backend developer specialized in high-performance APIs and databases. Expert in optimization and scaling.',
    }
  ];

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    setCurrentCandidateIndex(0);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      const selectedJobData = jobs.find(job => job.id.toString() === selectedJob);
      const candidate = candidates[currentCandidateIndex];
      
      // Get existing interview candidates
      const existingCandidates = JSON.parse(localStorage.getItem('interviewCandidates') || '[]');
      
      // Add new candidate with job details
      const newInterviewCandidate = {
        ...candidate,
        jobApplied: selectedJobData?.title || '',
        company: selectedJobData?.company || '',
      };
      
      // Save to localStorage
      localStorage.setItem('interviewCandidates', JSON.stringify([...existingCandidates, newInterviewCandidate]));
      
      console.log('Candidate accepted and added to interviews');
    } else {
      console.log('Candidate rejected');
    }
    setCurrentCandidateIndex(prev => (prev + 1) % candidates.length);
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

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
            Available Jobs
          </Typography>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenJobDialog(true)}
            variant="contained"
            size="small"
            sx={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8))',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(236, 72, 153, 1))',
              },
              fontSize: '0.8rem',
              py: 0.5,
              px: 1,
            }}
          >
            Add
          </Button>
        </Box>
        <List sx={{ px: 0.5 }}>
          {jobs.map((job) => (
            <StyledListItemButton
              key={job.id}
              selected={selectedJob === job.id.toString()}
              onClick={() => handleJobSelect(job.id.toString())}
            >
              <ListItemText
                primary={job.title}
                secondary={job.company}
                primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
                secondaryTypographyProps={{ sx: { opacity: 0.7, fontSize: '0.8rem' } }}
              />
            </StyledListItemButton>
          ))}
        </List>
      </Sidebar>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3, fontSize: '1.8rem' }}>
          Selection
        </Typography>
        <StyledCard>
          {candidates[currentCandidateIndex]?.photo ? (
            <CardMedia
              component="img"
              height="200"
              image={candidates[currentCandidateIndex].photo}
              alt={candidates[currentCandidateIndex].name}
              sx={{ 
                objectFit: 'cover',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            />
          ) : (
            <StyledAvatar>
              <PersonIcon />
            </StyledAvatar>
          )}
          <CardContent sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column',
            gap: 1.5,
            p: 2.5
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '1.3rem' }}>
              {candidates[currentCandidateIndex]?.name}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.8,
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5,
                fontSize: '0.9rem'
              }}
            >
              {candidates[currentCandidateIndex]?.description}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.85rem' }}>
              Experience: {candidates[currentCandidateIndex]?.experience}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 0.8,
              mt: 'auto' 
            }}>
              {candidates[currentCandidateIndex]?.skills.map((skill, index) => (
                <SkillChip key={index} variant="body2" sx={{ fontSize: '0.8rem' }}>
                  {skill}
                </SkillChip>
              ))}
            </Box>
          </CardContent>
          {selectedJob && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2, 
              p: 2,
              background: 'rgba(0, 0, 0, 0.2)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <ActionButton
                variant="contained"
                color="error"
                onClick={() => handleSwipe('left')}
                sx={{ fontSize: '0.9rem' }}
              >
                No
              </ActionButton>
              <ActionButton
                variant="contained"
                color="success"
                onClick={() => handleSwipe('right')}
                sx={{ fontSize: '0.9rem' }}
              >
                Yes
              </ActionButton>
            </Box>
          )}
        </StyledCard>
      </Box>

      <Sidebar>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 2 }}>
          All Candidates
        </Typography>
        <List sx={{ px: 0.5 }}>
          {candidates.map((candidate) => (
            <Paper
              key={candidate.id}
              elevation={0}
              sx={{
                mb: 1,
                p: 1.2,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateX(5px)',
                  background: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {candidate.photo ? (
                  <Avatar
                    src={candidate.photo}
                    alt={candidate.name}
                    sx={{ width: 36, height: 36 }}
                  />
                ) : (
                  <Avatar sx={{ width: 36, height: 36, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <PersonIcon sx={{ fontSize: '1.2rem' }} />
                  </Avatar>
                )}
                <ListItemText
                  primary={candidate.name}
                  secondary={candidate.skills.join(' • ')}
                  primaryTypographyProps={{ fontWeight: 500, fontSize: '0.85rem' }}
                  secondaryTypographyProps={{ sx: { opacity: 0.7, fontSize: '0.75rem' } }}
                />
              </Box>
            </Paper>
          ))}
        </List>
      </Sidebar>

      <StyledDialog 
        open={openJobDialog} 
        onClose={() => setOpenJobDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.2rem' }}>Add New Job</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Job Title"
            fullWidth
            value={newJob.title}
            onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Company"
            fullWidth
            value={newJob.company}
            onChange={(e) => setNewJob(prev => ({ ...prev, company: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newJob.description}
            onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setOpenJobDialog(false)}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddJob} 
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8))',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(236, 72, 153, 1))',
              },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </StyledDialog>
    </Box>
  );
};

export default SelectionPage; 