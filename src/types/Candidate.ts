export interface Candidate {
  id: number;
  name: string;
  position: string;
  experience: string;
  skills: string[];
  education: string;
  status?: 'accepted' | 'rejected';
} 