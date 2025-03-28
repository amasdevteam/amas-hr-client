import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  TableSortLabel,
  Button,
} from '@mui/material';
import {
  ArrowBack,
  CalendarToday,
  Event,
  Info,
  SickOutlined,
  Home,
  BeachAccess,
} from '@mui/icons-material';

// Types for our time off history data
export interface TimeOffEntry {
  id: string;
  date: string;
  description: string;
  usedDays?: number;
  earnedDays?: number;
  balance: number;
  note?: string;
  type: 'vacation' | 'sick' | 'wfh';
  status?: 'approved' | 'pending' | 'rejected';
}

interface TimeOffHistoryProps {
  type: 'vacation' | 'sick' | 'wfh' | 'all';
  onBack: () => void;
}

export const TimeOffHistory: React.FC<TimeOffHistoryProps> = ({ type, onBack }) => {
  const [entries, setEntries] = useState<TimeOffEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<string>(type === 'all' ? 'all' : type);
  const [orderBy, setOrderBy] = useState<keyof TimeOffEntry>('date');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  // Mock data for demonstration purposes
  const mockData: TimeOffEntry[] = [
    {
      id: '1',
      date: '01/08/2022',
      description: 'Moved to a new policy',
      balance: 0,
      type: 'vacation',
    },
    {
      id: '2',
      date: '01/08/2022',
      description: 'You\'re now eligible to begin accruing time',
      balance: 0,
      type: 'vacation',
    },
    {
      id: '3',
      date: '01/08/2022',
      description: 'Accrual for 01/08/2022 to 31/12/2022',
      earnedDays: 8.38,
      balance: 8.38,
      type: 'vacation',
    },
    {
      id: '4',
      date: '23/12/2022',
      description: 'Time off used for 23/12/2022 to 02/01/2023',
      usedDays: 5,
      balance: 3.38,
      note: 'Burnout break',
      type: 'vacation',
    },
    {
      id: '5',
      date: '01/01/2023',
      description: 'Lost days that exceeded the carryover allowance',
      usedDays: 3.38,
      balance: 0,
      type: 'vacation',
    },
    {
      id: '6',
      date: '01/01/2023',
      description: 'Time off used for 23/12/2022 to 02/01/2023',
      usedDays: 1,
      balance: -1,
      note: 'Burnout break',
      type: 'vacation',
    },
    {
      id: '7',
      date: '01/01/2023',
      description: 'Accrual for 01/01/2023 to 31/12/2023',
      earnedDays: 20,
      balance: 19,
      type: 'vacation',
    },
    {
      id: '8',
      date: '02/01/2023',
      description: 'Balance adjusted',
      earnedDays: 1,
      balance: 20,
      note: 'by Meshack Kayila: Adjustment for 2023',
      type: 'vacation',
    },
    {
      id: '9',
      date: '26/10/2023',
      description: 'Time off used for 26/10/2023 to 05/11/2023',
      usedDays: 7,
      balance: 13,
      note: 'CPA Exams',
      type: 'vacation',
    },
    // Sick leave entries
    {
      id: '10',
      date: '15/03/2023',
      description: 'Sick leave taken',
      usedDays: 2,
      balance: 6,
      note: 'Flu',
      type: 'sick',
    },
    {
      id: '11',
      date: '01/01/2023',
      description: 'Annual sick leave allocation',
      earnedDays: 8,
      balance: 8,
      type: 'sick',
    },
    // Work from home entries
    {
      id: '12',
      date: '10/02/2023',
      description: 'Work from home day used',
      usedDays: 1,
      balance: 11,
      type: 'wfh',
    },
    {
      id: '13',
      date: '01/01/2023',
      description: 'Annual WFH days allocation',
      earnedDays: 12,
      balance: 12,
      type: 'wfh',
    },
  ];

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        setEntries(mockData);
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, []);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterType(event.target.value);
  };

  const handleSort = (property: keyof TimeOffEntry) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredEntries = entries.filter((entry) => {
    if (filterType === 'all') return true;
    return entry.type === filterType;
  });

  const sortedEntries = filteredEntries.sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-'));
    const dateB = new Date(b.date.split('/').reverse().join('-'));
    
    if (orderBy === 'date') {
      return order === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    
    if ((a[orderBy] ?? 0) < (b[orderBy] ?? 0)) {
      return order === 'asc' ? -1 : 1;
    }
    if ((a[orderBy] ?? 0) > (b[orderBy] ?? 0)) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const getTypeIcon = (entryType: string) => {
    switch (entryType) {
      case 'vacation':
        return <BeachAccess sx={{ color: '#4CAF50' }} />;
      case 'sick':
        return <SickOutlined sx={{ color: '#F44336' }} />;
      case 'wfh':
        return <Home sx={{ color: '#2196F3' }} />;
      default:
        return <Event />;
    }
  };

  const getTypeColor = (entryType: string) => {
    switch (entryType) {
      case 'vacation':
        return '#4CAF50';
      case 'sick':
        return '#F44336';
      case 'wfh':
        return '#2196F3';
      default:
        return '#757575';
    }
  };

  const getTypeLabel = (entryType: string) => {
    switch (entryType) {
      case 'vacation':
        return 'Annual Leave';
      case 'sick':
        return 'Sick Leave';
      case 'wfh':
        return 'Work From Home';
      default:
        return 'Unknown';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'vacation':
        return 'Annual Leave History';
      case 'sick':
        return 'Sick Leave History';
      case 'wfh':
        return 'Work From Home History';
      default:
        return 'Time Off History';
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" fontWeight="medium">
          {getTitle()}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        {type === 'all' && (
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="filter-type-label">Filter by Type</InputLabel>
            <Select
              labelId="filter-type-label"
              id="filter-type"
              value={filterType}
              label="Filter by Type"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="vacation">Annual Leave</MenuItem>
              <MenuItem value="sick">Sick Leave</MenuItem>
              <MenuItem value="wfh">Work From Home</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'asc'}
                    onClick={() => handleSort('date')}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                {filterType === 'all' && (
                  <TableCell>Type</TableCell>
                )}
                <TableCell>Description</TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === 'usedDays'}
                    direction={orderBy === 'usedDays' ? order : 'asc'}
                    onClick={() => handleSort('usedDays')}
                  >
                    Used Days (-)
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === 'earnedDays'}
                    direction={orderBy === 'earnedDays' ? order : 'asc'}
                    onClick={() => handleSort('earnedDays')}
                  >
                    Earned Days (+)
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === 'balance'}
                    direction={orderBy === 'balance' ? order : 'asc'}
                    onClick={() => handleSort('balance')}
                  >
                    Balance
                  </TableSortLabel>
                </TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedEntries.length > 0 ? (
                sortedEntries.map((entry) => (
                  <TableRow key={entry.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday
                          fontSize="small"
                          sx={{ mr: 1, color: 'text.secondary' }}
                        />
                        {entry.date}
                      </Box>
                    </TableCell>
                    {filterType === 'all' && (
                      <TableCell>
                        <Chip
                          icon={getTypeIcon(entry.type)}
                          label={getTypeLabel(entry.type)}
                          size="small"
                          sx={{
                            backgroundColor: `${getTypeColor(entry.type)}20`,
                            color: getTypeColor(entry.type),
                            fontWeight: 'medium',
                          }}
                        />
                      </TableCell>
                    )}
                    <TableCell>{entry.description}</TableCell>
                    <TableCell align="right">
                      {entry.usedDays ? (
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color="error"
                        >
                          {entry.usedDays ? `-${entry.usedDays}` : ''}
                        </Typography>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {entry.earnedDays ? (
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color="success.main"
                        >
                          {entry.earnedDays}
                        </Typography>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color={
                          entry.balance < 0
                            ? 'error'
                            : entry.balance > 0
                            ? 'success.main'
                            : 'text.primary'
                        }
                      >
                        {entry.balance}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {entry.note ? (
                        <Tooltip title={entry.note}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                mr: 0.5,
                                maxWidth: 100,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {entry.note}
                            </Typography>
                            <Info fontSize="small" color="action" />
                          </Box>
                        </Tooltip>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={filterType === 'all' ? 7 : 6}
                    align="center"
                    sx={{ py: 4 }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      No history records found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default TimeOffHistory;