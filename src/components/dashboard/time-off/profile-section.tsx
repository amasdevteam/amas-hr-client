// ProfileSection.tsx
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  useTheme
} from '@mui/material';

interface UserProfile {
  name: string;
  position: string;
  joinDate: string;
  location: string;
  manager: string;
  avatarUrl?: string;
}

interface ProfileSectionProps {
  user: UserProfile;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          columnGap: 2,
          bgcolor: '#fbfbfb'
        }}
      >
        <Avatar
          src={user.avatarUrl}
          alt={user.name}
          sx={{
            width: 60,
            height: 60,
            border: '2px solid #f0f0f0'
          }}
        >
          {!user.avatarUrl && <Typography>{user.name.charAt(0)}</Typography>}
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="medium">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.position}
          </Typography>
        </Box>
      </Box>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            Joined:
          </Typography>
          <Typography variant="body1">
            {user.joinDate}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            Location:
          </Typography>
          <Typography variant="body1">
            {user.location}
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="body2" color="text.secondary">
            Manager:
          </Typography>
          <Typography variant="body1">
            {user.manager}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};