import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LandingLayout from './components/LandingLayout';
import LazyLoad from './components/LazyLoad';

// Lazy load pages with preloading
const preloadComponent = (importFn: () => Promise<any>) => {
  const Component = lazy(importFn);
  // Start preloading
  importFn();
  return Component;
};

// Lazy load pages
const HomePage = preloadComponent(() => import('./pages/HomePage'));
const LoginPage = preloadComponent(() => import('./pages/LoginPage'));
const RegisterPage = preloadComponent(() => import('./pages/RegisterPage'));
const DashboardPage = preloadComponent(() => import('./pages/DashboardPage'));
const SelectionPage = preloadComponent(() => import('./pages/SelectionPage'));
const InterviewCandidates = preloadComponent(() => import('./pages/InterviewCandidates'));
const JobsPage = preloadComponent(() => import('./pages/JobsPage'));
const AnalyticsPage = preloadComponent(() => import('./pages/AnalyticsPage'));
const SettingsPage = preloadComponent(() => import('./pages/SettingsPage'));
const NotificationsPage = preloadComponent(() => import('./pages/NotificationsPage'));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6', // Vibrant purple
      light: '#A78BFA',
      dark: '#7C3AED',
    },
    secondary: {
      main: '#EC4899', // Pink
      light: '#F472B6',
      dark: '#DB2777',
    },
    background: {
      default: '#0F172A', // Deep blue
      paper: '#1E293B', // Slightly lighter blue
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingLayout><LazyLoad><HomePage /></LazyLoad></LandingLayout>} />
              <Route path="/login" element={<LandingLayout><LazyLoad><LoginPage /></LazyLoad></LandingLayout>} />
              <Route path="/register" element={<LandingLayout><LazyLoad><RegisterPage /></LazyLoad></LandingLayout>} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <LazyLoad><DashboardPage /></LazyLoad>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/selection"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <LazyLoad><SelectionPage /></LazyLoad>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interviews"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <LazyLoad><InterviewCandidates /></LazyLoad>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <LazyLoad><JobsPage /></LazyLoad>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <LazyLoad><AnalyticsPage /></LazyLoad>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <LazyLoad><SettingsPage /></LazyLoad>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <LazyLoad><NotificationsPage /></LazyLoad>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 