// UpcomingTimeOffList.tsx
import React from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material';
import {
  EventOutlined,
  CheckCircleOutline,
  PendingOutlined
} from '@mui/icons-material';

interface TimeOffEvent {
  id: string;
  date: string;
  endDate?: string;
  title: string;
  status: 'approved' | 'pending' | 'rejected';
}

interface UpcomingTimeOffListProps {
  events: TimeOffEvent[];
}

export const UpcomingTimeOffList: React.FC<UpcomingTimeOffListProps> = ({ events }) => {
  const theme = useTheme();
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleOutline sx={{ color: theme.palette.success.main }} />;
      case 'pending':
        return <PendingOutlined sx={{ color: theme.palette.warning.main }} />;
      default:
        return <EventOutlined />;
    }
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}
    >
      <List disablePadding>
        {events.map((event) => (
          <ListItem
            key={event.id}
            sx={{
              py: 1.5,
              borderBottom: `1px solid ${theme.palette.divider}`,
              '&:last-child': {
                borderBottom: 'none'
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {getStatusIcon(event.status)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" fontWeight="medium">
                    {event.title}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};