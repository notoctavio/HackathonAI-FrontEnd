import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useNotifications } from '../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const NotificationsPage: React.FC = () => {
  const theme = useTheme();
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'cv':
        return '📄';
      case 'application':
        return '📝';
      case 'candidate':
        return '👤';
      case 'job':
        return '💼';
      default:
        return '🔔';
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
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
              }}
            >
              No notifications yet
            </Typography>
          </Box>
        ) : (
          <List>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ListItem
                  sx={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    mb: 2,
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'translateX(5px)',
                      background: 'rgba(255, 255, 255, 0.08)',
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
                        {!notification.read && (
                          <Chip
                            label="New"
                            size="small"
                            sx={{
                              bgcolor: 'primary.main',
                              color: 'white',
                              fontSize: '0.75rem',
                            }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          sx={{
                            color: notification.read ? 'text.secondary' : 'text.primary',
                            mb: 0.5,
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary' }}
                        >
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>
        )}
      </motion.div>
    </Box>
  );
};

export default NotificationsPage; 