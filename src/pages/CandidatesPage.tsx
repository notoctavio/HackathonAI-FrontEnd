import React, { useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Avatar,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { usePermission } from '../context/AuthContext';

type SortBy = 'name' | 'date';
type SortOrder = 'asc' | 'desc';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface FilterState {
  status: string;
  experience: string;
  skills: string[];
}

const CandidatesPage: React.FC = () => {
  const theme = useTheme();
  const canManageCandidates = usePermission('manage_candidates');
  
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    experience: 'all',
    skills: [],
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    const newSortBy = target.dataset.sort as SortBy;
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilters(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleViewDetails = (candidate: typeof candidates[0]) => {
    setSelectedCandidate(candidate);
    setIsViewDialogOpen(true);
  };

  // Mock data for candidates
  const candidates = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+40 722 123 456',
      position: 'Senior Software Engineer',
      skills: ['React', 'TypeScript', 'Node.js'],
      experience: '5 years',
      appliedDate: '2024-03-10',
      status: 'new',
      avatar: 'JD',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+40 733 456 789',
      position: 'UX Designer',
      skills: ['Figma', 'UI/UX', 'Prototyping'],
      experience: '3 years',
      appliedDate: '2024-03-12',
      status: 'interviewed',
      avatar: 'JS',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+40 744 789 123',
      position: 'Full Stack Developer',
      skills: ['Python', 'Django', 'AWS'],
      experience: '4 years',
      appliedDate: '2024-03-08',
      status: 'offered',
      avatar: 'MJ',
    },
  ];

  // Filter and sort the data
  const filteredCandidates = candidates
    .filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTab = activeTab === 'all' || candidate.status === activeTab;
      return matchesSearch && matchesTab;
    });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
        : new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
    }
    return 0;
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
            Candidates
          </Typography>
          
          {((activeTab === 'all' && canManageCandidates) || (activeTab === 'new' && canManageCandidates) ||
            (activeTab === 'interviewed' && canManageCandidates) || (activeTab === 'offered' && canManageCandidates) ||
            (activeTab === 'hired' && canManageCandidates)) && (
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
              Add Candidate
            </Button>
          )}
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            sx={{
              '& .MuiTab-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <Tab label="All" value="all" />
            <Tab label="New" value="new" />
            <Tab label="Interviewed" value="interviewed" />
            <Tab label="Offered" value="offered" />
            <Tab label="Hired" value="hired" />
          </Tabs>
        </Box>

        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={handleSearchChange}
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
            onClick={handleFilterClick}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box
                    component="span"
                    data-sort="name"
                    onClick={handleSortClick}
                    sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    Name
                    {sortBy === 'name' && (
                      <Box component="span" sx={{ ml: 1 }}>
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>
                  <Box
                    component="span"
                    data-sort="date"
                    onClick={handleSortClick}
                    sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    Applied Date
                    {sortBy === 'date' && (
                      <Box component="span" sx={{ ml: 1 }}>
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell sx={{ 
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.text.primary 
                  }}>
                    {candidate.name}
                  </TableCell>
                  <TableCell sx={{ 
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.text.primary 
                  }}>
                    {candidate.position}
                  </TableCell>
                  <TableCell sx={{ 
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.text.primary 
                  }}>
                    {candidate.email}
                  </TableCell>
                  <TableCell sx={{ 
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.text.primary 
                  }}>
                    {candidate.phone}
                  </TableCell>
                  <TableCell sx={{ 
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.text.primary 
                  }}>
                    {new Date(candidate.appliedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      color={
                        candidate.status === 'new' ? 'primary' :
                        candidate.status === 'interviewed' ? 'warning' :
                        candidate.status === 'offered' ? 'info' :
                        'success'
                      }
                      sx={{ 
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        px: 1
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleViewDetails(candidate)}
                      sx={{
                        fontWeight: 500,
                        bgcolor: theme.palette.primary.main,
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark
                        }
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              name="status"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Interviewing">Interviewing</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Experience</InputLabel>
            <Select
              value={filters.experience}
              label="Experience"
              name="experience"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="1-3">1-3 years</MenuItem>
              <MenuItem value="3-5">3-5 years</MenuItem>
              <MenuItem value="5+">5+ years</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Menu>

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
          Add New Candidate
        </DialogTitle>
        <DialogContent>
          {/* Add form fields here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog
        open={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(17, 25, 40, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
          },
        }}
      >
        {selectedCandidate && (
          <>
            <DialogTitle sx={{ pb: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    width: 56,
                    height: 56,
                    fontSize: '1.5rem',
                    fontWeight: 600,
                  }}
                >
                  {selectedCandidate.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ 
                    color: '#fff',
                    fontWeight: 700,
                    textShadow: '0 0 10px rgba(0,0,0,0.3)'
                  }}>
                    {selectedCandidate.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ 
                    color: 'rgba(255,255,255,0.8)',
                    fontWeight: 500
                  }}>
                    {selectedCandidate.position}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 2,
                    fontSize: '1.2rem',
                    textShadow: '0 0 10px rgba(0,0,0,0.2)'
                  }}>
                    Contact Information
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 500,
                      mb: 1,
                      fontSize: '1rem'
                    }}>
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#fff',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      textShadow: '0 0 10px rgba(0,0,0,0.2)'
                    }}>
                      {selectedCandidate.email}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 500,
                      mb: 1,
                      fontSize: '1rem'
                    }}>
                      Phone
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#fff',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      textShadow: '0 0 10px rgba(0,0,0,0.2)'
                    }}>
                      {selectedCandidate.phone}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 2,
                    fontSize: '1.2rem',
                    textShadow: '0 0 10px rgba(0,0,0,0.2)'
                  }}>
                    Application Details
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 500,
                      mb: 1,
                      fontSize: '1rem'
                    }}>
                      Applied Date
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#fff',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      textShadow: '0 0 10px rgba(0,0,0,0.2)'
                    }}>
                      {new Date(selectedCandidate.appliedDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 500,
                      mb: 1,
                      fontSize: '1rem'
                    }}>
                      Experience
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#fff',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      textShadow: '0 0 10px rgba(0,0,0,0.2)'
                    }}>
                      {selectedCandidate.experience}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 500,
                      mb: 1,
                      fontSize: '1rem'
                    }}>
                      Status
                    </Typography>
                    <Chip
                      label={selectedCandidate.status.charAt(0).toUpperCase() + selectedCandidate.status.slice(1)}
                      color={
                        selectedCandidate.status === 'new' ? 'primary' :
                        selectedCandidate.status === 'interviewed' ? 'warning' :
                        selectedCandidate.status === 'offered' ? 'info' :
                        'success'
                      }
                      sx={{ 
                        mt: 0.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        px: 2,
                        py: 0.5
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 2 }}>
                    Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedCandidate.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: theme.palette.text.primary,
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          px: 1
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
                {canManageCandidates && (
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 2 }}>
                      Actions
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        sx={{ 
                          bgcolor: theme.palette.primary.main,
                          color: '#fff',
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: theme.palette.primary.dark
                          }
                        }}
                        onClick={() => {/* Handle status update */}}
                      >
                        Update Status
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ 
                          bgcolor: theme.palette.secondary.main,
                          color: '#fff',
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: theme.palette.secondary.dark
                          }
                        }}
                        onClick={() => {/* Handle schedule interview */}}
                      >
                        Schedule Interview
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ 
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: theme.palette.error.dark
                          }
                        }}
                        onClick={() => {/* Handle reject */}}
                      >
                        Reject
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => setIsViewDialogOpen(false)}
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CandidatesPage; 