// Time Off Calendar DTO Types

// Event type enum
export type CalendarEventType = 'vacation' | 'sick' | 'wfh' | 'holiday' | 'meeting';

// Event status enum
export type EventStatus = 'approved' | 'pending' | 'rejected';

// Calendar event data transfer object
export interface CalendarEventDTO {
  id: string;
  tenantId: string;
  employeeId?: string;
  date: string; // ISO format date (YYYY-MM-DD)
  endDate?: string; // ISO format date (YYYY-MM-DD), for multi-day events
  title: string;
  description?: string;
  type: CalendarEventType;
  status?: EventStatus;
  isAllDay: boolean;
  createdAt: string; // ISO format date-time
  updatedAt: string; // ISO format date-time
}

// Calendar day data transfer object
export interface CalendarDayDTO {
  date: string; // ISO format date (YYYY-MM-DD)
  dayOfMonth: number; // 1-31
  dayOfWeek: number; // 0-6 (0 = Sunday)
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isHoliday: boolean;
  holidayName?: string;
  events: CalendarEventDTO[];
}

// Calendar week data transfer object
export interface CalendarWeekDTO {
  weekNumber: number;
  days: CalendarDayDTO[];
}

// Calendar month data transfer object
export interface CalendarMonthDTO {
  tenantId: string;
  year: number;
  month: number; // 1-12
  monthName: string;
  weeks: CalendarWeekDTO[];
  totalEvents: number;
  summary: {
    vacation: number;
    sick: number;
    wfh: number;
    holiday: number;
    meeting: number;
  };
}

// Calendar request parameters
export interface CalendarRequestParams {
  tenantId: string;
  year: number;
  month: number; // 1-12
  employeeId?: string; // Optional - if viewing a specific employee's calendar
  teamId?: string; // Optional - if viewing team calendar
  includeHolidays?: boolean; // Default: true
  includeMeetings?: boolean; // Default: true
  includeTeamEvents?: boolean; // Default: false (only include employee's events)
  filters?: {
    types?: CalendarEventType[];
    status?: EventStatus[];
  };
}

// Calendar response
export interface CalendarResponse {
  calendar: CalendarMonthDTO;
}

// Create calendar event request
export interface CreateCalendarEventRequest {
  tenantId: string;
  employeeId: string;
  date: string; // ISO format date (YYYY-MM-DD)
  endDate?: string; // ISO format date (YYYY-MM-DD)
  title: string;
  description?: string;
  type: CalendarEventType;
  isAllDay: boolean;
  recurring?: boolean;
  recurringPattern?: string; // e.g., "RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE,FR"
}

// Update calendar event request
export interface UpdateCalendarEventRequest {
  id: string;
  tenantId: string;
  date?: string; // ISO format date (YYYY-MM-DD)
  endDate?: string; // ISO format date (YYYY-MM-DD)
  title?: string;
  description?: string;
  type?: CalendarEventType;
  status?: EventStatus;
  isAllDay?: boolean;
}

// Delete calendar event request
export interface DeleteCalendarEventRequest {
  id: string;
  tenantId: string;
  deleteAllRecurring?: boolean; // Default: false
}