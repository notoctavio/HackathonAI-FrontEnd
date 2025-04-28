import { geminiService } from './gemini.service';
import * as fs from 'fs';
import * as path from 'path';

export interface Candidate {
  id: string;
  name: string;
  fileName: string;
  matchScore?: number;
  skills?: string[];
  experience?: string;
  education?: string;
  isNew?: boolean;
  lastUpdated?: Date;
}

export interface JobDescription {
  id: string;
  title: string;
  fileName: string;
  requirements?: string[];
  description?: string;
  lastUpdated?: Date;
}

export class CvMatcherService {
  private candidates: Candidate[] = [];
  private jobDescriptions: JobDescription[] = [];
  private matchResults: Record<string, Candidate[]> = {};
  private lastFetch: Date | null = null;

  constructor() {
    this.loadDataFromFiles();
  }

  private async loadDataFromFiles() {
    // Load candidates from DataSet/cv folder using filenames
    this.loadCandidatesFromFilenames();
    this.loadJobDescriptionsFromFilenames();
    
    // Find matches for each job
    await this.matchCandidatesToJobs();
  }

  private loadCandidatesFromFilenames() {
    // In a real app, this would read the actual files from the DataSet folder
    // For this implementation, we'll extract data from the filenames
    
    // Get all CV filenames from DataSet/cv directory (these would be loaded from actual file system)
    const cvFilenames = [
      'cv_500_Andrei_Călin_Dumitrescu.docx',
      'cv_499_Mihai_Andrei_Bălan.docx',
      'cv_498_Dorin_Mihailescu.docx',
      'cv_497_Andrei_Munteanu.docx',
      'cv_496_Cristina_Anca_Dobre.docx',
      'cv_495_Andrei_Mihailescu.docx',
      'cv_494_Andrei_Călin_Vasile.docx',
      'cv_493_Adrian_Mihai_Drăgulescu.docx',
      'cv_492_Adrian_Costin_Dobre.docx',
      'cv_491_Adrian_Matei_Lungu.docx',
      'cv_490_Adrian_Dumitru_Andrei.docx',
      'cv_489_Andrei_Mihail_Radu.docx',
      'cv_488_Andrei_Călin_Teodorescu.docx',
      'cv_487_Andrei_Mihail_Constantinescu.docx',
      'cv_486_Andrei_Mihailescu.docx',
      'cv_485_Mihai_Dobreanu.docx',
      'cv_484_Andrei_Mihai_Drăghici.docx',
      'cv_483_Andrei_Vasile_Dumitrescu.docx',
      'cv_482_Elena_Mihăilă_Dumitrescu.docx',
      'cv_481_Andrei_Mihailescu.docx',
      'cv_480_Andrei_Călin_Drăghici.docx',
    ];
    
    // Process each filename to extract information
    const candidateData: Candidate[] = cvFilenames.map(fileName => {
      // Extract ID and name from filename pattern: cv_ID_Name.docx
      const parts = fileName.replace('.docx', '').split('_');
      const id = parts[1]; // Get the ID part
      
      // Combine the remaining parts for the name, replacing underscores with spaces
      const nameParts = parts.slice(2);
      const name = nameParts.join(' ');
      
      // Set some as new for demo purposes (first 5 candidates)
      const isNew = parseInt(id) >= 496;
      
      return {
        id,
        name,
        fileName,
        isNew,
        lastUpdated: isNew ? new Date() : new Date(Date.now() - 86400000 * (Math.floor(Math.random() * 5) + 1))
      };
    });
    
    this.candidates = candidateData;
  }

  private loadJobDescriptionsFromFilenames() {
    // Simulated data based on filenames
    const mockJobDescriptionData = [
      { id: '100', title: 'UI/UX Designer', fileName: 'job_description_100_UIUX Designer.docx', lastUpdated: new Date() },
      { id: '99', title: 'Frontend Developer', fileName: 'job_description_99_Frontend Developer.docx', lastUpdated: new Date() },
      { id: '98', title: 'Backend Developer', fileName: 'job_description_98_Backend Developer.docx', lastUpdated: new Date() },
      { id: '97', title: 'Frontend Developer', fileName: 'job_description_97_Frontend Developer.docx', lastUpdated: new Date() },
      { id: '96', title: 'Full Stack Developer', fileName: 'job_description_96_Full Stack Developer.docx', lastUpdated: new Date() },
      { id: '95', title: 'Project Manager', fileName: 'job_description_95_Project Manager.docx', lastUpdated: new Date() },
    ];

    this.jobDescriptions = mockJobDescriptionData;
  }

