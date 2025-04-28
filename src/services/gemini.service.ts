import { GoogleGenerativeAI } from '@google/generative-ai';

// Create hardcoded responses for the most common HR questions
const hardcodedResponses = {
  interview: "When conducting interviews, prepare structured questions in advance, focus on behavioral questions, and ensure a consistent evaluation process across all candidates. Document feedback immediately after each interview for better comparison.",
  resume: "When reviewing resumes, look for relevant experience, skills matching the job description, career progression, and accomplishments with measurable results. Use a scoring system to objectively compare candidates.",
  onboarding: "Effective onboarding should include pre-boarding communication, a structured first day, regular check-ins during the first weeks, and clear 30/60/90 day plans. This increases employee retention by up to 82%.",
  retention: "To improve employee retention, focus on competitive compensation, growth opportunities, work-life balance, recognition programs, and regular feedback channels. Exit interviews can provide valuable insights for improvement.",
  performance: "Performance reviews should be regular (not just annual), objective, focused on specific examples, and include both strengths and development areas. Always tie feedback to company values and objectives.",
  hiring: "Streamline your hiring process by clearly defining job requirements, using multiple assessment methods, involving team members in interviews, and making timely decisions. Keep candidates informed throughout the process.",
  evaluation: "When evaluating candidates, use a combination of resume screening, structured interviews, skills assessments, reference checks, and team feedback to make comprehensive hiring decisions.",
  feedback: "Provide feedback that is specific, timely, balanced, and actionable. Focus on behavior rather than personality, and always include clear next steps for improvement.",
  training: "Effective training programs should include needs analysis, clear learning objectives, mixed delivery methods, practical applications, and post-training evaluation to measure effectiveness.",
  default: "As an HR professional, it's important to balance employee advocacy with business objectives. Consider implementing regular employee surveys, transparent communication channels, and clear career development paths to build a positive workplace culture."
};

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Get API key from environment variables
// Use type assertion to handle Vite's environment variables
const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

// HR knowledge base with common questions and answers
const hrKnowledgeBase: Record<string, string> = {
  // General HR questions
  "hi": "Hello! I'm your HR assistant. How can I help you today? You can ask me about recruiting, employee relations, performance management, or other HR topics.",
  "hello": "Hi there! I'm ready to assist with any HR questions you might have. What would you like to know about?",
  "help": "I can help with various HR topics including recruitment strategies, interview techniques, employee onboarding, performance reviews, and retention strategies. What specific area are you interested in?",

  // Recruitment and hiring
  "interview": "When conducting interviews, I recommend using structured questions, focusing on behavioral examples, and having a consistent evaluation process. The STAR method (Situation, Task, Action, Result) is particularly effective for assessing candidates.",
  "hiring": "Effective hiring starts with a clear job description and candidate profile. Use multiple channels for sourcing, implement structured interviews, and create an evaluation rubric to ensure objective assessment.",
  "recruitment": "Successful recruitment strategies include: defining ideal candidate profiles, utilizing both passive and active sourcing, creating compelling job descriptions, streamlining the application process, and maintaining a talent pipeline.",
  "resume": "When reviewing resumes, look for relevant experience, progression in responsibilities, achievements with measurable results, and skills that match your requirements. Red flags include unexplained gaps and frequent job changes.",
  "candidate": "Evaluating candidates effectively requires a multi-faceted approach: structured interviews, skills assessments, reference checks, and team feedback. Always check for both technical skills and cultural fit.",

  // Employee management
  "onboarding": "Effective onboarding includes pre-arrival preparation, a structured first week, regular check-ins, clear 30/60/90 day plans, and assigned mentors. This can improve retention by up to 82% and productivity by over 70%.",
  "retention": "To improve employee retention, focus on: competitive compensation, growth opportunities, recognition programs, work-life balance, positive workplace culture, and regular feedback channels.",
  "performance": "Performance reviews should be regular (not just annual), objective, focused on specific examples, and include both strengths and development areas. Always tie feedback to company goals and provide actionable next steps.",
  "feedback": "Effective feedback should be specific, timely, balanced, and action-oriented. Focus on observed behaviors rather than personality traits, and always include clear guidance for improvement.",
  "training": "Developing effective training programs requires needs analysis, clear learning objectives, varied learning methods, practical application opportunities, and post-training evaluation. Consider both technical and soft skills.",
  "development": "Employee development plans should align individual career goals with organizational needs. Include a mix of formal training, stretch assignments, mentoring, and regular skills assessment.",

  // Workplace issues
  "conflict": "When handling workplace conflicts, remain neutral, focus on facts, listen to all parties, identify the root causes, and work toward collaborative solutions. Document all discussions and follow up to ensure resolution.",
  "remote": "Managing remote teams effectively requires clear communication channels, defined expectations, regular check-ins, appropriate technology tools, and intentional team-building activities.",
  "benefits": "A competitive benefits package typically includes health insurance, retirement plans, paid time off, professional development opportunities, and work-life balance provisions. Regularly benchmark against industry standards.",
  "termination": "When handling terminations, ensure thorough documentation, follow consistent procedures, conduct respectful exit interviews, provide clear explanations, and comply with all legal requirements.",

  // HR metrics
  "metrics": "Important HR metrics to track include turnover rate, cost-per-hire, time-to-fill, employee satisfaction, absenteeism, and training effectiveness. These provide valuable insights for strategic decision-making.",
  "analytics": "HR analytics can help identify trends in recruitment efficiency, turnover patterns, training effectiveness, and employee engagement. Use this data to drive strategic HR decisions and demonstrate ROI.",

  // Default response
  "default": "That's an interesting HR question. While I don't have specific information on that topic, I recommend consulting your HR policies, industry best practices, or relevant labor regulations. Would you like me to help with another HR topic?"
};

