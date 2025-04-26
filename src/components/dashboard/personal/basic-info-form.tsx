import React from 'react';
import { TextField, MenuItem, Box } from '@mui/material';
import { ErrorState } from './types';

interface BasicInfoFormProps {
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
  errors: ErrorState;
  isEditing: boolean;
  onChange: (section: string, key: string, value: string | number) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  fullName,
  email,
  phone,
  dob,
  nationality,
  maritalStatus,
  nationalId,
  nssf,
  tin,
  driverLicense,
  errors,
  isEditing,
  onChange
}) => {
  return (
    <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
      {/* Section Title */}
      <Box gridColumn="1 / -1">
        <h3>Personal Details</h3>
      </Box>

      {/* Personal Details Fields */}
      <TextField
        label="Full Name"
        value={fullName}
        onChange={(e) => onChange("main", "fullName", e.target.value)}
        fullWidth
        disabled={!isEditing}
        required
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => onChange("main", "email", e.target.value)}
        fullWidth
        disabled={!isEditing}
        required
        error={!!errors.email}
        helperText={errors.email || ''}
      />
      <TextField
        label="Phone Number"
        value={phone}
        onChange={(e) => onChange("main", "phone", e.target.value)}
        fullWidth
        disabled={!isEditing}
        required
        error={!!errors.phone}
        helperText={errors.phone || 'Format: +255-7XX-XXX-XXX'}
      />
      <TextField
        label="Date of Birth"
        type="date"
        value={dob}
        onChange={(e) => onChange("main", "dob", e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        disabled={!isEditing}
        required
      />
      <TextField
        label="Nationality"
        value={nationality}
        onChange={(e) => onChange("main", "nationality", e.target.value)}
        fullWidth
        disabled={!isEditing}
      />
      <TextField
        label="Marital Status"
        value={maritalStatus}
        onChange={(e) => onChange("main", "maritalStatus", e.target.value)}
        fullWidth
        disabled={!isEditing}
        select
      >
        <MenuItem value="Single">Single</MenuItem>
        <MenuItem value="Married">Married</MenuItem>
        <MenuItem value="Divorced">Divorced</MenuItem>
        <MenuItem value="Widowed">Widowed</MenuItem>
      </TextField>

      {/* Section Title */}
      <Box gridColumn="1 / -1">
        <h3>Identification</h3>
      </Box>

      {/* Identification Fields */}
      <TextField
        label="National ID Number"
        value={nationalId}
        onChange={(e) => onChange("main", "nationalId", e.target.value)}
        fullWidth
        disabled={!isEditing}
        required
        error={!!errors.nationalId}
        helperText={errors.nationalId || '20 digits required'}
      />
      <TextField
        label="NSSF Number"
        value={nssf}
        onChange={(e) => onChange("main", "nssf", e.target.value)}
        fullWidth
        disabled={!isEditing}
        required
        error={!!errors.nssf}
        helperText={errors.nssf || 'Format: NSSF13digits or NS13digits or 13digits'}
      />
      <TextField
        label="TIN (Tax Identification Number)"
        value={tin}
        onChange={(e) => onChange("main", "tin", e.target.value)}
        fullWidth
        disabled={!isEditing}
        required
        error={!!errors.tin}
        helperText={errors.tin || '9 digits required'}
      />
      <TextField
        label="Driver's License Number"
        value={driverLicense}
        onChange={(e) => onChange("main", "driverLicense", e.target.value)}
        fullWidth
        disabled={!isEditing}
        error={!!errors.driverLicense}
        helperText={errors.driverLicense || 'Format: T11digits'}
      />
    </Box>
  );
};

export default BasicInfoForm;
