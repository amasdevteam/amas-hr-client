// TimeOffCards.tsx
import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Paper } from '@mui/material';
import { BeachAccess, SickOutlined, Home } from '@mui/icons-material';
import { TimeOffHistory } from './time-off-history';

const TimeOffCards: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'vacation' | 'sick' | 'wfh'>('dashboard');

  // Function to handle clicking on History button
  const handleHistoryClick = (type: 'vacation' | 'sick' | 'wfh') => {
    console.log(`History button clicked for ${type}`);
    setView(type);
  };

  // Function to go back to dashboard
  const handleBack = () => {
    console.log('Going back to dashboard');
    setView('dashboard');
  };

  // If viewing history, show the appropriate history component
  if (view !== 'dashboard') {
    return <TimeOffHistory type={view} onBack={handleBack} />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" fontWeight="medium" mb={3}>
        Your Time Off Balances
      </Typography>

      <Grid container spacing={6}>
        {/* Annual Leave Card */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={1}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(135deg, transparent 50%, rgba(76, 175, 80, 0.1) 50%)',
                zIndex: 0
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                sx={{ 
                  display: 'flex',
                  p: 1,
                  mr: 1.5,
                  color: '#4CAF50',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '50%'
                }}
              >
                <BeachAccess />
              </Box>
              <Typography variant="subtitle1" fontWeight="medium">
                Annual Leave
              </Typography>
            </Box>

            <Typography variant="h3" color="#4CAF50" fontWeight="bold" mb={0.5}>
              16 <Typography component="span" variant="body2" color="text.secondary">Days</Typography>
            </Typography>
            
            <Typography variant="body2" color="text.secondary" mb={3}>
              Available vacation days
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                size="small" 
                sx={{ 
                  bgcolor: '#4CAF50', 
                  '&:hover': { bgcolor: '#43a047' }
                }}
              >
                Request
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  color: '#4CAF50', 
                  borderColor: '#4CAF50',
                  '&:hover': { borderColor: '#43a047', bgcolor: 'rgba(76, 175, 80, 0.04)' }
                }}
                onClick={() => handleHistoryClick('vacation')}
              >
                History
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Sick Leave Card */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={1}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(135deg, transparent 50%, rgba(244, 67, 54, 0.1) 50%)',
                zIndex: 0
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                sx={{ 
                  display: 'flex',
                  p: 1,
                  mr: 1.5,
                  color: '#F44336',
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  borderRadius: '50%'
                }}
              >
                <SickOutlined />
              </Box>
              <Typography variant="subtitle1" fontWeight="medium">
                Sick Leave
              </Typography>
            </Box>

            <Typography variant="h3" color="#F44336" fontWeight="bold" mb={0.5}>
              8 <Typography component="span" variant="body2" color="text.secondary">Days</Typography>
            </Typography>
            
            <Typography variant="body2" color="text.secondary" mb={3}>
              Available sick leave days
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                size="small" 
                sx={{ 
                  bgcolor: '#F44336', 
                  '&:hover': { bgcolor: '#e53935' }
                }}
              >
                Request
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  color: '#F44336', 
                  borderColor: '#F44336',
                  '&:hover': { borderColor: '#e53935', bgcolor: 'rgba(244, 67, 54, 0.04)' }
                }}
                onClick={() => handleHistoryClick('sick')}
              >
                History
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Work From Home Card */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={1}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(135deg, transparent 50%, rgba(33, 150, 243, 0.1) 50%)',
                zIndex: 0
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                sx={{ 
                  display: 'flex',
                  p: 1,
                  mr: 1.5,
                  color: '#2196F3',
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                  borderRadius: '50%'
                }}
              >
                <Home />
              </Box>
              <Typography variant="subtitle1" fontWeight="medium">
                Work From Home
              </Typography>
            </Box>

            <Typography variant="h3" color="#2196F3" fontWeight="bold" mb={0.5}>
              12 <Typography component="span" variant="body2" color="text.secondary">Days</Typography>
            </Typography>
            
            <Typography variant="body2" color="text.secondary" mb={3}>
              Available work from home days
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                size="small" 
                sx={{ 
                  bgcolor: '#2196F3', 
                  '&:hover': { bgcolor: '#1e88e5' }
                }}
              >
                Request
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  color: '#2196F3', 
                  borderColor: '#2196F3',
                  '&:hover': { borderColor: '#1e88e5', bgcolor: 'rgba(33, 150, 243, 0.04)' }
                }}
                onClick={() => handleHistoryClick('wfh')}
              >
                History
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimeOffCards;