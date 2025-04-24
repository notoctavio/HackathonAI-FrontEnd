import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const AnalyticsPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Analytics
        </Typography>
      </motion.div>
    </Box>
  );
};

export default AnalyticsPage; 