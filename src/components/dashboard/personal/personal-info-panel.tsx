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
} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export const PersonalInfoPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  interface FormData {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    nationality: string;
    maritalStatus: string;
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

  const [formData, setFormData] = useState<FormData>({
    fullName: "Emmanuel Muro",
    email: "emuro@sanku.com",
    phone: "+255-712-345-678",
    dob: "1990-01-01",
    nationality: "Tanzanian",
    maritalStatus: "Single",

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


  const handleChange = (
    section: keyof FormData | "main",
    key: string,
    value: string | number
  ) => {
    if (section === "main") {
      setFormData((prev) => ({ ...prev, [key]: value }));
    } else {
      setFormData((prev) => {
        const sectionData = prev[section];
        if (typeof sectionData === "object" && sectionData !== null) {
          return {
            ...prev,
            [section]: {
              ...sectionData,
              [key]: value,
            },
          };
        }
        return prev;
      });
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
    console.log("Saved data:", formData);
    setIsEditing(false);
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) => handleChange("main", "email", e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange("main", "phone", e.target.value)}
              fullWidth
              disabled={!isEditing}
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
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* EMERGENCY CONTACT */}
      <TabPanel value={activeTab} index={1}>
        <Typography variant="subtitle1" gutterBottom>Primary Contact</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              value={formData.emergency.name}
              onChange={(e) => handleChange("emergency", "name", e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Relationship"
              value={formData.emergency.relationship}
              onChange={(e) => handleChange("emergency", "relationship", e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              value={formData.emergency.phone}
              onChange={(e) => handleChange("emergency", "phone", e.target.value)}
              fullWidth
              disabled={!isEditing}
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
      <TabPanel value={activeTab} index={2}>
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
      <TabPanel value={activeTab} index={3}>
        <Divider sx={{ my: 1 }} />
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
      <TabPanel value={activeTab} index={4}>
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
