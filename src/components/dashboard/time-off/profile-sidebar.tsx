import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import { 
  Business as BusinessIcon, 
  Place as PlaceIcon, 
  SupervisorAccount as ManagerIcon,
  Add as AddIcon,
  PeopleAlt as TeamIcon,
  Message as MessageIcon
} from '@mui/icons-material';

interface UserProfile {
  name: string;
  position: string;
  avatarUrl?: string;
  joinDate: string;
  location: string;
  manager: string;
}

interface ProfileSidebarProps {
  user: UserProfile;
  onRequestTimeOff?: () => void;
  onViewTeamAbsences?: () => void;
  onMessageHR?: () => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  user,
  onRequestTimeOff,
  onViewTeamAbsences,
  onMessageHR
}) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        borderRadius: 2, 
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      {/* Header Section */}
      <Box sx={{ 
        p: 3, 
        bgcolor: theme.palette.primary.main,
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Avatar 
          src={user.avatarUrl} 
          alt={user.name}
          sx={{ 
            width: 64, 
            height: 64, 
            bgcolor: theme.palette.primary.dark,
            border: '2px solid #ffffff'
          }}
        >
          {!user.avatarUrl && user.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {user.position}
          </Typography>
        </Box>
      </Box>

      {/* User Info Section */}
      <List sx={{ p: 2 }}>
        <ListItem sx={{ py: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <BusinessIcon fontSize="small" color="action" />
          </ListItemIcon>
          <ListItemText 
            primary="Joined" 
            secondary={user.joinDate} 
            primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
            secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
          />
        </ListItem>

        <ListItem sx={{ py: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <PlaceIcon fontSize="small" color="action" />
          </ListItemIcon>
          <ListItemText 
            primary="Location" 
            secondary={user.location} 
            primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
            secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
          />
        </ListItem>

        <ListItem sx={{ py: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <ManagerIcon fontSize="small" color="action" />
          </ListItemIcon>
          <ListItemText 
            primary="Manager" 
            secondary={user.manager} 
            primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
            secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
          />
        </ListItem>
      </List>

      <Divider />

      {/* Quick Actions */}
      <Box sx={{ p: 2, bgcolor: theme.palette.background.default }}>
        <Typography 
          variant="subtitle2" 
          fontWeight="medium" 
          color="text.secondary"
          sx={{ mb: 1.5, pl: 1 }}
        >
          Quick Actions
        </Typography>

        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              disableRipple
              onClick={onRequestTimeOff}
              sx={{
                py: 1.5,
                border: 'none',
                backgroundColor: 'transparent',
                '&:hover': { bgcolor: '#f0f0f0' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <AddIcon fontSize="small" sx={{ color: theme.palette.success.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Request Leave" 
                primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              disableRipple
              onClick={onViewTeamAbsences}
              sx={{
                py: 1.5,
                border: 'none',
                backgroundColor: 'transparent',
                '&:hover': { bgcolor: '#f0f0f0' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <TeamIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Out of Office" 
                primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              disableRipple
              onClick={onMessageHR}
              sx={{
                py: 1.5,
                border: 'none',
                backgroundColor: 'transparent',
                '&:hover': { bgcolor: '#f0f0f0' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <MessageIcon fontSize="small" sx={{ color: theme.palette.info.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Message HR" 
                primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
};
