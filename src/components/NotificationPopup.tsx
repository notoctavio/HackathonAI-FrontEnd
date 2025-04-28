import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  Slide,
  useTheme 
} from '@mui/material';
import { Close as CloseIcon, CheckCircle, Info, Warning, Error } from '@mui/icons-material';
import { useNotifications, Notification, NotificationType } from '../context/NotificationContext';

const NotificationPopup: React.FC = () => {
  const theme = useTheme();
  const { notifications, removeNotification } = useNotifications();
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [visible, setVisible] = useState(false);
  const [queue, setQueue] = useState<Notification[]>([]);

  useEffect(() => {
    // When a new notification arrives, add it to the queue
    if (notifications.length > 0) {
      setQueue(prev => [...prev, ...notifications]);
    }
  }, [notifications]);

  useEffect(() => {
    // Process queue when it changes or when visibility changes
    if (queue.length > 0 && !visible && !currentNotification) {
      const next = queue[0];
      const newQueue = queue.slice(1);
      
      setCurrentNotification(next);
      setQueue(newQueue);
      setVisible(true);
      
      // Auto-hide notification after 5 seconds
      const timer = setTimeout(() => {
        handleClose(next.id);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [queue, visible, currentNotification]);

  const handleClose = (id: string) => {
    setVisible(false);
    setTimeout(() => {
      removeNotification(id);
      setCurrentNotification(null);
    }, 300); // Wait for animation to complete
  };

  if (!currentNotification) return null;

  const getIcon = () => {
    switch (currentNotification.type) {
      case 'cv':
        return <CheckCircle sx={{ color: theme.palette.success.main, fontSize: '1.5rem' }} />;
      case 'application':
        return <Info sx={{ color: theme.palette.info.main, fontSize: '1.5rem' }} />;
      case 'match':
        return <CheckCircle sx={{ color: theme.palette.success.main, fontSize: '1.5rem' }} />;
      case 'info':
        return <Info sx={{ color: theme.palette.info.main, fontSize: '1.5rem' }} />;
      case 'warning':
        return <Warning sx={{ color: theme.palette.warning.main, fontSize: '1.5rem' }} />;
      case 'error':
        return <Error sx={{ color: theme.palette.error.main, fontSize: '1.5rem' }} />;
      default:
        return <Info sx={{ color: theme.palette.info.main, fontSize: '1.5rem' }} />;
    }
  };

  return (
    <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 320,
          p: 2,
          display: 'flex',
          background: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          zIndex: 9999
        }}
      >
        <Box sx={{ mr: 1 }}>
          {getIcon()}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {currentNotification.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentNotification.message}
          </Typography>
        </Box>
        <IconButton 
          size="small" 
          onClick={() => handleClose(currentNotification.id)} 
          sx={{ mt: -1, mr: -1 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Paper>
    </Slide>
  );
};

export default NotificationPopup; 