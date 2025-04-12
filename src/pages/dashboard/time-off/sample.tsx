// // pages/time-off/index.tsx
// import React, { useState } from 'react';
// import { 
//   Box, 
//   Grid, 
//   Paper, 
//   Typography, 
//   Button, 
//   Container,
//   useTheme
// } from '@mui/material';
// import { Add as AddIcon, CheckCircleOutline, PendingOutlined } from '@mui/icons-material';
// // import { ProfileSection } from '../../../components/dashboard/time-off/profile-section';
// import { TimeOffBalanceCard } from '../../../components/dashboard/time-off/time-off-balance-card';
// import { SimpleCalendar } from '../../../components/dashboard/time-off/simple-calender';
// import { RequestTimeOffForm } from '../../../components/dashboard/time-off/request-time-off-form';
// import TimeOffHistory from '../../../components/dashboard/time-off/time-off-history';
// import { ProfileSidebar } from '@/components/dashboard/time-off/profile-sidebar';

// // Sample data
// const sampleUser = {
//   name: "Emmanuel Muro",
//   position: "Business Analyst",
//   joinDate: "Aug 1, 2022",
//   location: "Tanzania",
//   manager: "Edson Mollel"
// };

// const sampleBalances = {
//   vacation: { days: 16, lastAction: "Last Taken: Jan 12" },
//   sick: { days: 8, lastAction: "Last Used: Feb 2" },
//   workFromHome: { days: 12, lastAction: "Used: 3 YTD" }
// };

// const sampleUpcomingEvents = [
//   {
//     id: '1',
//     date: '2025-03-31',
//     title: 'Eid El-Fitr',
//     status: 'approved' as 'approved',
//   },
//   {
//     id: '2',
//     date: '2025-04-07',
//     title: 'Karume Day',
//     status: 'approved' as 'approved',
//   },
//   {
//     id: '3',
//     date: '2025-04-18',
//     title: 'Good Friday',
//     status: 'approved' as 'approved',
//   },
//   {
//     id: '4',
//     date: '2025-04-30',
//     endDate: '2025-05-04',
//     title: 'Family Vacation',
//     status: 'pending' as 'pending',
//   },
// ];

// type ViewState = 'dashboard' | 'history' | 'request-form';
// type HistoryType = 'vacation' | 'sick' | 'wfh';

// export function Page() {
//   const theme = useTheme();
//   const [viewState, setViewState] = useState<ViewState>('dashboard');
//   const [historyType, setHistoryType] = useState<HistoryType>('vacation');

//   const handleRequestTimeOff = () => {
//     setViewState('request-form');
//   };

//   const handleRequestSubmit = (data: any) => {
//     console.log('Submitted request:', data);
//     setViewState('dashboard');
//   };

//   const handleRequestCancel = () => {
//     setViewState('dashboard');
//   };

//   const handleViewHistory = (type: 'vacation' | 'sick' | 'wfh') => {
//     setHistoryType(type);
//     setViewState('history');
//   };

//   const handleBackFromHistory = () => {
//     setViewState('dashboard');
//   };

//   // Render content based on view state
//   if (viewState === 'request-form') {
//     return (
//       <Container maxWidth="lg" sx={{ py: 3 }}>
//         <Typography variant="h4" fontWeight="bold" mb={3}>
//           Request Time Off
//         </Typography>
//         <RequestTimeOffForm
//           onSubmit={handleRequestSubmit}
//           onCancel={handleRequestCancel}
//         />
//       </Container>
//     );
//   }

//   if (viewState === 'history') {
//     return (
//       <Container maxWidth="lg" sx={{ py: 3 }}>
//         <Typography variant="h4" fontWeight="bold" mb={3}>
//           {historyType === 'vacation' 
//             ? 'Annual Leave History'
//             : historyType === 'sick'
//               ? 'Sick Leave History'
//               : 'Work From Home History'}
//         </Typography>
//         <TimeOffHistory
//           type={historyType}
//           onBack={handleBackFromHistory}
//         />
//       </Container>
//     );
//   }
  
//   // Dashboard view - Vertical layout matching the screenshot
//   return (
//     <Container maxWidth="xl" sx={{ py: 3 }}>
//       <Grid container spacing={3}>
//         {/* Left Column - Profile */}
//         <Grid item xs={12} md={4} lg={3}>
//           <ProfileSidebar user={sampleUser} />
//         </Grid>
        
//         {/* Middle Column - Leave balances */}
//         <Grid item xs={12} md={4} lg={4}>
//           <Grid container direction="column" spacing={2}>
//             <Grid item>
//               <TimeOffBalanceCard 
//                 title="Annual Leave"
//                 days={sampleBalances.vacation.days}
//                 lastAction={sampleBalances.vacation.lastAction}
//                 color={theme.palette.success.main}
//                 type="annual"
//               />
//             </Grid>
//             <Grid item>
//               <TimeOffBalanceCard 
//                 title="Sick Leave"
//                 days={sampleBalances.sick.days}
//                 lastAction={sampleBalances.sick.lastAction}
//                 color={theme.palette.error.main}
//                 type="sick"
//               />
//             </Grid>
//             <Grid item>
//               <TimeOffBalanceCard 
//                 title="Work From Home"
//                 days={sampleBalances.workFromHome.days}
//                 lastAction={sampleBalances.workFromHome.lastAction}
//                 color={theme.palette.primary.main}
//                 type="wfh"
//               />
//             </Grid>
//           </Grid>
//         </Grid>
        
//         {/* Right Column - Upcoming events and calendar */}
//         <Grid item xs={12} md={4} lg={5}>
//           <Grid container direction="column" spacing={2}>
//             {/* Upcoming Time Off header */}
//             <Grid item>
//               <Box 
//                 sx={{ 
//                   display: 'flex', 
//                   justifyContent: 'space-between', 
//                   alignItems: 'center',
//                   mb: 1
//                 }}
//               >
//                 <Typography variant="h6" fontWeight="medium">
//                   Upcoming Time Off
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   size="small"
//                   onClick={handleRequestTimeOff}
//                   sx={{ borderRadius: 2 }}
//                 >
//                   Request Leave
//                 </Button>
//               </Box>
              
//               {/* Upcoming events list */}
//               <Paper
//                 elevation={0}
//                 sx={{
//                   borderRadius: 2,
//                   overflow: 'hidden',
//                   boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//                   mb: 2
//                 }}
//               >
//                 {sampleUpcomingEvents.map((event) => (
//                   <Box
//                     key={event.id}
//                     sx={{
//                       p: 1.5,
//                       display: 'flex',
//                       alignItems: 'center',
//                       borderBottom: `1px solid ${theme.palette.divider}`,
//                       '&:last-child': { borderBottom: 'none' }
//                     }}
//                   >
//                     <Box sx={{ mr: 2 }}>
//                       {event.status === 'approved' ? (
//                         <CheckCircleOutline sx={{ color: theme.palette.success.main }} />
//                       ) : (
//                         <PendingOutlined sx={{ color: theme.palette.warning.main }} />
//                       )}
//                     </Box>
//                     <Box sx={{ flexGrow: 1 }}>
//                       <Typography variant="body1" fontWeight="medium">
//                         {event.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                         {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 ))}
//               </Paper>
//             </Grid>
            
//             {/* Calendar */}
//             <Grid item>
//               <SimpleCalendar />
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }