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
  Group as SelectionIcon,
  EventNote as InterviewIcon,
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
            onClick={() => navigate(item.path)}
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
                display: { xs: 'none', sm: 'block' },
                background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {user?.company || 'Welcome'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => navigate('/notifications')}
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
              <Badge badgeContent={unreadCount} color="error">
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
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 12,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          margin: { xs: 2, sm: 3 },
          marginTop: { xs: 12, sm: 12 },
          minHeight: 'calc(100vh - 160px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 