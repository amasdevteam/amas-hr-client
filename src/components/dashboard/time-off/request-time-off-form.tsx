// RequestTimeOffForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
  Alert,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import { Close as CloseIcon, Send as SendIcon, CalendarToday } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// Initialize dayjs plugins
dayjs.extend(isSameOrBefore);

interface RequestTimeOffFormProps {
  onSubmit: (data: TimeOffRequest) => void;
  onCancel: () => void;
}

export interface TimeOffRequest {
  type: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  duration: number;
  allDay: boolean;
  reason: string;
  dateAmounts: DateAmount[];
}

interface DateAmount {
  date: Dayjs;
  amount: number;
  dayType: 'day' | 'days';
  isHoliday?: boolean;
  holidayName?: string;
}

interface LeaveBalance {
  type: string;
  label: string;
  available: number;
  used: number;
  icon: React.ReactNode;
}

const timeOffTypes = [
  { value: 'vacation', label: 'Vacation' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'wfh', label: 'Work From Home' },
  { value: 'bereavement', label: 'Bereavement' },
  { value: 'personal', label: 'Personal Leave' },
  { value: 'paternity', label: 'Paternity Leave' },
  { value: 'compassionate', label: 'Compassionate Leave' },
  { value: 'unpaid', label: 'Leave without Pay' },
  { value: 'toil', label: 'Time Off in Lieu (TOIL)' },
  { value: 'ed', label: 'Exemption from Duty (ED)' },
];

// Mock leave balances data
const leaveBalances: LeaveBalance[] = [
  { type: 'vacation', label: 'Annual Leave (Vacation)', available: 16, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'ed', label: 'Exemption from Duty (ED)', available: 0, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'wfh', label: 'Work From Home', available: 0, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'paternity', label: 'Paternity Leave', available: 0, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'compassionate', label: 'Compassionate Leave', available: 0, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'unpaid', label: 'Leave without Pay', available: 0, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'sick', label: 'Sick Leave', available: 0, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'toil', label: 'Time Off in Lieu (TOIL)', available: 0, used: 0, icon: <CalendarToday color="success" /> },
];

// Mock holidays for demonstration
const holidays = [
  { date: dayjs('2025-03-28'), name: 'Eid El-Fitr' },
];

