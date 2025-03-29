// pages/time-off/index.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Tab, 
  Tabs, 
  Paper,
  Dialog,
  DialogContent 
} from '@mui/material';
import { Add as AddIcon, Event as EventIcon } from '@mui/icons-material';

// Import the components
import { TimeOffBalancesRow } from '../../../components/dashboard/time-off/time-off-balances-row';
import { TimeOffLayout } from '../../../components/dashboard/time-off/time-off-layout';
import { UpcomingTimeOff } from '../../../components/dashboard/time-off/upcoming-time-off';
import { RequestTimeOffForm } from '../../../components/dashboard/time-off/request-time-off-form';
import { TimeOffCalendar } from '../../../components/dashboard/time-off/time-off-calender';
import TimeOffHistory from '../../../components/dashboard/time-off/time-off-history';
import { TeamAbsences } from '../../../components/dashboard/time-off/team-absences';

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

type ViewState = 'dashboard' | 'history' | 'request-form';
type HistoryType = 'vacation' | 'sick' | 'wfh';

// Updated way to use the layout in index.tsx
export function Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [viewState, setViewState] = useState<ViewState>('dashboard');
  const [historyType, setHistoryType] = useState<HistoryType>('vacation');
  const [teamAbsencesOpen, setTeamAbsencesOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleRequestTimeOff = () => {
    setViewState('request-form');
  };

  const handleViewTeamAbsences = () => {
    setTeamAbsencesOpen(true);
  };

  const handleCloseTeamAbsences = () => {
    setTeamAbsencesOpen(false);
  };

  const handleRequestSubmit = (data: any) => {
    console.log('Submitted request:', data);
    setViewState('dashboard');
  };

  const handleRequestCancel = () => {
    setViewState('dashboard');
  };

  const handleViewHistory = (type: 'vacation' | 'sick' | 'wfh') => {
    setHistoryType(type);
    setViewState('history');
  };

  const handleBackFromHistory = () => {
    setViewState('dashboard');
  };

  const getTitle = () => {
    if (viewState === 'history') {
      return historyType === 'vacation' 
        ? 'Annual Leave History'
        : historyType === 'sick'
          ? 'Sick Leave History'
          : 'Work From Home History';
    }
    if (viewState === 'request-form') {
      return 'Request Time Off';
    }
    return 'Time Off';
  };

  return (
    <>
      <TimeOffLayout 
        title={getTitle()}
        onRequestTimeOff={handleRequestTimeOff}
        onViewTeamAbsences={handleViewTeamAbsences}
        showRequestButton={viewState === 'dashboard'}
      >
        {viewState === 'request-form' && (
          <RequestTimeOffForm
            onSubmit={handleRequestSubmit}
            onCancel={handleRequestCancel}
          />
        )}

        {viewState === 'history' && (
          <TimeOffHistory
            type={historyType}
            onBack={handleBackFromHistory}
          />
        )}

        {viewState === 'dashboard' && (
          <>
            <TimeOffBalancesRow 
              balances={sampleBalances} 
              onViewHistory={handleViewHistory}
              onRequest={handleRequestTimeOff}
            />

            <Paper 
              elevation={0} 
              sx={{ 
                mb: 4, 
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                overflow: 'hidden'
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ 
                  borderBottom: '1px solid #e0e0e0',
                  '& .MuiTab-root': {
                    py: 1.5
                  }
                }}
              >
                <Tab label="Upcoming" icon={<EventIcon />} iconPosition="start" />
                <Tab label="Calendar" />
              </Tabs>
              
              <Box sx={{ p: { xs: 1, sm: 2 } }}>
                {activeTab === 0 && (
                  <UpcomingTimeOff 
                    events={sampleUpcomingEvents} 
                    onEdit={(id) => console.log('Edit event:', id)}
                    onCancel={(id) => console.log('Cancel event:', id)}
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
        )}
      </TimeOffLayout>

      {/* Team Absences Dialog */}
      <Dialog 
        open={teamAbsencesOpen} 
        onClose={handleCloseTeamAbsences}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <TeamAbsences onClose={handleCloseTeamAbsences} />
        </DialogContent>
      </Dialog>
    </>
  );
}