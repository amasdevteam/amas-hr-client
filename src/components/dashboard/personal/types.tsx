// types.ts
import React, { ReactNode } from 'react';

// Tanzanian regions
export const tanzaniaRegions = [
  "Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", "Katavi",
  "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", "Mbeya", "Morogoro",
  "Mtwara", "Mwanza", "Njombe", "Pemba North", "Pemba South", "Pwani",
  "Rukwa", "Ruvuma", "Shinyanga", "Simiyu", "Singida", "Songwe", "Tabora",
  "Tanga", "Zanzibar Central/South", "Zanzibar North", "Zanzibar Urban/West"
];

// Validation functions
export const validateNationalId = (id: string): string | null => {
  // Tanzanian National ID validation (20 digits)
  if (!id) return "National ID is required";
  if (!/^\d{20}$/.test(id)) return "National ID must be 20 digits";
  return null;
};

export const validateNSSF = (nssf: string): string | null => {
  // NSSF validation (typically 13 digits starting with NS or NSSF)
  if (!nssf) return "NSSF is required";
  if (!/^(NS|NSSF)?\d{13}$/.test(nssf)) return "NSSF must be 13 digits, may start with NS or NSSF";
  return null;
};

export const validateTIN = (tin: string): string | null => {
  // TIN validation (9 digits for Tanzania)
  if (!tin) return "TIN is required";
  if (!/^\d{9}$/.test(tin)) return "TIN must be 9 digits";
  return null;
};

export const validateDriverLicense = (license: string): string | null => {
  // Tanzania driver license (typically starts with T followed by 11 digits)
  if (!license) return "Driver license is required";
  if (!/^T\d{11}$/.test(license)) return "Driver license must start with T followed by 11 digits";
  return null;
};

export const validatePhone = (phone: string): string | null => {
  // Tanzania phone number validation
  if (!phone) return "Phone number is required";
  if (!/^\+255-[67]\d{2}-\d{3}-\d{3}$/.test(phone)) 
    return "Phone number must be in format +255-7XX-XXX-XXX or +255-6XX-XXX-XXX";
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
  return null;
};

// Interface definitions
export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export interface ErrorState {
  nationalId: string | null;
  nssf: string | null;
  tin: string | null;
  driverLicense: string | null;
  phone: string | null;
  email: string | null;
  [key: string]: string | null;
}

// Address interface
export interface Address {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  ward: string;
  isPrimary: boolean;
}

// Emergency contact interface
export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

// Social media interface
export interface SocialMedia {
  linkedin: string;
  twitter: string;
  facebook: string;
  github: string;
  platform: string;
  url: string;
}

// Education interface
export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: number;
  isPrimary?: boolean; 
}

// Main form data type

export interface FormDataType {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  nationality: string;
  maritalStatus: string;
  nationalId: string;
  nssf: string;
  tin: string;
  driverLicense: string;
  addresses: Address[];
  emergencyContacts: EmergencyContact[];
  socialMediaAccounts: SocialMedia[]; // Updated to match the formData structure
  educations: Education[];
  documents: File[];
}

export type SocialMediaAccount = {
  platform: string;
  url: string;
};


// TabPanel component
export function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div style={{ display: value !== index ? 'none' : 'block' }}>
      {value === index ? children : null}
    </div>
  );
}