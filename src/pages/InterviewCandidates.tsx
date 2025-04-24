import { useState, FC } from 'react';
import {
  Box,
  Typography,
  styled,
  Dialog,
  DialogContent,
  Avatar,
  Button as MuiButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';

const Container = styled(Box)({
  padding: '20px 32px',
  backgroundColor: '#0A1324',
  minHeight: '100vh',
});

const Title = styled(Typography)({
  fontSize: '32px',
  fontWeight: 600,
  color: '#fff',
  marginBottom: '40px',
});

const Table = styled(Box)({
  background: 'rgba(15, 23, 42, 0.6)',
  borderRadius: '16px',
  overflow: 'hidden',
});

const TableHeader = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '2fr 1.5fr 2fr 1.5fr 1.5fr 1fr 1fr',
  padding: '16px 24px',
  gap: '16px',
});

const HeaderCell = styled(Typography)({
  color: '#94A3B8',
  fontSize: '14px',
  fontWeight: 500,
});

const TableRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '2fr 1.5fr 2fr 1.5fr 1.5fr 1fr 1fr',
  padding: '16px 24px',
  gap: '16px',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  '&:hover': {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
  },
});

const Cell = styled(Typography)({
  color: '#fff',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
});

const StatusChip = styled(Box)<{ status: string }>(({ status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 12px',
  borderRadius: '6px',
  fontSize: '14px',
  backgroundColor: status === 'Considering'
      ? 'rgba(234, 179, 8, 0.2)'
      : 'rgba(234, 179, 8, 0.2)',
  color: status === 'Considering'
      ? '#EAB308'
      : '#EAB308',
}));

const ViewButton = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  backgroundColor: 'rgba(88, 80, 236, 0.15)',
  color: '#fff',
  fontSize: '14px',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: 'rgba(88, 80, 236, 0.25)',
  },
});

const DetailDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    backgroundColor: '#0F172A',
    borderRadius: '16px',
    maxWidth: '800px',
    width: '100%',
    margin: '16px',
    padding: '24px'
  }
});

const DialogHeader = styled(Box)({
  display: 'flex',
  gap: '24px',
  marginBottom: '32px',
});

const CandidateInfo = styled(Box)({
  flex: 1
});

const CandidateName = styled(Typography)({
  fontSize: '28px',
  fontWeight: 600,
  color: '#fff',
  marginBottom: '8px'
});

const CandidatePosition = styled(Typography)({
  fontSize: '16px',
  color: '#94A3B8',
  marginBottom: '24px'
});

const CandidateDescription = styled(Typography)({
  fontSize: '16px',
  color: '#fff',
  marginBottom: '24px',
  lineHeight: 1.6
});

const ExperienceSection = styled(Box)({
  marginBottom: '24px'
});

const SectionTitle = styled(Typography)({
  fontSize: '18px',
  fontWeight: 600,
  color: '#fff',
  marginBottom: '16px'
});

const SkillsContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginBottom: '32px'
});

const SkillChip = styled(Box)({
  padding: '6px 12px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  fontSize: '14px'
});

const ButtonsContainer = styled(Box)({
  display: 'flex',
  gap: '16px',
  justifyContent: 'flex-end'
});

const getButtonStyles = (variant: 'reject' | 'consider' | 'hire') => ({
  padding: '8px 24px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 500,
  backgroundColor: variant === 'reject'
      ? 'rgba(239, 68, 68, 0.2)'
      : 'rgba(168, 85, 247, 0.2)',
  color: '#fff',
  '&:hover': {
    backgroundColor: variant === 'reject'
        ? 'rgba(239, 68, 68, 0.3)'
        : 'rgba(168, 85, 247, 0.3)',
  }
});

