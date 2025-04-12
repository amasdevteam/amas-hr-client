// types/BasicInfo.ts

export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed';

export interface BasicInfoPayload {
  fullName: string;
  email: string;
  phone: string;
  dob: string; // ISO format YYYY-MM-DD
  nationality: string;
  maritalStatus: MaritalStatus;
  nationalId: string;
  nssf: string;
  tin: string;
  driverLicense: string;
}

export interface BasicInfoResponse {
  success: boolean;
  data: BasicInfoPayload;
}
