// DTO Types for Team Absences Component

// Base types
export type AbsenceType = 'vacation' | 'sick' | 'wfh';
export type AbsenceStatus = 'approved' | 'pending' | 'rejected' | 'cancelled';

// Employee information for team display
export interface TeamMemberDTO {
  id: string;
  tenantId: string;
  name: string;
  avatarUrl?: string;
  email?: string;
  department?: string;
  position?: string;
  managerId?: string;
}

// Absence information for a team member
export interface AbsenceDTO {
  id: string;
  tenantId: string;
  employeeId: string;
  type: AbsenceType;
  startDate: string; // ISO format date
  endDate?: string; // ISO format date
  status: AbsenceStatus;
  reason?: string;
  comments?: string;
  approvedById?: string;
  approvedAt?: string; // ISO format date-time
  createdAt: string; // ISO format date-time
  updatedAt: string; // ISO format date-time
}

// Combined data for display in the team absences component
export interface TeamMemberAbsenceDTO {
  id: string;
  name: string;
  avatarUrl?: string;
  department?: string;
  position?: string;
  absence: {
    id: string;
    type: AbsenceType;
    startDate: string;
    endDate?: string;
    status: AbsenceStatus;
  };
}

// Request parameters for filtering absences
export interface TeamAbsencesRequestParams {
  tenantId: string;
  startDate?: string; // ISO format date for filtering
  endDate?: string; // ISO format date for filtering
  status?: AbsenceStatus | AbsenceStatus[]; // Filter by status
  types?: AbsenceType | AbsenceType[]; // Filter by absence type
  departmentId?: string; // Filter by department
  managerId?: string; // Filter by manager (for viewing a manager's team)
  page?: number;
  limit?: number;
}

// Response for team absences list
export interface TeamAbsencesResponse {
  tenantId: string;
  data: TeamMemberAbsenceDTO[];
  summary: {
    vacation: number;
    sick: number;
    wfh: number;
    total: number;
  };
  pagination?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

// Request for subscribing to team absences updates
export interface TeamAbsencesSubscriptionRequest {
  tenantId: string;
  filter?: {
    departmentId?: string;
    managerId?: string;
    startDate?: string;
    endDate?: string;
  };
}

// Event notification for real-time updates
export interface AbsenceUpdateEvent {
  tenantId: string;
  eventType: 'created' | 'updated' | 'cancelled';
  absenceId: string;
  employeeId: string;
  timestamp: string; // ISO format date-time
}