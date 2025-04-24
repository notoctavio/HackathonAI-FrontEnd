import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { usePermission } from '../context/AuthContext';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Mock data for jobs
const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    posted: '2 days ago',
    skills: ['React', 'TypeScript', 'CSS'],
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'InnovateTech',
    location: 'New York',
    type: 'Full-time',
    posted: '1 week ago',
    skills: ['Node.js', 'MongoDB', 'AWS'],
  },
  {
    id: 3,
    title: 'Product Designer',
    company: 'DesignHub',
    location: 'San Francisco',
    type: 'Contract',
    posted: '3 days ago',
    skills: ['Figma', 'UI/UX', 'Prototyping'],
  },
];

const JobsPage: React.FC = () => {
  const theme = useTheme();
  const canManageJobs = usePermission('manage_jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredJobs = jobs.filter(job => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

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
            Open Positions
          </Typography>
          
          {canManageJobs && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsAddDialogOpen(true)}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                },
              }}
            >
              Add Job
            </Button>
          )}
        </Box>

        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              },
            }}
          />
          <IconButton
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>

        <AnimatePresence>
          <Grid container spacing={3}>
            {filteredJobs.map((job) => (
              <Grid item xs={12} md={6} lg={4} key={job.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
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
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {job.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {job.company} • {job.location}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Chip
                          label={job.type}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'text.primary',
                            mr: 1,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Posted {job.posted}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {job.skills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              color: 'text.primary',
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>
      </motion.div>

      {/* Add Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>
          Add New Job
        </DialogTitle>
        <DialogContent>
          {/* Add form fields here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobsPage; 