export const RequestTimeOffForm: React.FC<RequestTimeOffFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<TimeOffRequest>({
    type: 'vacation',
    startDate: null,
    endDate: null,
    duration: 1,
    allDay: true,
    reason: '',
    dateAmounts: [],
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TimeOffRequest, string>>>({});
  const [showAlert, setShowAlert] = useState(false);
  const today = dayjs();

  const handleChange = (field: keyof TimeOffRequest, value: any) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate && dayjs.isDayjs(formData.startDate) && dayjs.isDayjs(formData.endDate)) {
      const diffDays = formData.endDate.diff(formData.startDate, 'day') + 1;
      handleChange('duration', diffDays);
    }
  };

  // Generate date amounts array when start and end dates change
  useEffect(() => {
    // Only run this effect if both dates are valid dayjs objects
    if (formData.startDate && formData.endDate && dayjs.isDayjs(formData.startDate) && dayjs.isDayjs(formData.endDate)) {
      const dateAmounts: DateAmount[] = [];
      let current = dayjs(formData.startDate); // Create a new instance instead of using clone
      const end = dayjs(formData.endDate);
      
      // Loop through dates and add them to the array
      while (current.isSameOrBefore(end, 'day')) {
        // Check if it's a holiday
        const holiday = holidays.find(h => h.date.isSame(current, 'day'));
        
        // Check if it's a weekend (0 = Sunday, 6 = Saturday)
        const isWeekend = current.day() === 0 || current.day() === 6;
        
        // Default amount is 1 for weekdays, 0 for weekends
        let defaultAmount = isWeekend ? 0 : 1;
        
        // If it's a holiday, mark it
        if (holiday) {
          dateAmounts.push({
            date: dayjs(current),
            amount: 0,
            dayType: 'day',
            isHoliday: true,
            holidayName: holiday.name,
          });
        } else {
          dateAmounts.push({
            date: dayjs(current),
            amount: defaultAmount,
            dayType: defaultAmount === 1 ? 'day' : 'days',
          });
        }
        
        current = current.add(1, 'day');
      }
      
      // Update the form data with the date amounts without creating a recursive update
      setFormData(prev => ({
        ...prev,
        dateAmounts,
      }));
    } else {
      // Clear date amounts if either date is null
      setFormData(prev => ({
        ...prev,
        dateAmounts: [],
      }));
    }
  }, [formData.startDate, formData.endDate]);

  // Recalculate total duration when date amounts change
  useEffect(() => {
    if (formData.dateAmounts.length > 0) {
      const total = formData.dateAmounts.reduce((sum, date) => sum + date.amount, 0);
      handleChange('duration', total);
    }
  }, [formData.dateAmounts]);

  // Handle changing individual date amounts
  const handleDateAmountChange = (index: number, value: number) => {
    const newDateAmounts = [...formData.dateAmounts];
    newDateAmounts[index].amount = value;
    newDateAmounts[index].dayType = value === 1 ? 'day' : 'days';
    
    setFormData(prev => ({
      ...prev,
      dateAmounts: newDateAmounts,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof TimeOffRequest, string>> = {};
    
    if (!formData.type) newErrors.type = 'Please select a leave type';
    if (!formData.startDate) newErrors.startDate = 'Please select a start date';
    if (!formData.endDate) newErrors.endDate = 'Please select an end date';
    if (formData.startDate && formData.endDate && formData.startDate.isAfter(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setShowAlert(true);
      
      // Clear form after submission
      setTimeout(() => {
        setFormData({
          type: 'vacation',
          startDate: null,
          endDate: null,
          duration: 1,
          allDay: true,
          reason: '',
          dateAmounts: [],
        });
        setShowAlert(false);
      }, 3000);
    }
  };

  // Get the selected leave balance
  const selectedLeaveBalance = leaveBalances.find(balance => balance.type === formData.type) || leaveBalances[0];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
          <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Request Leave</Typography>
          </Box>
          
          <Collapse in={showAlert}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setShowAlert(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mx: 3, mt: 2 }}
            >
              Your time off request has been submitted successfully!
            </Alert>
          </Collapse>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Leave Type"
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  error={!!errors.type}
                  helperText={errors.type}
                >
                  {timeOffTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Duration (Days)"
                  type="number"
                  InputProps={{ readOnly: true }}
                  value={formData.duration}
                  error={!!errors.duration}
                  helperText={errors.duration ? errors.duration : ''}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(date) => {
                    // Ensure we're working with a valid dayjs object
                    const validDate = date ? dayjs(date) : null;
                    handleChange('startDate', validDate);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.startDate,
                      helperText: errors.startDate,
                    },
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(date) => {
                    // Ensure we're working with a valid dayjs object
                    const validDate = date ? dayjs(date) : null;
                    handleChange('endDate', validDate);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.endDate,
                      helperText: errors.endDate,
                    },
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Duration
                  </Typography>
                  <RadioGroup
                    row
                    value={formData.allDay ? 'allDay' : 'halfDay'}
                    onChange={(e) => handleChange('allDay', e.target.value === 'allDay')}
                  >
                    <FormControlLabel value="allDay" control={<Radio />} label="All Day" />
                    <FormControlLabel value="halfDay" control={<Radio />} label="Half Day" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              
              {formData.dateAmounts.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Amount
                  </Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 300 }}>
                    <Table stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Day</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell>Unit</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formData.dateAmounts.map((dateAmount, index) => (
                          <TableRow 
                            key={dateAmount.date.format('YYYY-MM-DD')}
                            sx={{ 
                              backgroundColor: dateAmount.isHoliday 
                                ? 'rgba(76, 175, 80, 0.1)' 
                                : (dateAmount.date.day() === 0 || dateAmount.date.day() === 6) 
                                  ? 'rgba(200, 200, 200, 0.2)' 
                                  : 'inherit'
                            }}
                          >
                            <TableCell>{dateAmount.date.format('ddd, MMM DD')}</TableCell>
                            <TableCell>
                              {dateAmount.isHoliday ? (
                                <Typography variant="body2" color="success.main">
                                  {dateAmount.holidayName}
                                </Typography>
                              ) : (
                                dateAmount.date.format('dddd')
                              )}
                            </TableCell>
                            <TableCell align="right">
                              <TextField
                                size="small"
                                type="number"
                                value={dateAmount.amount}
                                onChange={(e) => handleDateAmountChange(index, Number(e.target.value))}
                                inputProps={{ 
                                  min: 0, 
                                  max: 1, 
                                  step: 0.5,
                                  style: { textAlign: 'right' } 
                                }}
                                sx={{ width: 80 }}
                                disabled={dateAmount.isHoliday || dateAmount.date.day() === 0 || dateAmount.date.day() === 6}
                              />
                            </TableCell>
                            <TableCell>{dateAmount.dayType}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
                          <TableCell colSpan={2}>
                            <Typography variant="subtitle2">Total</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle2">{formData.duration.toFixed(2)}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2">days</Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reason"
                  multiline
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => handleChange('reason', e.target.value)}
                  error={!!errors.reason}
                  helperText={errors.reason || "Share your story! While not required, a brief note helps your manager understand and prioritize your time-off request. Think of it as leaving breadcrumbs for a smooth approval journey ✨"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="caption" color="primary.light" sx={{ fontStyle: 'italic', position: 'absolute', bottom: 4, right: 14 }}>
                          Optional
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
              >
                Submit Request
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} lg={4}>
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
          <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Leave Balance</Typography>
          </Box>
          
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1" sx={{ mr: 1 }}>Balance as of</Typography>
              <TextField
                size="small"
                type="text"
                value={today.format('DD/MM/YYYY')}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarToday fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 150 }}
              />
            </Box>
            
            {leaveBalances.map((balance) => (
              <Card 
                key={balance.type} 
                variant="outlined" 
                sx={{ 
                  mb: 1.5,
                  border: formData.type === balance.type ? '1px solid' : '1px solid rgba(0, 0, 0, 0.12)',
                  borderColor: formData.type === balance.type ? 'primary.main' : 'inherit',
                  backgroundColor: formData.type === balance.type ? 'rgba(25, 118, 210, 0.04)' : 'inherit',
                }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>{balance.icon}</Grid>
                    <Grid item xs>
                      <Typography variant="body2">{balance.label}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {balance.available} days available
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};