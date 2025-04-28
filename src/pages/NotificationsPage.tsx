import React, { useCallback, useRef, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, useTheme, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import {
  Description as CvIcon,
  Assignment as ApplicationIcon,
  Person as CandidateIcon,
  Work as JobIcon,
  Notifications as SystemIcon
} from '@mui/icons-material';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const NotificationsPage: React.FC = () => {
  const theme = useTheme();
  const { notifications, totalCount, markAsRead, markAllAsRead, isLoading, loadNotifications } = useNotifications();
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<boolean>(false);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || loadingRef.current || isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const scrollThreshold = 200; // pixels from bottom to trigger load

    if (scrollHeight - scrollTop - clientHeight < scrollThreshold) {
      loadingRef.current = true;
      loadNotifications(notifications.length, notifications.length + 20);
    }
  }, [notifications.length, loadNotifications, isLoading]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    loadingRef.current = false;
  }, [notifications]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'cv':
        return <CvIcon sx={{ fontSize: '1.5rem' }} />;
      case 'application':
        return <ApplicationIcon sx={{ fontSize: '1.5rem' }} />;
      case 'candidate':
        return <CandidateIcon sx={{ fontSize: '1.5rem' }} />;
      case 'job':
        return <JobIcon sx={{ fontSize: '1.5rem' }} />;
      default:
        return <SystemIcon sx={{ fontSize: '1.5rem' }} />;
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'cv':
        return theme.palette.primary.main;
      case 'application':
        return theme.palette.secondary.main;
      case 'candidate':
        return theme.palette.success.main;
      case 'job':
        return theme.palette.warning.main;
      default:
        return theme.palette.info.main;
    }
  };

  if (isLoading && notifications.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 72px)',
        }}
      >
        <CircularProgress 
          sx={{
            color: 'primary.main',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Notifications
          </Typography>
          {notifications.length > 0 && (
            <Chip
              label="Mark all as read"
              onClick={markAllAsRead}
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'text.primary',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          )}
        </Box>

        {notifications.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '50vh',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              p: 4,
            }}
          >
            <SystemIcon sx={{ fontSize: '3rem', color: 'text.secondary', mb: 2 }} />
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
              }}
            >
              No notifications yet
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                mt: 1,
              }}
            >
              When you receive notifications, they will appear here
            </Typography>
          </Box>
        ) : (
          <Box 
            ref={containerRef}
            sx={{ 
              height: 'calc(100vh - 200px)', 
              width: '100%',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                },
              },
            }}
          >
            <List>
              <AnimatePresence>
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ListItem
                      sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        mb: 2,
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateX(5px)',
                          background: 'rgba(255, 255, 255, 0.08)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: getStatusColor(notification.type),
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& .MuiSvgIcon-root': {
                              color: '#fff'
                            }
                          }}
                        >
                          {getNotificationIcon(notification.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: notification.read ? 400 : 600,
                                color: notification.read ? 'text.secondary' : 'text.primary',
                              }}
                            >
                              {notification.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'text.secondary',
                                ml: 'auto',
                              }}
                            >
                              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              mt: 0.5,
                            }}
                          >
                            {notification.message}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </List>
          </Box>
        )}
      </motion.div>
    </Box>
  );
};

export default NotificationsPage; 