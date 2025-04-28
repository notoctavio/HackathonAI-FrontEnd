import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

interface LazyLoadProps {
  children: React.ReactNode;
}

const loadingContainerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const LazyLoad: React.FC<LazyLoadProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <motion.div
          variants={loadingContainerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 'calc(100vh - 72px)',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(10px)',
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
          </Box>
        </motion.div>
      }
    >
      {children}
    </Suspense>
  );
};

export default LazyLoad; 