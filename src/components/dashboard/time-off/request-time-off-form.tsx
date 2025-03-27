// RequestTimeOffForm.tsx
import React, { useState } from 'react';
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
} from '@mui/material';
import { Close as CloseIcon, Send as SendIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

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
}

const timeOffTypes = [
  { value: 'vacation', label: 'Vacation' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'wfh', label: 'Work From Home' },
  { value: 'bereavement', label: 'Bereavement' },
  { value: 'personal', label: 'Personal Leave' },
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
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TimeOffRequest, string>>>({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (field: keyof TimeOffRequest, value: any) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

//   const calculateDuration = () => {
//     if (formData.startDate && formData.endDate) {
//       // Simple calculation - doesn't account for weekends/holidays
//       const start = new Date(formData.startDate);
//       const end = new Date(formData.endDate);
//       const diffTime = Math.abs(end.getTime() - start.getTime());
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
//       handleChange('duration', diffDays);
//     }
//   };

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const diffDays = formData.endDate.diff(formData.startDate, 'day') + 1;
      handleChange('duration', diffDays);
    }
  };
  

  const validateForm = () => {
    const newErrors: Partial<Record<keyof TimeOffRequest, string>> = {};
    
    if (!formData.type) newErrors.type = 'Please select a leave type';
    if (!formData.startDate) newErrors.startDate = 'Please select a start date';
    if (!formData.endDate) newErrors.endDate = 'Please select an end date';
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!formData.reason) newErrors.reason = 'Please provide a reason';
    
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
        });
        setShowAlert(false);
      }, 3000);
    }
  };

  
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="h6">Request Time Off</Typography>
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
          <Grid item xs={12}>
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
          
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={(date) => {
                handleChange('startDate', date);
                calculateDuration();
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
          
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="End Date"
              value={formData.endDate}
              onChange={(date) => {
                handleChange('endDate', date);
                calculateDuration();
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
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Duration (Days)"
              type="number"
              InputProps={{ readOnly: true }}
              value={formData.duration}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
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
          
          <Grid item xs={12}>
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
  );
};