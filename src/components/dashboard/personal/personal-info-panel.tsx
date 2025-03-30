import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Paper,
  Grid,
  TextField,
  Divider,
  Button,
  IconButton,
  Stack,
  FormHelperText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Validation functions
const validateNationalId = (id: string): string | null => {
  // Tanzanian National ID validation (20 digits)
  if (!id) return "National ID is required";
  if (!/^\d{20}$/.test(id)) return "National ID must be 20 digits";
  return null;
};

const validateNSSF = (nssf: string): string | null => {
  // NSSF validation (typically 13 digits starting with NS or NSSF)
  if (!nssf) return "NSSF is required";
  if (!/^(NS|NSSF)?\d{13}$/.test(nssf)) return "NSSF must be 13 digits, may start with NS or NSSF";
  return null;
};

const validateTIN = (tin: string): string | null => {
  // TIN validation (9 digits for Tanzania)
  if (!tin) return "TIN is required";
  if (!/^\d{9}$/.test(tin)) return "TIN must be 9 digits";
  return null;
};

const validateDriverLicense = (license: string): string | null => {
  // Tanzania driver license (typically starts with T followed by 11 digits)
  if (!license) return "Driver license is required";
  if (!/^T\d{11}$/.test(license)) return "Driver license must start with T followed by 11 digits";
  return null;
};

const validatePhone = (phone: string): string | null => {
  // Tanzania phone number validation
  if (!phone) return "Phone number is required";
  if (!/^\+255-[67]\d{2}-\d{3}-\d{3}$/.test(phone)) 
    return "Phone number must be in format +255-7XX-XXX-XXX or +255-6XX-XXX-XXX";
  return null;
};

const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
  return null;
};

// Tanzanian regions
const tanzaniaRegions = [
  "Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", "Katavi",
  "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", "Mbeya", "Morogoro",
  "Mtwara", "Mwanza", "Njombe", "Pemba North", "Pemba South", "Pwani",
  "Rukwa", "Ruvuma", "Shinyanga", "Simiyu", "Singida", "Songwe", "Tabora",
  "Tanga", "Zanzibar Central/South", "Zanzibar North", "Zanzibar Urban/West"
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

interface ErrorState {
  nationalId: string | null;
  nssf: string | null;
  tin: string | null;
  driverLicense: string | null;
  phone: string | null;
  email: string | null;
  [key: string]: string | null;
}

// Define File interface for documents
interface FormDataType {
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
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    ward: string;
  };
  emergency: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
    github: string;
  };
  education: {
    institution: string;
    degree: string;
    field: string;
    year: number;
  };
  documents: File[];
}

