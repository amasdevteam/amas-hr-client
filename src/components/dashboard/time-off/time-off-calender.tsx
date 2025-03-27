// TimeOffCalendar.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Badge,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Today,
  MoreHoriz,
  Event,
} from '@mui/icons-material';

interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: 'vacation' | 'sick' | 'wfh' | 'holiday' | 'meeting';
  status?: 'approved' | 'pending' | 'rejected';
}

interface TimeOffCalendarProps {
  events: CalendarEvent[];
  onDayClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

export const TimeOffCalendar: React.FC<TimeOffCalendarProps> = ({
  events,
  onDayClick,
  onEventClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vacation':
        return '#2e7d32';
      case 'sick':
        return '#d32f2f';
      case 'wfh':
        return '#1976d2';
      case 'holiday':
        return '#9c27b0';
      case 'meeting':
        return '#ed6c02';
      default:
        return '#757575';
    }
  };
  
  const getStatusColor = (status?: string) => {
    if (!status) return undefined;
    
    switch (status) {
      case 'approved':
        return '#4caf50';
      case 'pending':
        return '#ff9800';
      case 'rejected':
        return '#f44336';
      default:
        return undefined;
    }
  };

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const endOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const today = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDayOfMonth = startOfMonth(currentDate).getDay();
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ height: 100 }} />);
    }
    
    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      const dayEvents = getEventsForDay(day);
      
      days.push(
        <Box
          key={day}
          onClick={() => onDayClick && onDayClick(date)}
          sx={{
            height: 100,
            p: 1,
            border: '1px solid #e0e0e0',
            position: 'relative',
            backgroundColor: isToday ? 'rgba(25, 118, 210, 0.05)' : 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              cursor: 'pointer',
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: isToday ? 'bold' : 'normal',
              color: isToday ? 'primary.main' : 'text.primary',
              display: 'inline-block',
              borderRadius: '50%',
              width: 24,
              height: 24,
              textAlign: 'center',
              lineHeight: '24px',
              backgroundColor: isToday ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
            }}
          >
            {day}
          </Typography>
          
          <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {dayEvents.slice(0, 2).map((event) => (
              <Tooltip key={event.id} title={event.title}>
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick && onEventClick(event);
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: `${getTypeColor(event.type)}20`,
                    color: getTypeColor(event.type),
                    borderLeft: `3px solid ${getTypeColor(event.type)}`,
                    borderRadius: '2px',
                    p: '2px 4px',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    '&:hover': {
                      backgroundColor: `${getTypeColor(event.type)}40`,
                    },
                  }}
                >
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{
                      flexGrow: 1,
                      fontSize: '0.7rem',
                    }}
                  >
                    {event.title}
                  </Typography>
                  
                  {event.status && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(event.status),
                        ml: 0.5,
                      }}
                    />
                  )}
                </Box>
              </Tooltip>
            ))}
            
            {dayEvents.length > 2 && (
              <Tooltip title={`${dayEvents.length - 2} more events`}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <MoreHoriz fontSize="inherit" sx={{ mr: 0.5 }} />
                  {dayEvents.length - 2} more
                </Typography>
              </Tooltip>
            )}
          </Box>
        </Box>
      );
    }
    
    return days;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Event sx={{ mr: 1.5, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight="medium">
            Time Off Calendar
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ mx: 2 }}>
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Typography>
          
          <Box>
            <IconButton size="small" onClick={prevMonth}>
              <ChevronLeft />
            </IconButton>
            <IconButton size="small" onClick={today}>
              <Today />
            </IconButton>
            <IconButton size="small" onClick={nextMonth}>
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ p: 2 }}>
        <Grid container>
          {weekDays.map((day) => (
            <Grid item xs={12 / 7} key={day}>
              <Typography
                variant="subtitle2"
                align="center"
                sx={{ 
                  fontWeight: 'medium',
                  py: 1,
                  color: day === 'Sun' || day === 'Sat' ? 'text.secondary' : 'text.primary',
                }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
          
          {renderDays().map((day, index) => (
            <Grid item xs={12 / 7} key={index}>
              {day}
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1, borderTop: '1px solid #e0e0e0' }}>
        <Chip 
          size="small" 
          label="Vacation" 
          sx={{ 
            backgroundColor: `${getTypeColor('vacation')}20`, 
            color: getTypeColor('vacation'),
            '& .MuiChip-label': { px: 1 }
          }} 
        />
        <Chip 
          size="small" 
          label="Sick Leave" 
          sx={{ 
            backgroundColor: `${getTypeColor('sick')}20`, 
            color: getTypeColor('sick'),
            '& .MuiChip-label': { px: 1 }
          }} 
        />
        <Chip 
          size="small" 
          label="Work From Home" 
          sx={{ 
            backgroundColor: `${getTypeColor('wfh')}20`, 
            color: getTypeColor('wfh'),
            '& .MuiChip-label': { px: 1 }
          }} 
        />
        <Chip 
          size="small" 
          label="Holiday" 
          sx={{ 
            backgroundColor: `${getTypeColor('holiday')}20`, 
            color: getTypeColor('holiday'),
            '& .MuiChip-label': { px: 1 }
          }} 
        />
      </Box>
    </Paper>
  );
};