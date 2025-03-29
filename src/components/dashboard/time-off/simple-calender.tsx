// SimpleCalendar.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  IconButton,
  useTheme
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';

export const SimpleCalendar: React.FC = () => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  // Generate calendar grid
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Box key={`empty-${i}`} />);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === today.toDateString();
      
      days.push(
        <Grid item key={day}>
          <Box
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              cursor: 'pointer',
              bgcolor: isToday ? theme.palette.primary.main : 'transparent',
              color: isToday ? 'white' : 'inherit',
              '&:hover': {
                bgcolor: isToday ? theme.palette.primary.dark : theme.palette.action.hover
              }
            }}
          >
            <Typography variant="body2">
              {day}
            </Typography>
          </Box>
        </Grid>
      );
    }
    
    return days;
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <IconButton size="small" onClick={prevMonth}>
          <ChevronLeft />
        </IconButton>
        
        <Typography variant="h6" fontWeight="medium">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Typography>
        
        <IconButton size="small" onClick={nextMonth}>
          <ChevronRight />
        </IconButton>
      </Box>
      
      <Grid container spacing={1} columns={7}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <Grid item key={day}>
            <Typography 
              variant="caption" 
              align="center" 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                fontWeight: 'medium',
                color: 'text.secondary' 
              }}
            >
              {day}
            </Typography>
          </Grid>
        ))}
        
        {renderCalendarDays().map((day, index) => (
          <Grid item key={index}>
            {day}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};