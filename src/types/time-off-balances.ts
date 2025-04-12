// DTO Types for Time Off Balances Component

// Time off types
export type TimeOffType = 'vacation' | 'sick' | 'wfh';

// Balance information
export interface TimeOffBalanceDTO {
  tenantId: string;
  employeeId: string;
  type: TimeOffType;
  balanceRemaining: number;
  balanceTotal: number;
  balanceUsed: number;
  accrualRate: number;
  percentageRemaining: number;
  lastAccrualDate: string; // ISO date string
  nextAccrualDate: string; // ISO date string
  carryOverLimit: number;
  carryOverExpiration?: string; // ISO date string
  periodStartDate: string; // ISO date string
  periodEndDate: string; // ISO date string
  updatedAt: string; // ISO date-time string
}

// Summary balance information for all time off types
export interface EmployeeBalanceSummaryDTO {
  tenantId: string;
  employeeId: string;
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
  accrualRates: {
    vacation: number;
    sick: number;
    workFromHome: number;
  };
}

// Monthly accrual data for time off chart
export interface TimeOffAccrualDataPointDTO {
  month: string; // Three-letter month abbreviation
  year: number;
  accrued: number;
  taken: number;
  balance: number;
  overdrawn: boolean;
}

// Full accrual data for a specific time off type
export interface TimeOffAccrualHistoryDTO {
  tenantId: string;
  employeeId: string;
  type: TimeOffType;
  currentYear: number;
  accrualRate: number;
  carryOverFromPreviousYear: number;
  data: TimeOffAccrualDataPointDTO[];
}

// Request parameters for fetching time off balances
export interface TimeOffBalancesRequestParams {
  tenantId: string;
  employeeId: string;
  year?: number; // Optional year for historical data
  includeAccrualHistory?: boolean;
  includeProjections?: boolean;
}

// Response for time off balance information
export interface TimeOffBalancesResponse {
  tenantId: string;
  employeeId: string;
  employeeName: string;
  summary: EmployeeBalanceSummaryDTO;
  accrualHistory: {
    vacation: TimeOffAccrualHistoryDTO;
    sick: TimeOffAccrualHistoryDTO;
    workFromHome: TimeOffAccrualHistoryDTO;
  };
  projectedBalances?: {
    vacation: number;
    sick: number;
    workFromHome: number;
    asOfDate: string; // ISO date string
  };
}

// Request parameters for time off history
export interface TimeOffHistoryRequestParams {
  tenantId: string;
  employeeId: string;
  type?: TimeOffType;
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  page?: number;
  limit?: number;
}

// Single time off history entry
export interface TimeOffHistoryEntryDTO {
  id: string;
  tenantId: string;
  employeeId: string;
  type: TimeOffType;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  duration: number;
  status: 'approved' | 'pending' | 'cancelled' | 'rejected';
  requestDate: string; // ISO date-time string
  approvalDate?: string; // ISO date-time string
  approvedBy?: string;
  reason?: string;
  comments?: string;
}

// Response for time off history
export interface TimeOffHistoryResponse {
  tenantId: string;
  employeeId: string;
  data: TimeOffHistoryEntryDTO[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

// Request for time off accrual adjustments
export interface TimeOffAccrualAdjustmentRequestDTO {
  tenantId: string;
  employeeId: string;
  type: TimeOffType;
  amount: number;
  reason: string;
  effectiveDate: string; // ISO date string
  comments?: string;
}

// Response for time off accrual adjustment
export interface TimeOffAccrualAdjustmentResponseDTO {
  id: string;
  tenantId: string;
  employeeId: string;
  type: TimeOffType;
  amount: number;
  reason: string;
  effectiveDate: string; // ISO date string
  comments?: string;
  previousBalance: number;
  newBalance: number;
  adjustedBy: string;
  adjustedAt: string; // ISO date-time string
}

// Request for time off accrual policy settings
export interface TimeOffAccrualPolicyRequestDTO {
  tenantId: string;
  type: TimeOffType;
  accrualRate: number;
  accrualFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';
  maxBalance?: number;
  carryOverLimit?: number;
  carryOverExpiration?: 'none' | '3months' | '6months' | 'endOfYear';
  eligibilityWaitingPeriod?: number; // Days
  proRatedFirstYear?: boolean;
  accrualDayOfMonth?: number; // For monthly accruals
  accrualDayOfWeek?: number; // For weekly/biweekly accruals
}

// Accrual policy settings response
export interface TimeOffAccrualPolicyResponseDTO {
  id: string;
  tenantId: string;
  type: TimeOffType;
  accrualRate: number;
  accrualFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';
  maxBalance?: number;
  carryOverLimit?: number;
  carryOverExpiration?: 'none' | '3months' | '6months' | 'endOfYear';
  eligibilityWaitingPeriod?: number;
  proRatedFirstYear?: boolean;
  accrualDayOfMonth?: number;
  accrualDayOfWeek?: number;
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
  effectiveDate: string; // ISO date string
  expirationDate?: string; // ISO date string
}