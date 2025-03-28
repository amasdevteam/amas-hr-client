import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button,
  ButtonGroup
} from '@mui/material';
import { 
  BeachAccess as VacationIcon, 
  SickOutlined as SickIcon, 
  Home as HomeIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

interface TimeOffBalancesRowProps {
  balances: {
    vacation: number;
    sick: number;
    workFromHome: number;
  };
  onViewHistory?: (type: 'vacation' | 'sick' | 'wfh') => void;
  onRequest?: () => void;
}

export const TimeOffBalancesRow: React.FC<TimeOffBalancesRowProps> = ({ 
  balances, 
  onViewHistory,
  onRequest 
}) => {
  const handleRequest = () => {
    if (onRequest) {
      console.log('Request button clicked');
      onRequest();
    }
  };

  const handleViewHistory = (type: 'vacation' | 'sick' | 'wfh') => {
    if (onViewHistory) {
      console.log(`History button clicked for ${type}`);
      onViewHistory(type);
    }
  };

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Vacation Card */}
      <Grid item xs={12} md={4}>
        <Paper
          elevation={0}
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
              width: '40%',
              height: '100%',
              background: 'linear-gradient(135deg, transparent 50%, rgba(76, 175, 80, 0.1) 50%)',
              zIndex: 0,
            },
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
                borderRadius: '50%',
              }}
            >
              <VacationIcon />
            </Box>
            <Typography variant="subtitle1" fontWeight="medium">
              Annual Leave
            </Typography>
          </Box>

          <Typography
            variant="h3"
            color="#4CAF50"
            fontWeight="bold"
            mb={0.5}
            sx={{ display: 'flex', alignItems: 'flex-end' }}
          >
            {balances.vacation}
            <Typography component="span" variant="body2" color="text.secondary" ml={1} mb={1}>
              Days
            </Typography>
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Available vacation days
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<CalendarIcon />}
              onClick={handleRequest}
              sx={{
                bgcolor: '#4CAF50',
                '&:hover': { bgcolor: '#43a047' },
              }}
            >
              Request
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleViewHistory('vacation')}
              sx={{
                color: '#4CAF50',
                borderColor: '#4CAF50',
                '&:hover': { borderColor: '#43a047' },
              }}
            >
              History
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Sick Leave Card */}
      <Grid item xs={12} md={4}>
        <Paper
          elevation={0}
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
              width: '40%',
              height: '100%',
              background: 'linear-gradient(135deg, transparent 50%, rgba(244, 67, 54, 0.1) 50%)',
              zIndex: 0,
            },
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
                borderRadius: '50%',
              }}
            >
              <SickIcon />
            </Box>
            <Typography variant="subtitle1" fontWeight="medium">
              Sick Leave
            </Typography>
          </Box>

          <Typography
            variant="h3"
            color="#F44336"
            fontWeight="bold"
            mb={0.5}
            sx={{ display: 'flex', alignItems: 'flex-end' }}
          >
            {balances.sick}
            <Typography component="span" variant="body2" color="text.secondary" ml={1} mb={1}>
              Days
            </Typography>
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Available sick leave days
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<CalendarIcon />}
              onClick={handleRequest}
              sx={{
                bgcolor: '#F44336',
                '&:hover': { bgcolor: '#E53935' },
              }}
            >
              Request
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleViewHistory('sick')}
              sx={{
                color: '#F44336',
                borderColor: '#F44336',
                '&:hover': { borderColor: '#E53935' },
              }}
            >
              History
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Work From Home Card */}
      <Grid item xs={12} md={4}>
        <Paper
          elevation={0}
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
              width: '40%',
              height: '100%',
              background: 'linear-gradient(135deg, transparent 50%, rgba(33, 150, 243, 0.1) 50%)',
              zIndex: 0,
            },
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
                borderRadius: '50%',
              }}
            >
              <HomeIcon />
            </Box>
            <Typography variant="subtitle1" fontWeight="medium">
              Work From Home
            </Typography>
          </Box>

          <Typography
            variant="h3"
            color="#2196F3"
            fontWeight="bold"
            mb={0.5}
            sx={{ display: 'flex', alignItems: 'flex-end' }}
          >
            {balances.workFromHome}
            <Typography component="span" variant="body2" color="text.secondary" ml={1} mb={1}>
              Days
            </Typography>
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Available work from home days
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<CalendarIcon />}
              onClick={handleRequest}
              sx={{
                bgcolor: '#2196F3',
                '&:hover': { bgcolor: '#1E88E5' },
              }}
            >
              Request
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleViewHistory('wfh')}
              sx={{
                color: '#2196F3',
                borderColor: '#2196F3',
                '&:hover': { borderColor: '#1E88E5' },
              }}
            >
              History
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};