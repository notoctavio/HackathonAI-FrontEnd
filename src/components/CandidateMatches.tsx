import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Avatar, 
  Chip, 
  LinearProgress, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Tooltip,
  Divider,
  CircularProgress
} from '@mui/material';
import { 
  Person as PersonIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon 
} from '@mui/icons-material';
import { cvMatcherService, Candidate, JobDescription } from '../services/cvMatcher.service';

interface CandidateMatchesProps {
  jobId?: string;
  limit?: number;
}

const CandidateMatches: React.FC<CandidateMatchesProps> = ({ 
  jobId, 
  limit = 5 
}) => {
  const theme = useTheme();
  const [matches, setMatches] = useState<Candidate[]>([]);
  const [jobDescription, setJobDescription] = useState<JobDescription | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [matchAnalysis, setMatchAnalysis] = useState<string>('');
  const [analysisLoading, setAnalysisLoading] = useState(false);

  // Get available jobs if no jobId is provided
  const [availableJobs, setAvailableJobs] = useState<JobDescription[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>(jobId);

  useEffect(() => {
    const loadJobs = () => {
      const jobs = cvMatcherService.getAllJobDescriptions();
      setAvailableJobs(jobs);
      
      // If no jobId provided, use the first job
      if (!selectedJobId && jobs.length > 0) {
        setSelectedJobId(jobs[0].id);
      }
    };
    
    loadJobs();
  }, [jobId]);

  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      
      if (selectedJobId) {
        // Get the job description
        const job = cvMatcherService.getAllJobDescriptions().find(
          j => j.id === selectedJobId
        );
        setJobDescription(job || null);
        
        // Get matches for the job
        const topMatches = cvMatcherService.getTopMatchesForJob(selectedJobId, limit);
        setMatches(topMatches);
      } else {
        setMatches([]);
        setJobDescription(null);
      }
      
      setLoading(false);
    };
    
    loadMatches();
  }, [selectedJobId, limit]);

  const handleJobChange = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  const handleViewAnalysis = async (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setAnalysisOpen(true);
    setAnalysisLoading(true);
    
    try {
      if (selectedJobId) {
        const analysis = await cvMatcherService.getDetailedMatch(selectedJobId, candidate.id);
        setMatchAnalysis(analysis);
      }
    } catch (error) {
      console.error('Error loading match analysis:', error);
      setMatchAnalysis('Failed to generate analysis. Please try again later.');
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleCloseAnalysis = () => {
    setAnalysisOpen(false);
    setSelectedCandidate(null);
    setMatchAnalysis('');
  };

  // Helper to determine color based on match score
  const getMatchColor = (score: number) => {
    if (score >= 90) return theme.palette.success.main;
    if (score >= 70) return theme.palette.info.main;
    return theme.palette.warning.main;
  };

  if (loading) {
    return (
      <Paper 
        sx={{ 
          p: 3, 
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>Loading Candidate Matches...</Typography>
        <LinearProgress />
      </Paper>
    );
  }

  return (
    <Paper 
      sx={{ 
        p: 3, 
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ 
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <StarIcon sx={{ color: theme.palette.warning.main }} />
        Top Candidate Matches
      </Typography>
      
      {/* Job selection chips if no jobId was provided */}
      {!jobId && availableJobs.length > 0 && (
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {availableJobs.map(job => (
            <Chip
              key={job.id}
              label={job.title}
              onClick={() => handleJobChange(job.id)}
              variant={selectedJobId === job.id ? "filled" : "outlined"}
              color={selectedJobId === job.id ? "primary" : "default"}
              sx={{ mb: 1 }}
            />
          ))}
        </Box>
      )}
      
      {jobDescription && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {jobDescription.title}
          </Typography>
        </Box>
      )}
      
      {matches.length === 0 ? (
        <Typography>No matching candidates found.</Typography>
      ) : (
        <List sx={{ width: '100%' }}>
          {matches.map((candidate) => (
            <React.Fragment key={candidate.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
                secondaryAction={
                  <Button 
                    size="small" 
                    variant="outlined" 
                    color="primary"
                    onClick={() => handleViewAnalysis(candidate)}
                  >
                    View Analysis
                  </Button>
                }
              >
                <Avatar 
                  sx={{ 
                    mr: 2, 
                    bgcolor: candidate.isNew 
                      ? theme.palette.success.main 
                      : theme.palette.primary.main 
                  }}
                >
                  {candidate.name.charAt(0)}
                </Avatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {candidate.name}
                      </Typography>
                      {candidate.isNew && (
                        <Chip 
                          label="New" 
                          size="small" 
                          color="success"
                          icon={<CheckCircleIcon fontSize="small" />} 
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{ mr: 1, minWidth: '100px' }}
                        >
                          Match Score:
                        </Typography>
                        <Box sx={{ position: 'relative', width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={candidate.matchScore || 0} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 5,
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: getMatchColor(candidate.matchScore || 0),
                              }
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ 
                            color: getMatchColor(candidate.matchScore || 0),
                            fontWeight: 700,
                          }}
                        >
                          {candidate.matchScore}%
                        </Typography>
                      </Box>
                      
                      {candidate.skills && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                          {candidate.skills.map((skill, index) => (
                            <Chip
                              key={index}
                              label={skill}
                              size="small"
                              sx={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                fontSize: '0.7rem',
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              <Divider component="li" sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            </React.Fragment>
          ))}
        </List>
      )}
      
      {/* AI Analysis Dialog */}
      <Dialog 
        open={analysisOpen} 
        onClose={handleCloseAnalysis}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon />
            Candidate Match Analysis
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedCandidate && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                {selectedCandidate.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Match Score: 
                <Chip 
                  label={`${selectedCandidate.matchScore}%`} 
                  size="small" 
                  sx={{ 
                    ml: 1,
                    backgroundColor: getMatchColor(selectedCandidate.matchScore || 0),
                    color: '#fff'
                  }} 
                />
              </Typography>
              
              <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              
              {analysisLoading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                  <CircularProgress size={40} sx={{ mb: 2 }} />
                  <Typography>Generating AI analysis...</Typography>
                </Box>
              ) : (
                <Typography sx={{ whiteSpace: 'pre-line' }}>
                  {matchAnalysis}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAnalysis}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CandidateMatches; 