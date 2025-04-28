import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

interface Notification {
  id: string;
  type: 'candidate' | 'job' | 'system' | 'cv' | 'application';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  totalCount: number;
  unreadCount: number;
  isLoading: boolean;
  loadNotifications: (startIndex: number, endIndex: number) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const STORAGE_KEY = 'notifications';
const CHUNK_SIZE = 20;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [displayedNotifications, setDisplayedNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedRanges, setLoadedRanges] = useState<{ start: number; end: number }[]>([]);

  // Load notifications from localStorage on mount
  useEffect(() => {
    try {
      const storedNotifications = localStorage.getItem(STORAGE_KEY);
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
        setAllNotifications(parsedNotifications);
        // Load initial chunk
        loadNotifications(0, CHUNK_SIZE);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allNotifications));
    }
  }, [allNotifications, isLoading]);

  const loadNotifications = useCallback((startIndex: number, endIndex: number) => {
    // Check if this range is already loaded
    const isRangeLoaded = loadedRanges.some(
      range => startIndex >= range.start && endIndex <= range.end
    );

    if (!isRangeLoaded) {
      const newNotifications = allNotifications.slice(startIndex, endIndex);
      setDisplayedNotifications(prev => {
        const updated = [...prev];
        newNotifications.forEach((notification, index) => {
          updated[startIndex + index] = notification;
        });
        return updated;
      });
      setLoadedRanges(prev => [...prev, { start: startIndex, end: endIndex }]);
    }
  }, [allNotifications, loadedRanges]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };
    setAllNotifications(prev => [newNotification, ...prev]);
    setDisplayedNotifications(prev => [newNotification, ...prev.slice(0, CHUNK_SIZE - 1)]);
  };

  const markAsRead = (id: string) => {
    setAllNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setDisplayedNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setAllNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setDisplayedNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = allNotifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications: displayedNotifications,
        totalCount: allNotifications.length,
        unreadCount,
        isLoading,
        loadNotifications,
        addNotification,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
} 