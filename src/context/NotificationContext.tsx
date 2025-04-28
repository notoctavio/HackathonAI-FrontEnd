import React, { createContext, useState, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type NotificationType = 'cv' | 'application' | 'info' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: number;
}

export interface NotificationInput {
  title: string;
  message: string;
  type: NotificationType;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (titleOrInput: string | NotificationInput, message?: string, type?: NotificationType) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
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

  const addNotification = (titleOrInput: string | NotificationInput, message?: string, type?: NotificationType) => {
    let newNotification: Notification;
    
    if (typeof titleOrInput === 'object') {
      // Handle object format
      newNotification = {
        id: uuidv4(),
        title: titleOrInput.title,
        message: titleOrInput.message,
        type: titleOrInput.type,
        timestamp: Date.now()
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
        timestamp: Date.now()
      };
    }
    
    setNotifications(prevNotifications => [newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider; 