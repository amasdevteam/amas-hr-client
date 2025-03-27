// TimeOffBalance.tsx
import React from 'react';
import { Box, Typography, Paper, CircularProgress, Button, Tooltip } from '@mui/material';
import { Event, DateRange } from '@mui/icons-material';

interface TimeOffBalanceProps {
  title: string;
  days: number;
  description: string;
  icon: React.ReactNode;
  color: string;
  onRequest?: () => void;
  onView?: () => void;
}

export const TimeOffBalance: React.FC<TimeOffBalanceProps> = ({
  title,
  days,
  description,
  icon,
  color,
  onRequest,
  onView,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 180,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          background: `linear-gradient(135deg, transparent 50%, ${color}20 50%)`,
        }}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${color}15`,
            color: color,
            borderRadius: '50%',
            p: 1,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" fontWeight="medium">{title}</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="h3" fontWeight="bold" color={color}>
          {days}
        </Typography>
        <Typography variant="body1" color="text.secondary" ml={1}>
          Days
        </Typography>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 'auto' }}>
        {description}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        {onRequest && (
          <Button
            variant="contained"
            size="small"
            startIcon={<Event />}
            sx={{ backgroundColor: color, '&:hover': { backgroundColor: color } }}
            onClick={onRequest}
          >
            Request
          </Button>
        )}
        {onView && (
          <Button
            variant="outlined"
            size="small"
            sx={{ color: color, borderColor: color }}
            onClick={onView}
          >
            History
          </Button>
        )}
      </Box>
    </Paper>
  );
};