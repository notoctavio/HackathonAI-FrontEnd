import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, useTheme, SvgIcon, SvgIconProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Custom icons components with more sophisticated designs
const AiMatchingIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"
    />
  </SvgIcon>
);

const AnalyticsIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2zm-6-6.12l5-5 5 5L21 5l-7-7-7 7z"
    />
  </SvgIcon>
);

const CollaborationIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
    />
  </SvgIcon>
);

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
    zIndex: 1,
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  marginBottom: theme.spacing(2),
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
    background: 'rgba(255, 255, 255, 0.08)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  marginBottom: theme.spacing(1.5),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
  border: `1px solid ${theme.palette.primary.main}30`,
  '& svg': {
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}30 0%, ${theme.palette.secondary.main}30 100%)`,
  }
}));

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      title: 'AI-Powered Matching',
      description: 'Find the perfect candidates using advanced AI algorithms that analyze skills, experience, and cultural fit.',
      icon: AiMatchingIcon,
    },
    {
      title: 'Smart Analytics',
      description: 'Get insights into your recruitment process with real-time analytics and performance metrics.',
      icon: AnalyticsIcon,
    },
    {
      title: 'Collaborative Hiring',
      description: 'Streamline your hiring process with tools for team collaboration and candidate evaluation.',
      icon: CollaborationIcon,
    },
  ];

  const handleSignIn = () => {
    // Force clear any existing auth data before redirecting
    localStorage.removeItem('user');
    console.log('Homepage: Redirecting to login page');
    navigate('/login');
  };

  return (
    <HeroSection>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              minHeight: '100vh',
              pt: { xs: 4, md: 0 },
              gap: 6
            }}
          >
            <Box
              sx={{
                flex: { md: '0 0 41.666667%' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: { xs: 'center', md: 'flex-start' }
              }}
            >
              <Box sx={{ maxWidth: '600px' }}>
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h1"
                    sx={{
                      mb: 3,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: 800,
                      fontSize: { xs: '3rem', md: '4rem' },
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    ProMatch
                  </Typography>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h2"
                    sx={{
                      mb: 4,
                      color: 'text.primary',
                      fontSize: { xs: '2rem', md: '3rem' },
                      lineHeight: 1.2,
                      fontWeight: 600,
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    Transform your recruitment process with AI
                  </Typography>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      color: 'text.secondary',
                      fontSize: '1.25rem',
                      lineHeight: 1.6,
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    Find the perfect candidates faster with our AI-powered recruitment platform. Streamline your hiring process and make data-driven decisions.
                  </Typography>
                </motion.div>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <motion.div variants={fadeInUp}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/register')}
                      sx={{
                        mr: 2,
                        px: 4,
                        py: 1.5,
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleSignIn}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: '12px',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'text.primary',
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.4)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Sign In
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                flex: { md: '0 0 58.333333%' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: { xs: 'center', md: 'flex-end' }
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 3,
                  width: '100%',
                  maxWidth: '600px'
                }}
              >
                {features.map((feature, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <FeatureCard>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <IconWrapper>
                          <feature.icon />
                        </IconWrapper>
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              mb: 0.75,
                              color: 'primary.main',
                              fontWeight: 600,
                              fontSize: '1.1rem',
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: 'text.secondary',
                              lineHeight: 1.5,
                              fontSize: '0.95rem',
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </FeatureCard>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </HeroSection>
  );
};

export default HomePage; 