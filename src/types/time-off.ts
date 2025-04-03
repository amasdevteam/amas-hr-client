// types/timeOff.ts

export type TimeOffType = 'vacation' | 'sick' | 'workFromHome';

export interface TimeOffBalances {
  vacation: number;
  sick: number;
  workFromHome: number;
}

export interface TimeOffTaken {
  vacation: number;
  sick: number;
  workFromHome: number;
}

export interface TimeOffPercentages {
  vacation: number;
  sick: number;
  workFromHome: number;
}

export interface AccrualRecord {
  month: string;           // 'Jan', 'Feb', etc.
  accrued: number;         // e.g. 1.67
  taken: number;           // e.g. 0.5
  overdrawn: boolean;      // true if taken > accrued
}

export interface AccrualHistory {
  vacation: AccrualRecord[];
  sick: AccrualRecord[];
  workFromHome: AccrualRecord[];
}

export interface TimeOffSummaryResponse {
  balances: TimeOffBalances;
  taken: TimeOffTaken;
  percentages: TimeOffPercentages;
  accrualHistory: AccrualHistory;
}
