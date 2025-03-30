// TeamAbsences.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  AvatarGroup,
  Chip,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import {
  Today as TodayIcon,
  DateRange as DateRangeIcon,
  NavigateBefore,
  NavigateNext,
  BeachAccess as VacationIcon,
  SickOutlined as SickIcon,
  Home as HomeIcon
} from '@mui/icons-material';

interface TeamMember {
  id: string;
  name: string;
  avatarUrl?: string;
  department?: string;
  absence: {
    type: 'vacation' | 'sick' | 'wfh';
    startDate: string;
    endDate?: string;
    status: 'approved' | 'pending';
  };
}

// Sample data
const sampleTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    department: 'Marketing',
    absence: {
      type: 'vacation',
      startDate: '2025-04-03',
      endDate: '2025-04-10',
      status: 'approved'
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    department: 'Engineering',
    absence: {
      type: 'wfh',
      startDate: '2025-04-01',
      endDate: '2025-04-15',
      status: 'approved'
    }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    department: 'Design',
    absence: {
      type: 'sick',
      startDate: '2025-04-05',
      status: 'approved'
    }
  },
  {
    id: '4',
    name: 'David Kim',
    department: 'Finance',
    absence: {
      type: 'vacation',
      startDate: '2025-04-20',
      endDate: '2025-04-27',
      status: 'pending'
    }
  },
  {
    id: '5',
    name: 'Jennifer Lee',
    department: 'HR',
    absence: {
      type: 'wfh',
      startDate: '2025-04-07',
      endDate: '2025-04-11',
      status: 'approved'
    }
  }
];

// Helper to get today's date for filtering
const today = new Date();
const todayFormatted = today.toISOString().split('T')[0];

// Helper to get this week's date range
const getThisWeekDates = () => {
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
  
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // End of week (Saturday)
  
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0]
  };
};

const thisWeek = getThisWeekDates();

interface TeamAbsencesProps {
  onClose?: () => void;
}

