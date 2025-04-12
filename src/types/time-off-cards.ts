// Time Off Cards DTO Types

// Type of time off
export type TimeOffType = 'vacation' | 'sick' | 'wfh';

// Balance information for each card
export interface TimeOffBalanceDTO {
  tenantId: string;
  employeeId: string;
  type: TimeOffType;
  available: number;
  used: number;
  total: number;
  accrualRate: number;
  percentageAvailable: number;
  lastUpdated: string; // ISO format date-time
}

// Summary of all balances for the dashboard
export interface TimeOffBalanceSummaryDTO {
  tenantId: string;
  employeeId: string;
  employeeName: string;
  balances: {
    vacation: TimeOffBalanceDTO;
    sick: TimeOffBalanceDTO;
    wfh: TimeOffBalanceDTO;
  };
  lastAccrualDate: string; // ISO format date
  nextAccrualDate: string; // ISO format date
}

// Details for a specific time off type's color and display properties
export interface TimeOffTypeDisplayConfigDTO {
  type: TimeOffType;
  label: string;
  description: string;
  iconName: string;
  color: string;
  backgroundColor: string;
}

// Request parameters for fetching balances
export interface TimeOffBalancesRequestParams {
  tenantId: string;
  employeeId?: string; // Optional - defaults to authenticated user
  includeProjections?: boolean; // Optional - include future balance projections
}

// Response for time off balances
export interface TimeOffBalancesResponse {
  data: TimeOffBalanceSummaryDTO;
  typeConfigs: {
    vacation: TimeOffTypeDisplayConfigDTO;
    sick: TimeOffTypeDisplayConfigDTO;
    wfh: TimeOffTypeDisplayConfigDTO;
  };
  canRequest: boolean;
  canViewHistory: boolean;
}

// Request for creating new time off request from card
export interface CreateTimeOffRequestDTO {
  tenantId: string;
  employeeId: string;
  type: TimeOffType;
  startDate: string; // ISO format date
  endDate: string; // ISO format date
  reason?: string;
  allDay: boolean;
}