import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { cvMatcherService, Candidate } from '../services/cvMatcher.service';

export type NotificationType = 'cv' | 'application' | 'info' | 'warning' | 'error' | 'match';

export interface NotificationInput {
  title: string;
  message: string;
  type: NotificationType;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: number;
  read?: boolean; // Track if notification has been read
  data?: any; // Optional data like candidate ID or job ID
}

export interface NotificationContextType {
  notifications: Notification[];
  totalCount: number; // Total count of all notifications
  isLoading: boolean; // Loading state for notifications
  addNotification: (titleOrInput: string | NotificationInput, message?: string, type?: NotificationType, data?: any) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  addCandidateNotification: (candidate: Candidate) => void;
  addMatchNotification: (candidate: Candidate, jobTitle: string, matchScore: number) => void;
  markAsRead: (id: string) => void; // Mark a notification as read
  markAllAsRead: () => void; // Mark all notifications as read
  loadNotifications: (offset: number, limit: number) => void; // Load more notifications for pagination
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Check for new candidates and add notifications
  useEffect(() => {
    const checkForNewCandidates = async () => {
      const newCandidates = cvMatcherService.getNewCandidates();
      
      if (newCandidates.length > 0) {
        // Add notifications for each new candidate
        newCandidates.forEach(candidate => {
          addCandidateNotification(candidate);
        });
        
        // Find matches for new candidates and add notifications
        const jobDescriptions = cvMatcherService.getAllJobDescriptions();
        for (const job of jobDescriptions) {
          const matches = cvMatcherService.getMatchesAboveThreshold(job.id, 85);
          
          // Filter to just new candidates with high match scores
          const newHighMatches = matches
            .filter(candidate => candidate.isNew && (candidate.matchScore || 0) >= 85);
          
          // Add notifications for good matches
          newHighMatches.forEach(candidate => {
            addMatchNotification(candidate, job.title, candidate.matchScore || 0);
          });
        }
      }
    };
    
    // Run initially
    checkForNewCandidates();
    
    // Set up interval to check periodically (every 5 minutes)
    const intervalId = setInterval(checkForNewCandidates, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const addNotification = (titleOrInput: string | NotificationInput, message?: string, type?: NotificationType, data?: any) => {
    let newNotification: Notification;
    
    if (typeof titleOrInput === 'object') {
      // Handle object format
      newNotification = {
        id: uuidv4(),
        title: titleOrInput.title,
        message: titleOrInput.message,
        type: titleOrInput.type,
        timestamp: Date.now(),
        read: false,
        data: data
      };
    } else {
      // Handle individual parameters format
      if (!message || !type) {
        console.error('Missing parameters for addNotification');
        return;
      }
      newNotification = {
        id: uuidv4(),
        title: titleOrInput,
        message,
        type,
        timestamp: Date.now(),
        read: false,
        data: data
      };
    }
    
    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    setTotalCount(prev => prev + 1);
  };
  
  const addCandidateNotification = (candidate: Candidate) => {
    addNotification(
      `New CV Submission`,
      `${candidate.name} has submitted their CV.`,
      'cv',
      { candidateId: candidate.id }
    );
  };
  
  const addMatchNotification = (candidate: Candidate, jobTitle: string, matchScore: number) => {
    addNotification(
      `Strong Match Found: ${Math.round(matchScore)}%`,
      `${candidate.name} is a strong match for the ${jobTitle} position.`,
      'match',
      { candidateId: candidate.id, matchScore }
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    setTotalCount(prev => Math.max(0, prev - 1));
  };

  const clearNotifications = () => {
    setNotifications([]);
    setTotalCount(0);
  };

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  // Simulate loading more notifications for pagination
  const loadNotifications = (offset: number, limit: number) => {
    setIsLoading(true);
    // In a real app, this would fetch from an API
    // For demo purposes, just simulate a delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const value = {
    notifications,
    totalCount,
    isLoading,
    addNotification,
    removeNotification,
    clearNotifications,
    addCandidateNotification,
    addMatchNotification,
    markAsRead,
    markAllAsRead,
    loadNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider; 