export const TeamAbsences: React.FC<TeamAbsencesProps> = ({ onClose }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  const getAbsenceTypeIcon = (type: string) => {
    switch (type) {
      case 'vacation':
        return <VacationIcon sx={{ color: theme.palette.success.main }} />;
      case 'sick':
        return <SickIcon sx={{ color: theme.palette.error.main }} />;
      case 'wfh':
        return <HomeIcon sx={{ color: theme.palette.primary.main }} />;
      default:
        return null;
    }
  };
  
  const getAbsenceTypeColor = (type: string) => {
    switch (type) {
      case 'vacation':
        return theme.palette.success.main;
      case 'sick':
        return theme.palette.error.main;
      case 'wfh':
        return theme.palette.primary.main;
      default:
        return theme.palette.grey[500];
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
  
  const getFilteredMembers = () => {
    if (activeTab === 0) { // Today
      return sampleTeamMembers.filter(member => {
        const startDate = member.absence.startDate;
        const endDate = member.absence.endDate || member.absence.startDate;
        return startDate <= todayFormatted && endDate >= todayFormatted;
      });
    } else if (activeTab === 1) { // This Week
      return sampleTeamMembers.filter(member => {
        const startDate = member.absence.startDate;
        const endDate = member.absence.endDate || member.absence.startDate;
        return (startDate <= thisWeek.end && endDate >= thisWeek.start);
      });
    } else { // All
      return sampleTeamMembers;
    }
  };
  
  const filteredMembers = getFilteredMembers();
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      }}
    >
      {/* Header with title */}
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: theme.palette.primary.main, 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TeamIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" fontWeight="medium">
            Out of Office
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small" onClick={prevMonth} sx={{ color: 'white' }}>
            <NavigateBefore />
          </IconButton>
          <Typography variant="subtitle1" sx={{ mx: 1 }}>
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Typography>
          <IconButton size="small" onClick={nextMonth} sx={{ color: 'white' }}>
            <NavigateNext />
          </IconButton>
        </Box>
      </Box>
      
      {/* Team members out summary */}
      <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {activeTab === 0 ? 'Out Today' : activeTab === 1 ? 'Out This Week' : 'All Planned Absences'}
          </Typography>
          <AvatarGroup max={5} sx={{ '& .MuiAvatar-root': { width: 30, height: 30, fontSize: '0.875rem' } }}>
            {filteredMembers.map(member => (
              <Avatar key={member.id} alt={member.name} src={member.avatarUrl}>
                {member.name.charAt(0)}
              </Avatar>
            ))}
          </AvatarGroup>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            label={`Vacation (${filteredMembers.filter(m => m.absence.type === 'vacation').length})`} 
            size="small" 
            icon={<VacationIcon />}
            sx={{ 
              bgcolor: alpha(theme.palette.success.main, 0.1), 
              color: theme.palette.success.main 
            }} 
          />
          <Chip 
            label={`Sick (${filteredMembers.filter(m => m.absence.type === 'sick').length})`} 
            size="small" 
            icon={<SickIcon />}
            sx={{ 
              bgcolor: alpha(theme.palette.error.main, 0.1), 
              color: theme.palette.error.main 
            }} 
          />
          <Chip 
            label={`WFH (${filteredMembers.filter(m => m.absence.type === 'wfh').length})`} 
            size="small" 
            icon={<HomeIcon />}
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1), 
              color: theme.palette.primary.main 
            }} 
          />
        </Box>
      </Box>
      
      <Divider />
      
      {/* Tabs for filtering */}
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        <Tab 
          icon={<TodayIcon fontSize="small" />} 
          label="Today" 
          iconPosition="start"
          sx={{ 
            minHeight: 48,
            fontSize: '0.875rem',
            textTransform: 'none'
          }}
        />
        <Tab 
          icon={<DateRangeIcon fontSize="small" />} 
          label="This Week" 
          iconPosition="start"
          sx={{ 
            minHeight: 48,
            fontSize: '0.875rem',
            textTransform: 'none'
          }}
        />
        <Tab 
          label="All" 
          sx={{ 
            minHeight: 48,
            fontSize: '0.875rem',
            textTransform: 'none'
          }}
        />
      </Tabs>
      
      {/* Team members list */}
      <List sx={{ maxHeight: 350, overflow: 'auto' }}>
        {filteredMembers.length === 0 ? (
          <ListItem>
            <ListItemText 
              primary="No team members out" 
              secondary={activeTab === 0 ? "Everyone is in the office today" : activeTab === 1 ? "Everyone is in the office this week" : "No planned absences"}
              primaryTypographyProps={{ align: 'center' }}
              secondaryTypographyProps={{ align: 'center' }}
            />
          </ListItem>
        ) : (
          filteredMembers.map((member) => (
            <ListItem 
              key={member.id}
              divider
              sx={{ 
                py: 1.5,
                '&:hover': { bgcolor: alpha(getAbsenceTypeColor(member.absence.type), 0.05) }
              }}
            >
              <ListItemAvatar>
                <Avatar alt={member.name} src={member.avatarUrl}>
                  {member.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight="medium">
                      {member.name}
                    </Typography>
                    {member.department && (
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        {member.department}
                      </Typography>
                    )}
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    {getAbsenceTypeIcon(member.absence.type)}
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ ml: 0.5 }}
                    >
                      {formatDateRange(member.absence.startDate, member.absence.endDate)}
                    </Typography>
                    {member.absence.status === 'pending' && (
                      <Chip
                        label="Pending"
                        size="small"
                        sx={{ 
                          ml: 1, 
                          height: 18, 
                          fontSize: '0.65rem',
                          bgcolor: alpha(theme.palette.warning.main, 0.1),
                          color: theme.palette.warning.main
                        }}
                      />
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

// Import for the icon used in the component
import { PeopleAlt as TeamIcon } from '@mui/icons-material';