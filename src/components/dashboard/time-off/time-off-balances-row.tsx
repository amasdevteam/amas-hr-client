// TimeOffBalancesRow.tsx - Keep your existing version with theme updates
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button,
  useTheme
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
  const theme = useTheme();
  
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
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '100%',
              background: `linear-gradient(135deg, transparent 50%, ${theme.palette.success.light}20 50%)`,
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
                color: theme.palette.success.main,
                backgroundColor: `${theme.palette.success.light}20`,
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
            color="success.main"
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
                bgcolor: theme.palette.success.main,
                '&:hover': { bgcolor: theme.palette.success.dark },
              }}
            >
              Request
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleViewHistory('vacation')}
              sx={{
                color: theme.palette.success.main,
                borderColor: theme.palette.success.main,
                '&:hover': { borderColor: theme.palette.success.dark },
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
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '100%',
              background: `linear-gradient(135deg, transparent 50%, ${theme.palette.error.light}20 50%)`,
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
                color: theme.palette.error.main,
                backgroundColor: `${theme.palette.error.light}20`,
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
            color="error.main"
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
                bgcolor: theme.palette.error.main,
                '&:hover': { bgcolor: theme.palette.error.dark },
              }}
            >
              Request
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleViewHistory('sick')}
              sx={{
                color: theme.palette.error.main,
                borderColor: theme.palette.error.main,
                '&:hover': { borderColor: theme.palette.error.dark },
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
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '100%',
              background: `linear-gradient(135deg, transparent 50%, ${theme.palette.primary.light}20 50%)`,
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
                color: theme.palette.primary.main,
                backgroundColor: `${theme.palette.primary.light}20`,
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
            color="primary.main"
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
                bgcolor: theme.palette.primary.main,
                '&:hover': { bgcolor: theme.palette.primary.dark },
              }}
            >
              Request
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleViewHistory('wfh')}
              sx={{
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                '&:hover': { borderColor: theme.palette.primary.dark },
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