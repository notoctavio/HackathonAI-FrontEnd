import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  People as PeopleIcon,
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stats = [
  {
    title: 'Total Candidates',
    value: '245',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    color: 'primary.main',
  },
  {
    title: 'Open Positions',
    value: '12',
    icon: <WorkIcon sx={{ fontSize: 40 }} />,
    color: 'secondary.main',
  },
  {
    title: 'Interviews Today',
    value: '8',
    icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
    color: 'success.main',
  },
];

export default function DashboardPage() {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Dashboard
        </Typography>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid key={index} xs={12} sm={6} md={4}>
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ color: 'text.secondary', mb: 1 }}
                      >
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{ fontWeight: 700, color: stat.color }}
                      >
                        {stat.value}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: `${stat.color}15`,
                        width: 60,
                        height: 60,
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid xs={12} md={8}>
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Recent Candidates
                </Typography>
                {/* Add candidate list component here */}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid xs={12} md={4}>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Upcoming Interviews
                </Typography>
                {/* Add interview schedule component here */}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
} 