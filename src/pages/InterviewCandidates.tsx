import React, { useEffect, useState, FC } from 'react';
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
import { Candidate } from '../types/Candidate';

interface ActionButtonProps {
  color?: 'primary' | 'error';
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled(MuiButton)(({ color = 'primary' }) => ({
  padding: '8px 24px',
  borderRadius: '8px',
  backgroundColor: color === 'error' 
    ? 'rgba(239, 68, 68, 0.2)'
    : 'rgba(168, 85, 247, 0.2)',
  color: '#fff',
  '&:hover': {
    backgroundColor: color === 'error'
      ? 'rgba(239, 68, 68, 0.3)'
      : 'rgba(168, 85, 247, 0.3)',
  },
}));

const ActionButton: FC<ActionButtonProps> = (props) => (
  <StyledButton {...props} />
);

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

const StatusChip = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 12px',
  borderRadius: '6px',
  fontSize: '14px',
  backgroundColor: 'rgba(34, 197, 94, 0.2)',
  color: '#22C55E',
});

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
    backgroundColor: 'rgba(15, 23, 42, 0.98)',
    borderRadius: '16px',
    minWidth: '600px',
    maxWidth: '800px',
    margin: '16px',
  },
});

const DialogHeader = styled(Box)({
  display: 'flex',
  gap: '24px',
  marginBottom: '32px',
});

const LargeAvatar = styled(Avatar)({
  width: '80px',
  height: '80px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
});

const SkillChip = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  margin: '4px',
});

const InterviewCandidates: FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('interviewCandidates');
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const handleOpenDialog = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <Container>
      <Title>Interviuri</Title>
      
      <Table>
        <TableHeader>
          <HeaderCell>Nume ↑</HeaderCell>
          <HeaderCell>Poziție</HeaderCell>
          <HeaderCell>Educație</HeaderCell>
          <HeaderCell>Experiență</HeaderCell>
          <HeaderCell>Status</HeaderCell>
          <HeaderCell>Acțiuni</HeaderCell>
        </TableHeader>

        {candidates.map((candidate) => (
          <TableRow key={candidate.id}>
            <Cell>{candidate.name}</Cell>
            <Cell>{candidate.position}</Cell>
            <Cell>{candidate.education}</Cell>
            <Cell>{candidate.experience}</Cell>
            <Cell>
              <StatusChip>
                {candidate.status || 'În așteptare'}
              </StatusChip>
            </Cell>
            <Cell>
              <ViewButton onClick={() => handleOpenDialog(candidate)}>
                <VisibilityIcon sx={{ fontSize: 18 }} />
                Vedere
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
          <DialogContent sx={{ p: 4, color: '#fff' }}>
            <DialogHeader>
              <LargeAvatar>
                <PersonIcon sx={{ fontSize: 40 }} />
              </LargeAvatar>
              <Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {selectedCandidate.name}
                </Typography>
                <Typography sx={{ opacity: 0.7 }}>
                  {selectedCandidate.position}
                </Typography>
              </Box>
            </DialogHeader>

            <Typography sx={{ mb: 2, fontSize: '16px', fontWeight: 500 }}>
              Experience: {selectedCandidate.experience}
            </Typography>

            <Typography sx={{ mb: 2, fontSize: '16px', fontWeight: 500 }}>
              Education: {selectedCandidate.education}
            </Typography>

            <Typography sx={{ mb: 2, fontSize: '16px', fontWeight: 500 }}>
              Skills:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {selectedCandidate.skills.map((skill, index) => (
                <SkillChip key={index}>
                  {skill}
                </SkillChip>
              ))}
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: 2, 
              mt: 4 
            }}>
              <ActionButton color="error" onClick={() => {}}>
                Reject
              </ActionButton>
              <ActionButton onClick={() => {}}>
                Accept
              </ActionButton>
            </Box>
          </DialogContent>
        )}
      </DetailDialog>
    </Container>
  );
};

export default InterviewCandidates; 