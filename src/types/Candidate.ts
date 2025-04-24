export interface Candidate {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  appliedDate: string;
  status: string;
  description: string;
  experience: string;
  skills: string[];
  // Optional fields that might be used in details view
  education?: string;
} 