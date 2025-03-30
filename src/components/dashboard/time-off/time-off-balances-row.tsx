import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button,
  Divider,
  useTheme,
  Tabs,
  Tab
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon,
  BeachAccess,
  SickOutlined,
  Home
} from '@mui/icons-material';

interface TimeOffBalancesRowProps {
  balances: {
    vacation: number;
    sick: number;
    workFromHome: number;
  };
  taken: {
    vacation: number;
    sick: number;
    workFromHome: number;
  };
  percentages: {
    vacation: number;
    sick: number;
    workFromHome: number;
  };
  onViewHistory?: (type: 'vacation' | 'sick' | 'wfh') => void;
  onRequest?: () => void;
}

export const TimeOffBalancesRow: React.FC<TimeOffBalancesRowProps> = ({ 
  balances, 
  taken = { vacation: 5, sick: 2, workFromHome: 3 },
  percentages = { vacation: 68, sick: 75, workFromHome: 80 },
  onViewHistory,
  onRequest 
}) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = React.useState(0);
  
  const handleRequest = () => {
    if (onRequest) {
      console.log('Request button clicked');
      onRequest();
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const renderContent = () => {
    switch(selectedTab) {
      case 0: // Annual Leave
        return (
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              pl: 3,
              pr: 4
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: '#4CAF50', 
                p: 2,
                borderRadius: 2,
                mr: 3
              }}>
                <CalendarIcon sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" component="div" fontWeight="500">
                  {balances.vacation} Days
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Remaining
                </Typography>
              </Box>
            </Box>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              flexGrow: 1,
              px: 3
            }}>
              <Typography variant="h4" fontWeight="500" sx={{ mb: 1 }}>
                {taken.vacation} Days Taken
              </Typography>
              <Typography variant="h4" fontWeight="500" sx={{ display: 'flex', alignItems: 'baseline' }}>
                {percentages.vacation}
                <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 1 }}>
                  % Balance
                </Typography>
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              p: 2,
              gap: 2
            }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleRequest}
                sx={{
                  bgcolor: '#4CAF50',
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.25rem',
                  '&:hover': { bgcolor: '#3d8b40' },
                }}
              >
                Request
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => onViewHistory && onViewHistory('vacation')}
                sx={{
                  color: '#4CAF50',
                  borderColor: '#4CAF50',
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.25rem',
                  '&:hover': { borderColor: '#3d8b40', color: '#3d8b40' },
                }}
              >
                History
              </Button>
            </Box>
          </Box>
        );
      case 1: // Sick Leave
        return (
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              pl: 3,
              pr: 4
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: theme.palette.error.main, 
                p: 2,
                borderRadius: 2,
                mr: 3
              }}>
                <CalendarIcon sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" component="div" fontWeight="500">
                  {balances.sick} Days
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Remaining
                </Typography>
              </Box>
            </Box>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              flexGrow: 1,
              px: 3
            }}>
              <Typography variant="h4" fontWeight="500" sx={{ mb: 1 }}>
                {taken.sick} Days Taken
              </Typography>
              <Typography variant="h4" fontWeight="500" sx={{ display: 'flex', alignItems: 'baseline' }}>
                {percentages.sick}
                <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 1 }}>
                  % Balance
                </Typography>
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              p: 2,
              gap: 2
            }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleRequest}
                sx={{
                  bgcolor: theme.palette.error.main,
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.25rem',
                  '&:hover': { bgcolor: theme.palette.error.dark },
                }}
              >
                Request
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => onViewHistory && onViewHistory('sick')}
                sx={{
                  color: theme.palette.error.main,
                  borderColor: theme.palette.error.main,
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.25rem',
                  '&:hover': { borderColor: theme.palette.error.dark, color: theme.palette.error.dark },
                }}
              >
                History
              </Button>
            </Box>
          </Box>
        );
      case 2: // Work From Home
        return (
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              pl: 3,
              pr: 4
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: theme.palette.primary.main, 
                p: 2,
                borderRadius: 2,
                mr: 3
              }}>
                <CalendarIcon sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" component="div" fontWeight="500">
                  {balances.workFromHome} Days
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Remaining
                </Typography>
              </Box>
            </Box>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              flexGrow: 1,
              px: 3
            }}>
              <Typography variant="h4" fontWeight="500" sx={{ mb: 1 }}>
                {taken.workFromHome} Days Taken
              </Typography>
              <Typography variant="h4" fontWeight="500" sx={{ display: 'flex', alignItems: 'baseline' }}>
                {percentages.workFromHome}
                <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 1 }}>
                  % Balance
                </Typography>
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              p: 2,
              gap: 2
            }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleRequest}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.25rem',
                  '&:hover': { bgcolor: theme.palette.primary.dark },
                }}
              >
                Request
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => onViewHistory && onViewHistory('wfh')}
                sx={{
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.25rem',
                  '&:hover': { borderColor: theme.palette.primary.dark, color: theme.palette.primary.dark },
                }}
              >
                History
              </Button>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={selectedTab} 
              onChange={handleTabChange}
              aria-label="time off categories"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  px: 4,
                  py: 2,
                },
                '& .Mui-selected': {
                  color: '#1976d2',
                  fontWeight: 500,
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                },
              }}
            >
              <Tab icon={<BeachAccess />} label="Annual" iconPosition="start" />
              <Tab icon={<SickOutlined />} label="Sick" iconPosition="start" />
              <Tab icon={<Home />} label="WFH" iconPosition="start" />
            </Tabs>
          </Box>
          <Box sx={{ p: 0, height: '180px' }}>
            {renderContent()}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};