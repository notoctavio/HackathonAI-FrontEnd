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
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { unreadCount } = useNotifications();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Selection', icon: <People />, path: '/selection' },
    { text: 'Interviews', icon: <People />, path: '/interviews' }
  ];

  const drawer = (
    <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#A855F7' }}>
          ProMatch
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(168, 85, 247, 0.2)' }} />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              color: '#A855F7',
              '&:hover': {
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(168, 85, 247, 0.15)',
                '&:hover': {
                  backgroundColor: 'rgba(168, 85, 247, 0.2)',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: '#A855F7' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2 }}>
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
            ProMatch
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate('/notifications')}
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
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
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 