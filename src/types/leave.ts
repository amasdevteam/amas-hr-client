// File: src/types/index.ts
export interface LeaveBalance {
    id: string;
    type: string;
    available: number;
    used: number;
    total: number;
    icon: string;
    color: string;
  }
  
  export interface TimeOffEvent {
    id: string;
    date: string;
    dateRange?: string;
    description: string;
    type: 'Holiday' | 'Vacation' | 'Sick' | 'WFH' | 'Other';
    status: 'confirmed' | 'pending' | 'approved' | 'rejected';
  }
  
  export interface TeamMember {
    id: string;
    name: string;
    position: string;
    department: string;
    avatar?: string;
    timeOff?: {
      date: string;
      type: string;
    };
  }
  
  export interface LeaveRequest {
    id: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    halfDay: boolean;
    reason?: string;
    documents?: File[];
    status: 'draft' | 'pending' | 'approved' | 'rejected';
  }