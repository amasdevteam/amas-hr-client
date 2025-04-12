// Time Off Content DTO Types

// Shared types
export type TimeOffType = 'vacation' | 'sick' | 'wfh' | 'holiday' | 'meeting';
export type EventStatus = 'approved' | 'pending' | 'rejected' | 'cancelled';

// Basic event type
export interface TimeOffEventDTO {
  id: string;
  tenantId: string;
  employeeId?: string;
  date: string; // ISO format date
  endDate?: string; // ISO format date
  title: string;
  type: TimeOffType;
  status?: EventStatus;
  isEditable: boolean;
  isCancellable: boolean;
  createdAt: string; // ISO format date-time
  updatedAt: string; // ISO format date-time
}

// Balance data structure
export interface TimeOffBalancesDTO {
  tenantId: string;
  employeeId: string;
  balances: {
    vacation: number;
    sick: number;
    workFromHome: number;
  };
  asOfDate: string; // ISO format date
}

// Upcoming events request parameters
export interface UpcomingEventsRequestParams {
  tenantId: string;
  employeeId?: string; // Optional - defaults to authenticated user
  limit?: number; // Optional - number of events to return
  includeHolidays?: boolean; // Optional - whether to include holidays
  includeTeamEvents?: boolean; // Optional - whether to include team events
}

// Upcoming events response
export interface UpcomingEventsResponse {
  tenantId: string;
  events: TimeOffEventDTO[];
}

// Calendar events request parameters
export interface CalendarEventsRequestParams {
  tenantId: string;
  year: number;
  month: number; // 1-12
  employeeId?: string; // Optional - defaults to authenticated user
  includeHolidays?: boolean; // Optional - whether to include holidays
  includeTeamEvents?: boolean; // Optional - whether to include team events
}

// Calendar events response
export interface CalendarEventsResponse {
  tenantId: string;
  year: number;
  month: number;
  events: TimeOffEventDTO[];
}

// Edit event request
export interface EditEventRequestDTO {
  id: string;
  tenantId: string;
  date?: string; // ISO format date
  endDate?: string; // ISO format date
  title?: string;
  reason?: string;
}

// Cancel event request
export interface CancelEventRequestDTO {
  id: string;
  tenantId: string;
  reason?: string;
}

// Content dashboard data
export interface TimeOffContentDashboardDTO {
  tenantId: string;
  balances: TimeOffBalancesDTO;
  upcomingEvents: TimeOffEventDTO[];
  calendarEvents: TimeOffEventDTO[];
  permissions: {
    canEditEvents: boolean;
    canCancelEvents: boolean;
    canRequestTimeOff: boolean;
    canViewHistory: boolean;
  };
}