export const PersonalInfoPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    fullName: "Emmanuel Muro",
    email: "emuro@sanku.com",
    phone: "+255-712-345-678",
    dob: "1990-01-01",
    nationality: "Tanzanian",
    maritalStatus: "Single",
    
    // Added fields for Tanzanian context
    nationalId: "12345678901234567890",
    nssf: "NSSF1234567890123",
    tin: "123456789",
    driverLicense: "T12345678901",
    
    // Address information
    address: {
      street: "123 Uhuru Street",
      city: "Dar es Salaam",
      region: "Dar es Salaam",
      postalCode: "12345",
      ward: "Kinondoni",
    },

    emergency: {
      name: "John Doe",
      relationship: "Brother",
      phone: "+255-700-123-456",
      email: "john@example.com",
    },

    social: {
      linkedin: "linkedin.com/in/emmanuel",
      twitter: "@emmanuel",
      facebook: "facebook.com/emmanuel",
      github: "github.com/emmanuelmuro",
    },

    education: {
      institution: "University of Dar es Salaam",
      degree: "BSc Computer Science",
      field: "Software Engineering",
      year: 2015,
    },

    documents: [],
  });

  const [errors, setErrors] = useState<ErrorState>({
    nationalId: null,
    nssf: null,
    tin: null,
    driverLicense: null,
    phone: null,
    email: null,
  });

  // Validate form before saving
  const validateForm = () => {
    const newErrors: ErrorState = {
      nationalId: validateNationalId(formData.nationalId),
      nssf: validateNSSF(formData.nssf),
      tin: validateTIN(formData.tin),
      driverLicense: validateDriverLicense(formData.driverLicense),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
    };

    setErrors(newErrors);
    
    // Check if there are any errors
    return !Object.values(newErrors).some(error => error !== null);
  };

  const handleChange = (
    section: string,
    key: string,
    value: string | number
  ) => {
    if (section === "main") {
      setFormData((prev) => ({ ...prev, [key]: value }));
      
      // Validate field after change
      if (key === "nationalId" || key === "nssf" || key === "tin" || 
          key === "driverLicense" || key === "phone" || key === "email") {
        let validationError = null;
        
        switch (key) {
          case "nationalId": 
            validationError = validateNationalId(value as string);
            break;
          case "nssf": 
            validationError = validateNSSF(value as string);
            break;
          case "tin": 
            validationError = validateTIN(value as string);
            break;
          case "driverLicense": 
            validationError = validateDriverLicense(value as string);
            break;
          case "phone": 
            validationError = validatePhone(value as string);
            break;
          case "email": 
            validationError = validateEmail(value as string);
            break;
        }
        
        setErrors(prev => ({
          ...prev,
          [key]: validationError
        }));
      }
    } else if (section === "address") {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof FormDataType] as Record<string, unknown>),
          [key]: value,
        },
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(files)],
      }));
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const isValid = validateForm();
    
    if (isValid) {
      console.log("Saved data:", formData);
      setIsEditing(false);
    } else {
      console.log("Form contains errors");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Personal Information</Typography>
        {!isEditing ? (
          <Button variant="outlined" onClick={toggleEdit}>Edit</Button>
        ) : (
          <Button variant="contained" onClick={handleSave}>Save</Button>
        )}
      </Stack>

      <Tabs
        value={activeTab}
        onChange={(e, v) => setActiveTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab label="Basic Info" />
        <Tab label="Identification" />
        <Tab label="Address" />
        <Tab label="Emergency Contact" />
        <Tab label="Social Links" />
        <Tab label="Education" />
        <Tab label="Documents" />
      </Tabs>

      {/* BASIC INFO */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => handleChange("main", "fullName", e.target.value)}
              fullWidth
              disabled={!isEditing}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) => handleChange("main", "email", e.target.value)}
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
              value={formData.phone}
              onChange={(e) => handleChange("main", "phone", e.target.value)}
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
              value={formData.dob}
              onChange={(e) => handleChange("main", "dob", e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled={!isEditing}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nationality"
              value={formData.nationality}
              onChange={(e) => handleChange("main", "nationality", e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Marital Status"
              value={formData.maritalStatus}
              onChange={(e) => handleChange("main", "maritalStatus", e.target.value)}
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
        </Grid>
      </TabPanel>

      {/* IDENTIFICATION - New Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="National ID Number"
              value={formData.nationalId}
              onChange={(e) => handleChange("main", "nationalId", e.target.value)}
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
              value={formData.nssf}
              onChange={(e) => handleChange("main", "nssf", e.target.value)}
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
              value={formData.tin}
              onChange={(e) => handleChange("main", "tin", e.target.value)}
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
              value={formData.driverLicense}
              onChange={(e) => handleChange("main", "driverLicense", e.target.value)}
              fullWidth
              disabled={!isEditing}
              error={!!errors.driverLicense}
              helperText={errors.driverLicense || 'Format: T11digits'}
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* ADDRESS - New Tab */}
      <TabPanel value={activeTab} index={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Street Address"
              value={formData.address.street}
              onChange={(e) => handleChange("address", "street", e.target.value)}
              fullWidth
              disabled={!isEditing}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City/Town"
              value={formData.address.city}
              onChange={(e) => handleChange("address", "city", e.target.value)}
              fullWidth
              disabled={!isEditing}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={!isEditing} required>
              <InputLabel>Region</InputLabel>
              <Select
                value={formData.address.region}
                label="Region"
                onChange={(e) => handleChange("address", "region", e.target.value)}
              >
                {tanzaniaRegions.map(region => (
                  <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code"
              value={formData.address.postalCode}
              onChange={(e) => handleChange("address", "postalCode", e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ward"
              value={formData.address.ward}
              onChange={(e) => handleChange("address", "ward", e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* EMERGENCY CONTACT */}
      <TabPanel value={activeTab} index={3}>
        <Typography variant="subtitle1" gutterBottom>Primary Contact</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              value={formData.emergency.name}
              onChange={(e) => handleChange("emergency", "name", e.target.value)}
              fullWidth
              disabled={!isEditing}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Relationship"
              value={formData.emergency.relationship}
              onChange={(e) => handleChange("emergency", "relationship", e.target.value)}
              fullWidth
              disabled={!isEditing}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              value={formData.emergency.phone}
              onChange={(e) => handleChange("emergency", "phone", e.target.value)}
              fullWidth
              disabled={!isEditing}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              value={formData.emergency.email}
              onChange={(e) => handleChange("emergency", "email", e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* SOCIAL LINKS */}
      <TabPanel value={activeTab} index={4}>
        <Grid container spacing={2}>
          {Object.entries(formData.social).map(([key, val]) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={val}
                onChange={(e) => handleChange("social", key, e.target.value)}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* EDUCATION */}
      <TabPanel value={activeTab} index={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Institution"
              value={formData.education.institution}
              onChange={(e) => handleChange("education", "institution", e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Degree"
              value={formData.education.degree}
              onChange={(e) => handleChange("education", "degree", e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field of Study"
              value={formData.education.field}
              onChange={(e) => handleChange("education", "field", e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Graduation Year"
              value={formData.education.year}
              onChange={(e) => handleChange("education", "year", e.target.value)}
              fullWidth
              type="number"
              disabled={!isEditing}
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* DOCUMENTS */}
      <TabPanel value={activeTab} index={6}>
        <Typography variant="body2" gutterBottom>
          Upload your documents (e.g., ID, Passport, Certificates)
        </Typography>
        {isEditing && (
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ mb: 2 }}
          >
            Upload File
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileUpload}
            />
          </Button>
        )}
        <ul>
          {formData.documents.map((doc: File, i: number) => (
            <li key={i}>{doc.name}</li>
          ))}
        </ul>
      </TabPanel>
    </Paper>
  );
};