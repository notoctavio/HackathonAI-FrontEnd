import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Work as WorkIcon,
    Assessment as AssessmentIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Candidates', icon: <PeopleIcon />, path: '/candidates' },
    { text: 'Job Listings', icon: <WorkIcon />, path: '/jobs' },
    { text: 'Analytics', icon: <AssessmentIcon />, path: '/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export default function Layout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ overflow: 'auto' }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    ProMatch
                </Typography>
            </Toolbar>
            <List>
                {menuItems.map((item) => (
                    <motion.div
                        key={item.text}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <ListItem
                            button
                            selected={location.pathname === item.path}
                            sx={{
                                borderRadius: 2,
                                mx: 1,
                                mb: 1,
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.light',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    </motion.div>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
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
                    <Typography variant="h6" noWrap component="div">
                        Welcome, Octavio!
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant={isMobile ? 'temporary' : 'permanent'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
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
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
} 