  private async matchCandidatesToJobs() {
    for (const job of this.jobDescriptions) {
      const matches = await this.findMatchesForJob(job);
      this.matchResults[job.id] = matches;
    }
    
    this.lastFetch = new Date();
  }

  private async findMatchesForJob(job: JobDescription): Promise<Candidate[]> {
    // In a real implementation, we would:
    // 1. Extract text from the job description and CVs
    // 2. Use the Gemini API to find matches
    
    // For now, we'll simulate matches using a prompt to the Gemini API
    const matchedCandidates = [...this.candidates];
    
    try {
      // Sort based on a simulated AI matching that gives higher scores to new candidates
      // and randomly generates match scores between 0-100
      matchedCandidates.forEach(candidate => {
        // Boost new candidates slightly
        const newBonus = candidate.isNew ? 10 : 0;
        // Generate a match score that's somewhat correlated with the candidate ID
        // (just for demonstration purposes)
        const baseScore = (parseInt(candidate.id) % 30) + 60; // 60-90 range
        candidate.matchScore = Math.min(100, baseScore + newBonus);
        
        // Simulate skills based on job title
        if (job.title.includes('Frontend')) {
          candidate.skills = ['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript', 'UI/UX'];
        } else if (job.title.includes('Backend')) {
          candidate.skills = ['Java', 'Spring Boot', 'Node.js', 'SQL', 'NoSQL', 'APIs'];
        } else if (job.title.includes('Full Stack')) {
          candidate.skills = ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express', 'Git'];
        } else if (job.title.includes('UI/UX')) {
          candidate.skills = ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping'];
        } else if (job.title.includes('Project Manager')) {
          candidate.skills = ['Agile', 'Scrum', 'JIRA', 'Risk Management', 'Stakeholder Communication'];
        }
      });
      
      // Sort by match score (highest first)
      return matchedCandidates.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } catch (error) {
      console.error('Error matching candidates to job:', error);
      return matchedCandidates;
    }
  }

  // Get all available candidates
  getAllCandidates(): Candidate[] {
    return this.candidates;
  }
  
  // Get new candidates (for notifications)
  getNewCandidates(): Candidate[] {
    return this.candidates.filter(candidate => candidate.isNew);
  }
  
  // Get all job descriptions
  getAllJobDescriptions(): JobDescription[] {
    return this.jobDescriptions;
  }
  
  // Get top matches for a specific job
  getTopMatchesForJob(jobId: string, limit: number = 5): Candidate[] {
    const matches = this.matchResults[jobId] || [];
    return matches.slice(0, limit);
  }
  
  // Get matches above a certain score threshold
  getMatchesAboveThreshold(jobId: string, threshold: number = 80): Candidate[] {
    const matches = this.matchResults[jobId] || [];
    return matches.filter(candidate => (candidate.matchScore || 0) >= threshold);
  }
  
  // Simulate real AI matching for a specific job and candidate
  async getDetailedMatch(jobId: string, candidateId: string): Promise<string> {
    const job = this.jobDescriptions.find(j => j.id === jobId);
    const candidate = this.candidates.find(c => c.id === candidateId);
    
    if (!job || !candidate) {
      return "Could not find the specified job or candidate.";
    }
    
    try {
      // In a real implementation, this would analyze the actual CV and job description
      // For demo purposes, we'll simulate a response
      
      const prompt = `
        As an AI HR assistant, analyze the match between:
        
        Candidate: ${candidate.name}
        Job Position: ${job.title}
        
        Provide a professional assessment of why this candidate is a good match for the position.
        Include strengths, potential gaps, and recommendations for the hiring manager.
        Keep it concise and insightful.
      `;
      
      // Use the Gemini service to generate a response
      const aiResponse = await geminiService.sendMessage(prompt);
      return aiResponse;
    } catch (error) {
      console.error('Error getting detailed match:', error);
      return "Unable to generate a detailed match analysis at this time.";
    }
  }
}

// Export singleton instance
export const cvMatcherService = new CvMatcherService(); 