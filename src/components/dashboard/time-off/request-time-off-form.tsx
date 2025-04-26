import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
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

dayjs.extend(isSameOrBefore);

export interface TimeOffRequest {
  type: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  duration: number;
  allDay: boolean;
  reason: string;
  dateAmounts: DateAmount[];
}

interface RequestTimeOffFormProps {
  onSubmit: (data: TimeOffRequest) => void;
  onCancel: () => void;
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

const leaveBalances: LeaveBalance[] = [
  { type: 'vacation', label: 'Annual Leave (Vacation)', available: 16, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'sick', label: 'Sick Leave', available: 0, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'wfh', label: 'Work From Home', available: 0, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'bereavement', label: 'Bereavement', available: 0, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'unpaid', label: 'Leave without Pay', available: 0, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'toil', label: 'Time Off in Lieu (TOIL)', available: 0, used: 0, icon: <CalendarToday color="success" /> },
  { type: 'ed', label: 'Exemption from Duty (ED)', available: 0, used: 0, icon: <CalendarToday color="success" /> },
];

const holidays = [
  { date: dayjs('2025-03-28'), name: 'Eid El-Fitr' },
];

export const RequestTimeOffForm: React.FC<RequestTimeOffFormProps> = ({ onSubmit, onCancel }) => {
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
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  useEffect(() => {
    if (formData.startDate && formData.endDate && dayjs.isDayjs(formData.startDate) && dayjs.isDayjs(formData.endDate)) {
      const dateAmounts: DateAmount[] = [];
      let current = dayjs(formData.startDate);
      const end = dayjs(formData.endDate);

      while (current.isSameOrBefore(end, 'day')) {
        const holiday = holidays.find(h => h.date.isSame(current, 'day'));
        const isWeekend = current.day() === 0 || current.day() === 6;
        let defaultAmount = isWeekend ? 0 : 1;

        dateAmounts.push({
          date: current,
          amount: holiday ? 0 : defaultAmount,
          dayType: defaultAmount === 1 ? 'day' : 'days',
          isHoliday: !!holiday,
          holidayName: holiday?.name,
        });

        current = current.add(1, 'day');
      }

      setFormData(prev => ({
        ...prev,
        dateAmounts,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        dateAmounts: [],
      }));
    }
  }, [formData.startDate, formData.endDate]);

  useEffect(() => {
    if (formData.dateAmounts.length > 0) {
      const total = formData.dateAmounts.reduce((sum, date) => sum + date.amount, 0);
      handleChange('duration', total);
    }
  }, [formData.dateAmounts]);

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
    if (!formData.type) newErrors.type = 'Select a leave type';
    if (!formData.startDate) newErrors.startDate = 'Select start date';
    if (!formData.endDate) newErrors.endDate = 'Select end date';
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

  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' } }}>
      {/* Request Form */}
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
          <Typography variant="h6">Request Leave</Typography>
        </Box>

        <Collapse in={showAlert}>
          <Alert
            severity="success"
            action={
              <IconButton size="small" color="inherit" onClick={() => setShowAlert(false)}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mx: 3, mt: 2 }}
          >
            Your request was submitted successfully!
          </Alert>
        </Collapse>

        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <TextField
              select fullWidth label="Leave Type"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              error={!!errors.type}
              helperText={errors.type}
            >
              {timeOffTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Duration (Days)"
              type="number"
              value={formData.duration}
              InputProps={{ readOnly: true }}
              error={!!errors.duration}
              helperText={errors.duration}
            />

            <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={(date) => handleChange('startDate', date ? dayjs(date) : null)}
              slotProps={{ textField: { fullWidth: true, error: !!errors.startDate, helperText: errors.startDate } }}
            />

            <DatePicker
              label="End Date"
              value={formData.endDate}
              onChange={(date) => handleChange('endDate', date ? dayjs(date) : null)}
              slotProps={{ textField: { fullWidth: true, error: !!errors.endDate, helperText: errors.endDate } }}
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <FormControl component="fieldset">
              <Typography variant="body2" color="text.secondary" gutterBottom>Duration</Typography>
              <RadioGroup
                row
                value={formData.allDay ? 'allDay' : 'halfDay'}
                onChange={(e) => handleChange('allDay', e.target.value === 'allDay')}
              >
                <FormControlLabel value="allDay" control={<Radio />} label="All Day" />
                <FormControlLabel value="halfDay" control={<Radio />} label="Half Day" />
              </RadioGroup>
            </FormControl>
          </Box>

          {formData.dateAmounts.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1">Amount</Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
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
                    {formData.dateAmounts.map((dateAmount, idx) => (
                      <TableRow key={dateAmount.date.format('YYYY-MM-DD')}>
                        <TableCell>{dateAmount.date.format('ddd, MMM DD')}</TableCell>
                        <TableCell>{dateAmount.isHoliday ? <Typography color="success.main">{dateAmount.holidayName}</Typography> : dateAmount.date.format('dddd')}</TableCell>
                        <TableCell align="right">
                          <TextField
                            size="small"
                            type="number"
                            value={dateAmount.amount}
                            onChange={(e) => handleDateAmountChange(idx, Number(e.target.value))}
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                        <TableCell>{dateAmount.dayType}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          <Box sx={{ mt: 4 }}>
            <TextField
              fullWidth
              label="Reason"
              multiline
              rows={3}
              value={formData.reason}
              onChange={(e) => handleChange('reason', e.target.value)}
              error={!!errors.reason}
              helperText={errors.reason}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={onCancel}>Cancel</Button>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>Submit</Button>
          </Box>
        </Box>
      </Paper>

      {/* Leave Balance */}
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
        <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
          <Typography variant="h6">Leave Balance</Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          {leaveBalances.map(balance => (
            <Card
              key={balance.type}
              variant="outlined"
              sx={{
                mb: 2,
                borderColor: formData.type === balance.type ? 'primary.main' : 'inherit',
                backgroundColor: formData.type === balance.type ? 'rgba(25, 118, 210, 0.04)' : 'inherit',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {balance.icon}
                  <Box>
                    <Typography variant="body2">{balance.label}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {balance.available} days available
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
