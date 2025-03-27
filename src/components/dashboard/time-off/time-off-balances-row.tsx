// TimeOffBalancesRow.tsx
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { BeachAccess, NoMeetingRoom, HomeWork } from '@mui/icons-material';
import { TimeOffBalance } from './time-off-balance';

interface TimeOffBalancesRowProps {
  balances: {
    vacation: number;
    sick: number;
    workFromHome: number;
  };
}

export const TimeOffBalancesRow: React.FC<TimeOffBalancesRowProps> = ({ balances }) => {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5" fontWeight="medium" sx={{ mb: 3 }}>
        Your Time Off Balances
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TimeOffBalance
            title="Annual Leave"
            days={balances.vacation}
            description="Available vacation days"
            icon={<BeachAccess />}
            color="#2e7d32"
            onRequest={() => console.log('Request vacation')}
            onView={() => console.log('View vacation history')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TimeOffBalance
            title="Sick Leave"
            days={balances.sick}
            description="Available sick leave days"
            icon={<NoMeetingRoom />}
            color="#d32f2f"
            onRequest={() => console.log('Request sick leave')}
            onView={() => console.log('View sick leave history')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TimeOffBalance
            title="Work From Home"
            days={balances.workFromHome}
            description="Available work from home days"
            icon={<HomeWork />}
            color="#1976d2"
            onRequest={() => console.log('Request work from home')}
            onView={() => console.log('View work from home history')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};