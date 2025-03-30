// BasicInfoForm.tsx
import React from 'react';
import {
  Grid,
  TextField,
  MenuItem,
} from '@mui/material';
import { ErrorState, validateEmail, validatePhone } from './types';

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
    <Grid container spacing={2}>
      {/* Basic Information Section */}
      <Grid item xs={12}>
        <h3>Personal Details</h3>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(e) => onChange("main", "fullName", e.target.value)}
          fullWidth
          disabled={!isEditing}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
      </Grid>
      <Grid item xs={12} sm={6}>
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
      </Grid>
      <Grid item xs={12} sm={6}>
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
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Nationality"
          value={nationality}
          onChange={(e) => onChange("main", "nationality", e.target.value)}
          fullWidth
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
      </Grid>

      {/* Identification Section */}
      <Grid item xs={12}>
        <h3>Identification</h3>
      </Grid>
      <Grid item xs={12} sm={6}>
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
      </Grid>
      <Grid item xs={12} sm={6}>
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
      </Grid>
      <Grid item xs={12} sm={6}>
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
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Driver's License Number"
          value={driverLicense}
          onChange={(e) => onChange("main", "driverLicense", e.target.value)}
          fullWidth
          disabled={!isEditing}
          error={!!errors.driverLicense}
          helperText={errors.driverLicense || 'Format: T11digits'}
        />
      </Grid>
    </Grid>
  );
};

export default BasicInfoForm;