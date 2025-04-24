import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const HeroSection = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
    zIndex: 1,
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
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
      icon: '🤖',
    },
    {
      title: 'Smart Analytics',
      description: 'Get insights into your recruitment process with real-time analytics and performance metrics.',
      icon: '📊',
    },
    {
      title: 'Collaborative Hiring',
      description: 'Streamline your hiring process with tools for team collaboration and candidate evaluation.',
      icon: '👥',
    },
  ];

  return (
    <HeroSection>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h1"
                  sx={{
                    mb: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
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
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
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
                    maxWidth: '600px',
                  }}
                >
                  Find the perfect candidates faster with our AI-powered recruitment platform. Streamline your hiring process and make data-driven decisions.
                </Typography>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    mr: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                      background: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  Sign In
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid item xs={12} key={index}>
                    <motion.div variants={fadeInUp}>
                      <FeatureCard>
                        <Typography variant="h4" sx={{ mb: 1 }}>
                          {feature.icon}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          {feature.description}
                        </Typography>
                      </FeatureCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </HeroSection>
  );
};

export default HomePage; 