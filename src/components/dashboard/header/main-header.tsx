// "use client";

// import * as React from "react";
// import { 
//   Box, 
//   Typography, 
//   Avatar, 
//   Tabs, 
//   Tab, 
//   Chip,
//   styled
// } from "@mui/material";
// import { RouterLink } from "@/components/core/link";
// import { paths } from "@/paths";

// // Styled components for the BambooHR-inspired header
// const HeaderContainer = styled(Box)(({ theme }) => ({
//   backgroundColor: "var(--mui-palette-primary-main)",
//   color: "#fff",
//   padding: '24px 16px 0',
//   display: 'flex',
//   flexDirection: 'column',
//   marginBottom: '24px',
//   borderRadius: '4px',
//   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
// }));

// const UserInfoContainer = styled(Box)({
//   display: 'flex',
//   alignItems: 'center',
//   marginBottom: '16px',
// });

// const LargeAvatar = styled(Avatar)({
//   width: 80,
//   height: 80,
//   marginRight: '24px',
//   border: '3px solid #fff',
//   boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
// });

// // Removed duplicate StyledTab declaration

// const StyledTab = styled((props: React.ComponentProps<typeof Tab>) => <Tab {...props} />)({
//   color: 'rgba(255, 255, 255, 0.85)',
//   '&.Mui-selected': {
//     color: '#fff',
//     fontWeight: 600,
//   },
//   textTransform: 'none',
//   minWidth: '100px',
//   fontSize: '0.9rem',
//   padding: '12px 16px',
// });

// const StyledTabs = styled(Tabs)({
//   '& .MuiTabs-indicator': {
//     backgroundColor: '#fff',
//   },
// });

// export interface TabItemConfig {
//   key: string;
//   label: string;
//   href: string;
//   disabled?: boolean;
// }

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// const TabPanel = (props: TabPanelProps) => {
//   const { children, value, index, ...other } = props;

//   return (
//     <Box
//       role="tabpanel"
//       hidden={value !== index}
//       id={`user-tabpanel-${index}`}
//       aria-labelledby={`user-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ pt: 3 }}>
//           {children}
//         </Box>
//       )}
//     </Box>
//   );
// };

// const a11yProps = (index: number) => {
//   return {
//     id: `user-tab-${index}`,
//     'aria-controls': `user-tabpanel-${index}`,
//   };
// };

// export interface MainHeaderProps {
//   user: {
//     name: string;
//     title: string;
//     avatar?: string;
//     department?: string;
//     location?: string;
//   };
//   tabs: TabItemConfig[];
//   selectedTabIndex?: number;
//   onTabChange?: (event: React.SyntheticEvent, newValue: number) => void;
//   actions?: React.ReactNode;
// }

// export function MainHeader({ 
//   user, 
//   tabs, 
//   selectedTabIndex = 0,
//   onTabChange,
//   actions
// }: MainHeaderProps): React.JSX.Element {
//   // Internal tab state if not controlled externally
//   const [tabValue, setTabValue] = React.useState(selectedTabIndex);
  
//   // Handle tab change based on props or internal state
//   const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
//     if (onTabChange) {
//       onTabChange(event, newValue);
//     } else {
//       setTabValue(newValue);
//     }
//   };

//   return (
//     <HeaderContainer>
//       <UserInfoContainer>
//         <LargeAvatar 
//           src={user.avatar} 
//           alt={user.name}
//         >
//           {!user.avatar && user.name ? user.name.charAt(0) : null}
//         </LargeAvatar>
        
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             {user.name}
//           </Typography>
          
//           <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
//             <Typography variant="subtitle1">
//               {user.title}
//             </Typography>
            
//             {user.department && (
//               <Chip 
//                 label={user.department} 
//                 size="small" 
//                 sx={{ 
//                   bgcolor: 'rgba(255,255,255,0.2)', 
//                   color: '#fff',
//                   fontWeight: 500,
//                   fontSize: '0.75rem'
//                 }} 
//               />
//             )}
            
//             {user.location && (
//               <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                 {user.location}
//               </Typography>
//             )}
//           </Box>
//         </Box>
        
//         {actions && (
//           <Box sx={{ ml: 'auto' }}>
//             {actions}
//           </Box>
//         )}
//       </UserInfoContainer>
      
//       <StyledTabs 
//         value={onTabChange ? selectedTabIndex : tabValue} 
//         onChange={handleTabChange} 
//         aria-label="user navigation tabs"
//         variant="scrollable"
//         scrollButtons="auto"
//       >
//         {tabs.map((tab, index) => (
//           <StyledTab 
//             key={tab.key} 
//             label={tab.label} 
//             disabled={tab.disabled}
//             wrapped={!tab.disabled}
//             {...(!tab.disabled && {
//               component: RouterLink,
//               to: tab.href,
//             })}
//             {...a11yProps(index)} 
//           />
//         ))}
//       </StyledTabs>
//     </HeaderContainer>
//   );
// }