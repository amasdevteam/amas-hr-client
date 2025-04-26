import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  useTheme,
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
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vacation':
        return theme.palette.success.main;
      case 'sick':
        return theme.palette.error.main;
      case 'wfh':
        return theme.palette.primary.main;
      case 'holiday':
        return theme.palette.secondary.main;
      case 'meeting':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return undefined;
    switch (status) {
      case 'approved': return theme.palette.success.main;
      case 'pending': return theme.palette.warning.main;
      case 'rejected': return theme.palette.error.main;
      default: return undefined;
    }
  };

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const today = () => setCurrentDate(new Date());

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

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ height: 100 }} />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      const dayEvents = getEventsForDay(day);

      days.push(
        <Box
          key={day}
          onClick={() => onDayClick?.(date)}
          sx={{
            height: 100,
            p: 1,
            border: '1px solid #e0e0e0',
            backgroundColor: isToday ? `${theme.palette.primary.light}15` : 'white',
            position: 'relative',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', cursor: 'pointer' },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: isToday ? 'bold' : 'normal',
              color: isToday ? theme.palette.primary.main : 'text.primary',
              width: 24,
              height: 24,
              textAlign: 'center',
              lineHeight: '24px',
              borderRadius: '50%',
              backgroundColor: isToday ? `${theme.palette.primary.light}25` : 'transparent',
              display: 'inline-block',
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
                    onEventClick?.(event);
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: `${getTypeColor(event.type)}15`,
                    color: getTypeColor(event.type),
                    borderLeft: `3px solid ${getTypeColor(event.type)}`,
                    borderRadius: '2px',
                    p: '2px 4px',
                    fontSize: '0.75rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: `${getTypeColor(event.type)}25`,
                    },
                  }}
                >
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{ flexGrow: 1, fontSize: '0.7rem' }}
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
    <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Event sx={{ mr: 1.5, color: theme.palette.primary.main }} />
          <Typography variant="h6" fontWeight="medium">
            Time Off Calendar
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ mx: 2 }}>
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Typography>
          <IconButton size="small" onClick={prevMonth}><ChevronLeft /></IconButton>
          <IconButton size="small" onClick={today}><Today /></IconButton>
          <IconButton size="small" onClick={nextMonth}><ChevronRight /></IconButton>
        </Box>
      </Box>

      {/* Days */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            textAlign: 'center',
            mb: 1,
          }}
        >
          {weekDays.map((day) => (
            <Typography
              key={day}
              variant="subtitle2"
              sx={{
                py: 1,
                fontWeight: 'medium',
                color: day === 'Sun' || day === 'Sat' ? 'text.secondary' : 'text.primary',
              }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 0.5,
          }}
        >
          {renderDays()}
        </Box>
      </Box>

      {/* Legend */}
      <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1, borderTop: '1px solid #e0e0e0' }}>
        {['vacation', 'sick', 'wfh', 'holiday'].map((type) => (
          <Chip
            key={type}
            size="small"
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            sx={{
              backgroundColor: `${getTypeColor(type)}15`,
              color: getTypeColor(type),
              '& .MuiChip-label': { px: 1 },
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};
