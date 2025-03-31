// TimeOffContent.tsx
import React, { useState } from 'react';
import { Box, Paper, Tabs, Tab } from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';
// import { TimeOffBalancesRow } from './time-off-balances-row';
import { UpcomingTimeOff } from './upcoming-time-off';
import { TimeOffCalendar } from './time-off-calender';

// Sample data
const sampleBalances = {
  vacation: 16,
  sick: 8,
  workFromHome: 12,
};

const sampleUpcomingEvents = [
  {
    id: '1',
    date: '2025-03-31',
    title: 'Eid El-Fitr',
    type: 'holiday' as 'holiday',
    status: 'approved' as 'approved',
  },
  {
    id: '2',
    date: '2025-04-07',
    endDate: '2025-04-07',
    title: 'Sheikh Abeid Karume Day',
    type: 'holiday',
    status: 'approved',
  },
  {
    id: '3',
    date: '2025-04-18',
    endDate: '2025-04-18',
    title: 'Good Friday',
    type: 'holiday',
    status: 'approved',
  },
  {
    id: '4',
    date: '2025-05-01',
    endDate: '2025-05-05',
    title: 'Family Vacation',
    type: 'vacation' as 'vacation',
    status: 'pending' as 'pending',
  },
];

const calendarEvents = [
  ...sampleUpcomingEvents,
  {
    id: '5',
    date: '2025-04-12',
    title: 'Team Building Day',
    type: 'meeting',
  },
  {
    id: '6',
    date: '2025-04-15',
    title: 'Quarterly Review',
    type: 'meeting',
  },
];

interface TimeOffContentProps {
  onViewHistory?: (type: 'vacation' | 'sick' | 'wfh') => void;
  onRequest?: () => void;
}

const TimeOffContent: React.FC<TimeOffContentProps> = ({ 
  onViewHistory,
  onRequest
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEditEvent = (id: string) => {
    console.log('Edit event:', id);
    // Implement edit functionality
  };

  const handleCancelEvent = (id: string) => {
    console.log('Cancel event:', id);
    // Implement cancel functionality
  };

  return (
    <>
      {/* <TimeOffBalancesRow 
        balances={sampleBalances}
        onViewHistory={onViewHistory}
        onRequest={onRequest}
      /> */}

      <Paper sx={{ mb: 4, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        >
          <Tab label="Upcoming" icon={<EventIcon />} iconPosition="start" />
          <Tab label="Calendar" />
        </Tabs>
        
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
          {activeTab === 0 && (
            <UpcomingTimeOff 
              events={sampleUpcomingEvents} 
              onEdit={handleEditEvent}
              onCancel={handleCancelEvent}
            />
          )}
          
          {activeTab === 1 && (
            <TimeOffCalendar 
              events={calendarEvents}
              onDayClick={(date) => console.log('Clicked day:', date)}
              onEventClick={(event) => console.log('Clicked event:', event)}
            />
          )}
        </Box>
      </Paper>
    </>
  );
};

export default TimeOffContent;