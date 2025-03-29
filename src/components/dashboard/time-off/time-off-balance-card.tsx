// TimeOffBalanceCard.tsx
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import {
  BeachAccess as VacationIcon,
  SickOutlined as SickIcon,
  Home as HomeIcon
} from '@mui/icons-material';

interface TimeOffBalanceCardProps {
  type: 'annual' | 'sick' | 'wfh';
  days: number;
  lastAction: string;
  title: string;
  subtitle?: string;
  color?: string;
}

export const TimeOffBalanceCard: React.FC<TimeOffBalanceCardProps> = ({
  type,
  days,
  lastAction
}) => {
  const theme = useTheme();
  
  const getTypeDetails = () => {
    switch (type) {
      case 'annual':
        return {
          title: 'Annual Leave',
          color: theme.palette.success.main,
          icon: <VacationIcon sx={{ color: theme.palette.success.main }} />
        };
      case 'sick':
        return {
          title: 'Sick Leave',
          color: theme.palette.error.main,
          icon: <SickIcon sx={{ color: theme.palette.error.main }} />
        };
      case 'wfh':
        return {
          title: 'Work From Home',
          color: theme.palette.primary.main,
          icon: <HomeIcon sx={{ color: theme.palette.primary.main }} />
        };
      default:
        return {
          title: 'Time Off',
          color: theme.palette.grey[500],
          icon: null
        };
    }
  };
  
  const { title, color, icon } = getTypeDetails();
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h6" fontWeight="medium">
            {title}
          </Typography>
          <Typography variant="h3" fontWeight="bold" sx={{ color, my: 1 }}>
            {days} <Typography component="span" variant="body2" color="text.secondary">Days</Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lastAction}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            display: 'flex',
            p: 1,
            color: color,
            backgroundColor: `${color}15`,
            borderRadius: '50%'
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  );
};