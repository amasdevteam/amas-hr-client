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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';

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

const getCurrentMonthShort = () => {
  const now = new Date();
  return now.toLocaleString('default', { month: 'short' });
};

const generateAccrualData = (type: 'vacation' | 'sick' | 'workFromHome') => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const accrualRate = 1.67;
  let balance = 0;

  return months.map((month, index) => {
    let taken = 0;
    if (type === 'vacation') {
      taken = index === 0 ? 7 : 0; // Overdraw in Jan
    } else if (type === 'sick') {
      taken = index === 2 ? 1 : 0;
    } else if (type === 'workFromHome') {
      taken = index % 3 === 0 ? 0.5 : 0;
    }

    balance += accrualRate;
    const accrued = parseFloat(balance.toFixed(2));
    const overdrawn = taken > accrued;

    return {
      month,
      accrued,
      taken,
      overdrawn
    };
  });
};

export const TimeOffBalancesRow: React.FC<TimeOffBalancesRowProps> = ({
  balances,
  taken = { vacation: 5, sick: 2, workFromHome: 3 },
  percentages = { vacation: 68, sick: 75, workFromHome: 80 },
  onViewHistory,
  onRequest
}) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [accrualData, setAccrualData] = React.useState(generateAccrualData('vacation'));

  const handleRequest = () => onRequest?.();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    const type = newValue === 0 ? 'vacation' : newValue === 1 ? 'sick' : 'workFromHome';
    setAccrualData(generateAccrualData(type));
  };

  const getCurrentTabColor = () => {
    switch (selectedTab) {
      case 0: return theme.palette.primary.main;
      case 1: return theme.palette.error.main;
      case 2: return theme.palette.primary.main;
      default: return '#4CAF50';
    }
  };

  const getCurrentTabLabel = () => {
    return selectedTab === 0 ? 'Annual Leave Summary' : selectedTab === 1 ? 'Sick Leave Summary' : 'WFH Summary';
  };

  const getCurrentBalance = () => {
    return selectedTab === 0 ? balances.vacation : selectedTab === 1 ? balances.sick : balances.workFromHome;
  };

  const getCurrentTaken = () => {
    return selectedTab === 0 ? taken.vacation : selectedTab === 1 ? taken.sick : taken.workFromHome;
  };

  const getCurrentPercentage = () => {
    return selectedTab === 0 ? percentages.vacation : selectedTab === 1 ? percentages.sick : percentages.workFromHome;
  };

  const currentMonthShort = getCurrentMonthShort();

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
                  color: getCurrentTabColor(),
                  fontWeight: 500,
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  backgroundColor: getCurrentTabColor(),
                },
              }}
            >
              <Tab icon={<BeachAccess />} label="Annual" iconPosition="start" />
              <Tab icon={<SickOutlined />} label="Sick" iconPosition="start" />
              <Tab icon={<Home />} label="WFH" iconPosition="start" />
            </Tabs>
          </Box>

          {/* Summary Section */}
          <Box sx={{ display: 'flex', height: '180px', px: 3, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
              <Box sx={{
                bgcolor: getCurrentTabColor(),
                p: 2,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}>
                <CalendarIcon sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4">{getCurrentBalance()} Days</Typography>
                <Typography color="text.secondary">Remaining</Typography>
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

            <Box sx={{ mr: 4 }}>
              <Typography variant="h5" fontWeight="500" sx={{ mb: 1 }}>
                {getCurrentTaken()} Days Taken
              </Typography>
              <Typography color="text.secondary">Accruing at 1.67 days per month</Typography>
            </Box>

            <Box>
              <Typography variant="h4" fontWeight="500">
                {getCurrentPercentage()}
                <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 1 }}>
                  % Balance
                </Typography>
              </Typography>
            </Box>

            <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleRequest}
                sx={{
                  bgcolor: getCurrentTabColor(),
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: `${getCurrentTabColor()}D0`
                  }
                }}
              >
                Request
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => onViewHistory?.(
                  selectedTab === 0 ? 'vacation' :
                    selectedTab === 1 ? 'sick' : 'wfh'
                )}
                sx={{
                  borderColor: getCurrentTabColor(),
                  color: getCurrentTabColor(),
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: `${getCurrentTabColor()}D0`,
                    color: `${getCurrentTabColor()}D0`
                  }
                }}
              >
                History
              </Button>
            </Box>
          </Box>

          {/* Chart Section */}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ height: 300, px: 3, pb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {getCurrentTabLabel()}
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accrualData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine x={currentMonthShort} stroke="red" label="Now" strokeDasharray="3 3" />
                <Bar
                  dataKey="accrued"
                  stackId="a"
                  name="Accrued"
                  fill={getCurrentTabColor()}
                />
                <Bar
                  dataKey="taken"
                  stackId="a"
                  name="Taken"
                  fill="#BDBDBD"
                  shape={(props) => {
                    const { x, y, width, height, payload } = props;
                    const isOverdrawn = payload.overdrawn;
                    return (
                      <g>
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          fill={isOverdrawn ? '#FF6B6B' : '#BDBDBD'}
                        />
                      </g>
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
