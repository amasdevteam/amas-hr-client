// Type definitions for RequestTimeOffForm component

import { Dayjs } from 'dayjs';
import { ReactNode } from 'react';

// Props for the RequestTimeOffForm component
export interface RequestTimeOffFormProps {
  onSubmit: (data: TimeOffRequest) => void;
  onCancel: () => void;
}

// Main data interface for time off requests
export interface TimeOffRequest {
  type: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  duration: number;
  allDay: boolean;
  reason: string;
  dateAmounts: DateAmount[];
}

// Represents a specific date in the request with amount of time taken
export interface DateAmount {
  date: Dayjs;
  amount: number;
  dayType: 'day' | 'days';
  isHoliday?: boolean;
  holidayName?: string;
}

// Represents available leave balance information
export interface LeaveBalance {
  type: string;
  label: string;
  available: number;
  used: number;
  icon: ReactNode;
}

// Available time off type options
export interface TimeOffTypeOption {
  value: string;
  label: string;
}

// Holiday entry for the calendar
export interface Holiday {
  date: Dayjs;
  name: string;
}