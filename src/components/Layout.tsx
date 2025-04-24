<<<<<<< Updated upstream
import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, Badge } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { motion } from 'framer-motion';
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Description,
  Assignment,
  School,
  Email,
  BusinessCenter,
  Assessment,
  PeopleAlt,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import styled from '@emotion/styled';
>>>>>>> Stashed changes

const drawerWidth = 280;

interface LayoutProps {
  children: React.ReactNode;
}

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '-0.5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  textAlign: 'center',
  '&:hover': {
    transform: 'scale(1.02)',
    transition: 'transform 0.2s ease',
  },
}));

const MenuItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '12px',
  margin: '4px 8px',
  color: 'rgba(255, 255, 255, 0.7)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    transform: 'translateX(4px)',
    '& .MuiListItemIcon-root': {
      color: 'white',
      transform: 'scale(1.1)',
    },
  },
  '&.Mui-selected': {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
    color: 'white',
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
    },
  },
}));

const MenuItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  minWidth: '40px',
  transition: 'all 0.3s ease',
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
<<<<<<< Updated upstream
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Candidates', icon: <PeopleIcon />, path: '/candidates' },
    { text: 'Open Positions', icon: <WorkIcon />, path: '/positions' },
    { text: 'Interviews', icon: <AssessmentIcon />, path: '/interviews' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(180deg, rgba(26, 26, 26, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%)',
      backdropFilter: 'blur(10px)',
    }}>
      <Toolbar sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 800,
        fontSize: '1.5rem',
        py: 3,
        px: 3,
      }}>
        ProMatch
      </Toolbar>
      <List sx={{ 
        flexGrow: 1,
        px: 2,
        '& .MuiListItem-root': {
          borderRadius: 2,
          mb: 1,
        }
      }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ListItem
              button
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                transition: 'all 0.3s ease',
                background: location.pathname === item.path 
                  ? `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`
                  : 'transparent',
                border: location.pathname === item.path 
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid transparent',
                '&:hover': {
                  background: location.pathname === item.path
                    ? `linear-gradient(135deg, ${theme.palette.primary.main}25 0%, ${theme.palette.secondary.main}25 100%)`
                    : 'rgba(255, 255, 255, 0.05)',
                  transform: 'translateX(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path 
                  ? theme.palette.primary.main 
                  : 'rgba(255, 255, 255, 0.7)',
                minWidth: 40,
                transition: 'all 0.3s ease',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    color: location.pathname === item.path 
                      ? theme.palette.primary.main 
                      : 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.3s ease',
                  },
                }}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <ListItem
          button
          onClick={() => navigate('/login')}
          sx={{
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
=======
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Selection', icon: <Assessment />, path: '/selection' },
    { text: 'Interviews', icon: <PeopleAlt />, path: '/interviews' }
  ];

  const drawer = (
    <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <List sx={{ 
        mt: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.25,
        px: 1,
      }}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              width: '92%',
              px: 1.5,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              '&:hover': {
                transform: 'translateX(4px)',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.1)',
              },
            }}
          >
            <MenuItemIcon sx={{ 
              minWidth: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {item.icon}
            </MenuItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                },
              }}
            />
          </MenuItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ 
        p: 1.5, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button
          variant="contained"
          onClick={logout}
          startIcon={<LogoutIcon />}
          sx={{
            width: '92%',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: 'white',
            textTransform: 'none',
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
>>>>>>> Stashed changes
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)',
              transform: 'translateY(-2px)',
<<<<<<< Updated upstream
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
=======
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
>>>>>>> Stashed changes
            },
          }}
        >
          <ListItemIcon sx={{ 
            color: 'error.main',
            minWidth: 40,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            sx={{
              '& .MuiTypography-root': {
                color: 'error.main',
                fontWeight: 600,
                letterSpacing: '0.5px',
              },
            }}
          />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
<<<<<<< Updated upstream
          ml: { sm: `${drawerWidth}px` },
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
=======
          ml: { xs: 0, sm: drawerWidth },
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '64px',
          px: 3,
        }}>
          <Box sx={{ width: '120px' }}>
            <Logo variant="h6">
              ProMatch
            </Logo>
          </Box>
          <IconButton
            color="inherit"
            onClick={() => navigate('/notifications')}
            sx={{ 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '14px',
              width: '44px',
              height: '44px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
              },
            }}
          >
            <Badge 
              badgeContent={unreadCount} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  minWidth: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }
              }}
            >
              <NotificationsIcon sx={{ 
                fontSize: 22,
                color: 'white',
                opacity: 0.9,
              }} />
>>>>>>> Stashed changes
            </Badge>
          </IconButton>
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
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
<<<<<<< Updated upstream
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
=======
              boxSizing: 'border-box',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
>>>>>>> Stashed changes
            },
          }}
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
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 