export class GeminiService {
  private chatHistory: ChatMessage[] = [];
  private apiKey: string = GEMINI_API_KEY;

  constructor() {
    this.resetChat();
  }

  resetChat() {
    this.chatHistory = [];
  }
  
  setFallbackMode(mode: boolean) {
    // This method exists for compatibility but does nothing
    // since we're always in "local" mode
  }
  
  async sendMessage(userMessage: string): Promise<string> {
    // Add user message to history
    this.chatHistory.push({ role: 'user', content: userMessage });
    
    // Check if API key is available - if not, use local responses
    if (!this.apiKey) {
      console.warn('No API key found - using local responses');
      const response = this.getResponseFromKnowledgeBase(userMessage);
      this.chatHistory.push({ role: 'assistant', content: response });
      return response;
    }
    
    // Try to call Gemini API if available in the future
    // For now, use local knowledge base
    const response = this.getResponseFromKnowledgeBase(userMessage);
    
    // Add response to history
    this.chatHistory.push({ role: 'assistant', content: response });
    
    return response;
  }
  
  private getResponseFromKnowledgeBase(query: string): string {
    query = query.toLowerCase().trim();
    
    // Check for exact matches first
    if (hrKnowledgeBase[query]) {
      return hrKnowledgeBase[query];
    }
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(hrKnowledgeBase)) {
      if (query.includes(keyword) && keyword !== 'default') {
        return response;
      }
    }
    
    // If query has multiple words, try to match each word
    const words = query.split(/\s+/);
    if (words.length > 1) {
      for (const word of words) {
        if (word.length > 3 && hrKnowledgeBase[word]) {
          return hrKnowledgeBase[word];
        }
      }
      
      // Try partial matches with keywords
      for (const [keyword, response] of Object.entries(hrKnowledgeBase)) {
        for (const word of words) {
          if (word.length > 3 && keyword.includes(word) && keyword !== 'default') {
            return response;
          }
        }
      }
    }
    
    // Return default response if no match found
    return hrKnowledgeBase.default;
  }

  getChatHistory(): ChatMessage[] {
    return [...this.chatHistory];
  }
  
  isFallbackMode(): boolean {
    return false; // We're always in "local mode" now
  }
}

// Export a singleton instance
export const geminiService = new GeminiService(); 