const mockData = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Frontend Developer at Tech Corp',
    email: 'john.doe@example.com',
    phone: '+40 513355544',
    appliedDate: '23/04/2025',
    status: 'Considering',
    description: 'Frontend developer passionate about creating modern and intuitive interfaces. Experience in developing responsive web applications and performance optimization.',
    experience: '3 years',
    skills: ['React', 'TypeScript', 'Node.js', 'CSS', 'HTML']
  },
  {
    id: 2,
    name: 'Alex Johnson',
    position: 'Backend Developer',
    email: 'alex.johnson@example.com',
    phone: '+40 989670952',
    appliedDate: '23/04/2025',
    status: 'Pending',
    description: 'Backend developer with strong problem-solving skills and experience in building scalable applications.',
    experience: '4 years',
    skills: ['Python', 'Java', 'SQL', 'Docker', 'AWS']
  }
];

const InterviewCandidates: FC = () => {
  const [candidates, setCandidates] = useState(mockData);
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof mockData)[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (candidate: (typeof mockData)[0]) => {
    setSelectedCandidate(candidate);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCandidate(null);
  };

  const handleStatusUpdate = (newStatus: 'Rejected' | 'Considering' | 'Hired') => {
    if (selectedCandidate) {
      const updatedCandidates = candidates.map(candidate =>
          candidate.id === selectedCandidate.id
              ? { ...candidate, status: newStatus }
              : candidate
      );
      setCandidates(updatedCandidates);
      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
    }
  };

  return (
      <Container>
        <Title>Interviews</Title>

        <Table>
          <TableHeader>
            <HeaderCell>Name ↑</HeaderCell>
            <HeaderCell>Position</HeaderCell>
            <HeaderCell>Email</HeaderCell>
            <HeaderCell>Phone</HeaderCell>
            <HeaderCell>Applied Date</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell>Actions</HeaderCell>
          </TableHeader>

          {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <Cell>{candidate.name}</Cell>
                <Cell>{candidate.position}</Cell>
                <Cell>{candidate.email}</Cell>
                <Cell>{candidate.phone}</Cell>
                <Cell>{candidate.appliedDate}</Cell>
                <Cell>
                  <StatusChip status={candidate.status}>
                    {candidate.status}
                  </StatusChip>
                </Cell>
                <Cell>
                  <ViewButton onClick={() => handleOpenDialog(candidate)}>
                    <VisibilityIcon sx={{ fontSize: 18 }} />
                    View
                  </ViewButton>
                </Cell>
              </TableRow>
          ))}
        </Table>

        <DetailDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
        >
          {selectedCandidate && (
              <DialogContent>
                <DialogHeader>
                  <Avatar sx={{ width: 80, height: 80, bgcolor: 'rgba(88, 80, 236, 0.15)' }}>
                    <PersonIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <CandidateInfo>
                    <CandidateName>{selectedCandidate.name}</CandidateName>
                    <CandidatePosition>{selectedCandidate.position}</CandidatePosition>
                    <CandidateDescription>
                      {selectedCandidate.description}
                    </CandidateDescription>
                    <ExperienceSection>
                      <SectionTitle>Experience: {selectedCandidate.experience}</SectionTitle>
                    </ExperienceSection>
                    <SectionTitle>Skills:</SectionTitle>
                    <SkillsContainer>
                      {selectedCandidate.skills.map((skill, index) => (
                          <SkillChip key={index}>{skill}</SkillChip>
                      ))}
                    </SkillsContainer>
                  </CandidateInfo>
                </DialogHeader>

                <ButtonsContainer>
                  <MuiButton
                      sx={getButtonStyles('reject')}
                      onClick={() => handleStatusUpdate('Rejected')}
                  >
                    Reject
                  </MuiButton>
                  <MuiButton
                      sx={getButtonStyles('consider')}
                      onClick={() => handleStatusUpdate('Considering')}
                  >
                    Consider
                  </MuiButton>
                  <MuiButton
                      sx={getButtonStyles('hire')}
                      onClick={() => handleStatusUpdate('Hired')}
                  >
                    Hire
                  </MuiButton>
                </ButtonsContainer>
              </DialogContent>
          )}
        </DetailDialog>
      </Container>
  );
};

export default InterviewCandidates; 