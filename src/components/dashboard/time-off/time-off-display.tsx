// TimeOffDisplay.tsx
import React, { useState } from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import { TimeOffBalance } from './time-off-balance';
// Make sure this path matches your actual file name and location
import { TimeOffHistory } from './time-off-history';
import { BeachAccess, SickOutlined, Home } from '@mui/icons-material';

type ViewState = 'dashboard' | 'vacation-history' | 'sick-history' | 'wfh-history';

const TimeOffDisplay: React.FC = () => {
  // Debug state - add this to verify state changes
  const [view, setView] = useState<ViewState>('dashboard');
  console.log('Current view:', view); // This helps track state changes

  const handleViewHistory = (type: 'vacation' | 'sick' | 'wfh') => {
    console.log(`Viewing history for: ${type}`); // Debug logging
    switch (type) {
      case 'vacation':
        setView('vacation-history');
        break;
      case 'sick':
        setView('sick-history');
        break;
      case 'wfh':
        setView('wfh-history');
        break;
    }
  };

  const handleBack = () => {
    console.log('Going back to dashboard'); // Debug logging
    setView('dashboard');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {view === 'dashboard' ? (
        <>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
            Your Time Off Balances
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TimeOffBalance
                title="Annual Leave"
                days={16}
                description="Available vacation days"
                icon={<BeachAccess />}
                color="#4CAF50"
                onRequest={() => console.log('Request annual leave')}
                onView={() => handleViewHistory('vacation')}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TimeOffBalance
                title="Sick Leave"
                days={8}
                description="Available sick leave days"
                icon={<SickOutlined />}
                color="#F44336"
                onRequest={() => console.log('Request sick leave')}
                onView={() => handleViewHistory('sick')}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TimeOffBalance
                title="Work From Home"
                days={12}
                description="Available work from home days"
                icon={<Home />}
                color="#2196F3"
                onRequest={() => console.log('Request work from home')}
                onView={() => handleViewHistory('wfh')}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Box>
          {view === 'vacation-history' && (
            <TimeOffHistory type="vacation" onBack={handleBack} />
          )}
          {view === 'sick-history' && (
            <TimeOffHistory type="sick" onBack={handleBack} />
          )}
          {view === 'wfh-history' && (
            <TimeOffHistory type="wfh" onBack={handleBack} />
          )}
        </Box>
      )}
    </Container>
  );
};

export default TimeOffDisplay;