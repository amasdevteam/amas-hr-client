// TimeOffLayout.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  useMediaQuery, 
  useTheme, 
  IconButton, 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer,
  Button 
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Add as AddIcon 
} from '@mui/icons-material';
import { ProfileSidebar } from './profile-sidebar';

// Sample user data - in a real app this would come from your auth/user context
const SAMPLE_USER = {
  name: "Emmanuel Muro",
  position: "Business Analyst",
  joinDate: "Aug 1, 2022",
  location: "Tanzania",
  manager: "Edson Mollel"
};

interface TimeOffLayoutProps {
  children: React.ReactNode;
  title: string;
  onRequestTimeOff?: () => void;
  onViewTeamAbsences?: () => void;
  showRequestButton?: boolean;
}

export const TimeOffLayout: React.FC<TimeOffLayoutProps> = ({
  children,
  title,
  onRequestTimeOff,
  onViewTeamAbsences,
  showRequestButton = true
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: '#f9fafb'
    }}>
      {/* App Bar */}
      <AppBar 
        position="sticky" 
        color="inherit" 
        elevation={0} 
        sx={{ 
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {title}
          </Typography>
          
          {/* {showRequestButton && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onRequestTimeOff}
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                borderRadius: 2
              }}
            >
              Request Time Off
            </Button>
          )} */}
        </Toolbar>
      </AppBar>
      
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar - Desktop */}
        {!isMobile && (
          <Box sx={{ 
            width: 280, 
            p: 2,
            display: { xs: 'none', md: 'block' }
          }}>
            <ProfileSidebar 
              user={SAMPLE_USER} 
              onRequestTimeOff={onRequestTimeOff}
              onViewTeamAbsences={onViewTeamAbsences} // Pass the prop
              onMessageHR={() => console.log('Message HR clicked')}
            />
          </Box>
        )}
        
        {/* Sidebar - Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280 
            }, 
          }}
        >
          <ProfileSidebar 
            user={SAMPLE_USER} 
            onRequestTimeOff={onRequestTimeOff}
            onViewTeamAbsences={onViewTeamAbsences} // Pass the prop
            onMessageHR={() => console.log('Message HR clicked')}
          />
        </Drawer>
        
        {/* Main Content */}
        <Box sx={{ 
          flexGrow: 1, 
          p: { xs: 2, md: 3 },
          overflow: 'auto',
          width: { xs: '100%', md: `calc(100% - 280px)` }
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};