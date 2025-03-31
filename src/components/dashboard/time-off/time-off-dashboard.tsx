// // TimeOffDashboard.tsx
// import React, { useState } from 'react';
// import { 
//   Box, 
//   Grid, 
//   Paper, 
//   Typography, 
//   Button, 
//   useTheme,
//   Container
// } from '@mui/material';
// // import { Add as AddIcon } from '@mui/icons-material';
// // import { ProfileSection } from './profile-section';
// // import { TimeOffBalanceCard } from './time-off-balance-card';
// import { UpcomingTimeOffList } from './upcoming-time-off-list';
// // import { SimpleCalendar } from './simple-calender';

// // Sample data
// const SAMPLE_USER = {
//   name: "Emmanuel Muro",
//   position: "Business Analyst",
//   joinDate: "Aug 1, 2022",
//   location: "Tanzania",
//   manager: "Edson Mollel"
// };

// const SAMPLE_LEAVES: { type: 'annual' | 'sick' | 'wfh'; days: number; lastAction: string }[] = [
//   { type: 'annual', days: 16, lastAction: "Last Taken: Jan 12" },
//   { type: 'sick', days: 8, lastAction: "Last Used: Feb 2" },
//   { type: 'wfh', days: 12, lastAction: "Used: 3 YTD" }
// ];

// type TimeOffEvent = {
//   id: string;
//   date: string;
//   endDate?: string;
//   title: string;
//   status: 'approved' | 'pending' | 'rejected';
// };

// const SAMPLE_UPCOMING: TimeOffEvent[] = [
//   { id: '1', date: '2025-03-31', title: 'Eid El-Fitr', status: 'approved' },
//   { id: '2', date: '2025-04-07', title: 'Karume Day', status: 'approved' },
//   { id: '3', date: '2025-04-18', title: 'Good Friday', status: 'approved' },
//   { id: '4', date: '2025-04-30', endDate: '2025-05-04', title: 'Family Vacation', status: 'pending' }
// ];

// const TimeOffDashboard: React.FC = () => {
//   const theme = useTheme();
  
//   return (
//     <Container maxWidth="xl" sx={{ py: 3 }}>
//       <Grid container spacing={3}>
//         {/* Left Column */}
//         {/* <Grid item xs={12} md={4} lg={3}>
//           <ProfileSection user={SAMPLE_USER} />
//         </Grid> */}
        
//         {/* Middle Column */}
//         <Grid item xs={12} md={4} lg={5}>
//           <Grid container spacing={2} direction="column">
//             {SAMPLE_LEAVES.map(leave => (
//               // <Grid item key={leave.type}>
//               //   <TimeOffBalanceCard 
//               //     type={leave.type} 
//               //     days={leave.days} 
//               //     lastAction={leave.lastAction} 
//               //   />
//               // </Grid>
//             ))}
//           </Grid>
//         </Grid>
        
//         {/* Right Column */}
//         <Grid item xs={12} md={4} lg={4}>
//           <Grid container spacing={2} direction="column">
//             <Grid item>
//               <Paper 
//                 elevation={0} 
//                 sx={{ 
//                   p: 2, 
//                   borderRadius: 2, 
//                   display: 'flex', 
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//                 }}
//               >
//                 <Typography variant="h6" fontWeight="medium">
//                   Heads-Up: Time Off
//                 </Typography>
//                 <Button 
//                   variant="contained" 
//                   color="primary" 
//                   size="small"
//                   sx={{ borderRadius: 2 }}
//                 >
//                   Request Leave
//                 </Button>
//               </Paper>
//             </Grid>
//             <Grid item>
//               <UpcomingTimeOffList events={SAMPLE_UPCOMING} />
//             </Grid>
//             {/* <Grid item>
//               <SimpleCalendar />
//             </Grid> */}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default TimeOffDashboard;