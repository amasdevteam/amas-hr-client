// UpcomingTimeOff.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Chip,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  EventNote, 
  EventAvailable, 
  Edit, 
  Delete, 
  BeachAccess, 
  NoMeetingRoom, 
  HomeWork,
  Celebration
} from '@mui/icons-material';

interface TimeOffEvent {
  id: string;
  date: string;
  endDate?: string;
  title: string;
  type: 'vacation' | 'sick' | 'wfh' | 'holiday';
  status: 'approved' | 'pending' | 'rejected';
}

interface UpcomingTimeOffProps {
  events: TimeOffEvent[];
  onEdit?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export const UpcomingTimeOff: React.FC<UpcomingTimeOffProps> = ({
  events,
  onEdit,
  onCancel,
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vacation':
        return <BeachAccess color="success" />;
      case 'sick':
        return <NoMeetingRoom color="error" />;
      case 'wfh':
        return <HomeWork color="primary" />;
      case 'holiday':
        return <Celebration color="secondary" />;
      default:
        return <EventNote />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDateRange = (startDate: string, endDate?: string) => {
    if (!endDate || startDate === endDate) {
      return new Date(startDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.getMonth() === end.getMonth()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.getDate()}`;
    }
    
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ p: 2, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center' }}>
        <EventAvailable sx={{ mr: 1.5, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight="medium">
          Upcoming Time Off
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {events.length === 0 ? (
          <ListItem>
            <ListItemText 
              primary="No upcoming time off" 
              secondary="Your schedule is clear for now" 
              primaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
        ) : (
          events.map((event, index) => (
            <React.Fragment key={event.id}>
              {index > 0 && <Divider />}
              <ListItem
                secondaryAction={
                  event.status !== 'approved' || event.type !== 'holiday' ? (
                    <Box>
                      {onEdit && (
                        <Tooltip title="Edit">
                          <IconButton
                            edge="end"
                            size="small"
                            onClick={() => onEdit(event.id)}
                            sx={{ mr: 1 }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onCancel && (
                        <Tooltip title="Cancel">
                          <IconButton
                            edge="end"
                            size="small"
                            onClick={() => onCancel(event.id)}
                            color="error"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  ) : null
                }
                sx={{
                  py: 2,
                  px: 3,
                  transition: 'background-color 0.2s',
                  '&:hover': { backgroundColor: '#f9f9f9' },
                }}
              >
                <ListItemIcon>{getTypeIcon(event.type)}</ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" fontWeight="medium">
                        {event.title}
                      </Typography>
                      <Chip
                        label={event.status}
                        size="small"
                        color={getStatusColor(event.status) as any}
                        sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {formatDateRange(event.date, event.endDate)}
                    </Typography>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))
        )}
      </List>
    </Paper>
  );
};