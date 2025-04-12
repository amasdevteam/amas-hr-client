// UpcomingTimeOff.tsx - Updated version with modern styling
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
  Tooltip,
  useTheme
} from '@mui/material';
import { PaletteColor } from '@mui/material/styles';
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
  const theme = useTheme();
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vacation':
        return <BeachAccess sx={{ color: theme.palette.success.main }} />;
      case 'sick':
        return <NoMeetingRoom sx={{ color: theme.palette.error.main }} />;
      case 'wfh':
        return <HomeWork sx={{ color: theme.palette.primary.main }} />;
      case 'holiday':
        return <Celebration sx={{ color: theme.palette.secondary.main }} />;
      default:
        return <EventNote />;
    }
  };

  const getStatusColor = (status: string): PaletteColor => {
    switch (status) {
      case 'approved':
        return theme.palette.success;
      case 'pending':
        return theme.palette.warning;
      case 'rejected':
        return theme.palette.error;
      default:
        return theme.palette.grey as unknown as PaletteColor;
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
    <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ p: 2, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center' }}>
        <EventAvailable sx={{ mr: 1.5, color: theme.palette.primary.main }} />
        <Typography variant="h6" fontWeight="medium">
          Heads-Up: Time Off
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
                        sx={{ 
                          ml: 1, 
                          height: 20, 
                          fontSize: '0.7rem',
                          bgcolor: `${getStatusColor(event.status).light}20`,
                          color: getStatusColor(event.status).main
                        }}
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