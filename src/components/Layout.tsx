import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Badge,
  Divider,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Work,
  Analytics,
  Settings,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Group as SelectionIcon,
  EventNote as InterviewIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, currentUser } = useAuth();
  const notificationContext = useNotifications();
  const [companyName, setCompanyName] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  // Reset navigation state when location changes
  useEffect(() => {
    if (previousPath !== location.pathname) {
      setIsNavigating(false);
      setPreviousPath(location.pathname);
    }
  }, [location.pathname, previousPath]);

  // Set company name from user data
  useEffect(() => {
    try {
      // Force a specific company name for testing
      setCompanyName("Amazon");
      
      // Get company name from currentUser
      if (currentUser && currentUser.company) {
        setCompanyName(currentUser.company);
        return;
      }
      
      // Fallback to localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userData = JSON.parse(userStr);
        if (userData && userData.company) {
          setCompanyName(userData.company);
        }
      }
    } catch (error) {
      console.error("Error getting company name:", error);
    }
  }, [currentUser]);

  // Add debug logging
  useEffect(() => {
    console.log("Layout received currentUser:", currentUser);
    if (currentUser) {
      console.log("Current user company:", currentUser.company);
      console.log("User object:", JSON.stringify(currentUser));
    }
    
    // Also check localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log("User from localStorage:", user);
  }, [currentUser]);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const handleNavigation = useCallback((path: string) => {
    if (location.pathname === path) return; // Don't navigate if already on the page
    
    setIsNavigating(true);
    setMobileOpen(false); // Close mobile drawer on navigation
    
    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      navigate(path);
    });
  }, [location.pathname, navigate]);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Selection', icon: <SelectionIcon />, path: '/selection' },
    { text: 'Interviews', icon: <InterviewIcon />, path: '/interviews' }
  ];

  const drawer = (
    <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2.5 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.5rem',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        >
          ProMatch
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(139, 92, 246, 0.2)', mx: 2 }} />
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              mb: 1,
              borderRadius: 2,
              color: '#F8FAFC',
              background: 'rgba(139, 92, 246, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(139, 92, 246, 0.1)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                background: 'rgba(139, 92, 246, 0.15)',
                transform: 'translateY(-2px)',
                borderColor: 'rgba(139, 92, 246, 0.3)',
              },
              '&.Mui-selected': {
                background: 'rgba(139, 92, 246, 0.2)',
                borderColor: 'rgba(139, 92, 246, 0.4)',
                '&:hover': {
                  background: 'rgba(139, 92, 246, 0.25)',
                },
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: 'inherit',
              minWidth: 40,
              '& .MuiSvgIcon-root': {
                fontSize: '1.3rem',
              }
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: 500,
                  fontSize: '0.95rem',
                }
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2.5 }}>
        <Button
          variant="contained"
          onClick={logout}
          startIcon={<LogoutIcon />}
          sx={{
            width: '100%',
            background: 'rgba(168, 85, 247, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: 2,
            color: '#A855F7',
            textTransform: 'none',
            py: 1.2,
            '&:hover': {
              background: 'rgba(168, 85, 247, 0.2)',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, sm: drawerWidth },
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: 'none',
          height: '72px',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          px: { xs: 2, sm: 3 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { sm: 'none' },
                color: '#F8FAFC',
                background: 'rgba(139, 92, 246, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                width: '40px',
                height: '40px',
                '&:hover': {
                  background: 'rgba(139, 92, 246, 0.15)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#F8FAFC',
                fontSize: '1.1rem',
                display: 'block',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {companyName || 'Loading...'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => handleNavigation('/notifications')}
              sx={{ 
                position: 'relative',
                color: '#F8FAFC',
                background: 'rgba(139, 92, 246, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                width: '40px',
                height: '40px',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: 'rgba(139, 92, 246, 0.15)',
                  transform: 'translateY(-2px)',
                  borderColor: 'rgba(139, 92, 246, 0.3)',
                },
                '& .MuiBadge-badge': {
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                  color: '#F8FAFC',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  minWidth: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0 4px',
                }
              }}
            >
              <Badge badgeContent={notificationContext.notifications.filter(n => !n.read).length} color="error">
                <NotificationsIcon sx={{ fontSize: '1.3rem' }} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '72px',
          position: 'relative',
          minHeight: 'calc(100vh - 72px)',
        }}
      >
        <AnimatePresence mode="wait">
          {isNavigating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                zIndex: 1,
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
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Layout; 