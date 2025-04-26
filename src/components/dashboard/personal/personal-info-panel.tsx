import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Paper,
  Stack,
  Button,
} from "@mui/material";

// Import components
import BasicInfoForm from './basic-info-form';
import AddressForm from './address-form';
import EmergencyContactForm from './emergency-contact-form';
import EducationForm from './education-form';
import DocumentsForm from './documents-form';

// Import types
import { 
  TabPanel, 
  FormDataType, 
  ErrorState, 
  validatePhone,
  validateEmail,
  validateNationalId,
  validateNSSF,
  validateTIN,
  validateDriverLicense
} from './types';

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
    nationalId: "12345678901234567890",
    nssf: "NSSF1234567890123",
    tin: "123456789",
    driverLicense: "T12345678901",
    addresses: [
      {
        street: "123 Uhuru Street",
        city: "Dar es Salaam",
        region: "Dar es Salaam",
        postalCode: "12345",
        ward: "Kinondoni",
        isPrimary: true,
      }
    ],
    emergencyContacts: [
      {
        name: "John Doe",
        relationship: "Brother",
        phone: "+255-700-123-456",
        email: "john@example.com",
      }
    ],
    educations: [
      {
        institution: "University of Dar es Salaam",
        degree: "BSc Computer Science",
        field: "Software Engineering",
        year: 2015,
        isPrimary: true
      }
    ],
    documents: [],
    socialMediaAccounts: [], // Add this property to match the FormDataType
  });

  const [errors, setErrors] = useState<ErrorState>({
    nationalId: null,
    nssf: null,
    tin: null,
    driverLicense: null,
    phone: null,
    email: null,
  });

  // Address Handlers
  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, {
        street: "",
        city: "",
        region: "",
        postalCode: "",
        ward: "",
        isPrimary: false
      }]
    }));
  };

  const removeAddress = (index: number) => {
    if (formData.addresses.length <= 1) return;

    const isPrimaryRemoved = formData.addresses[index].isPrimary;
    const updatedAddresses = formData.addresses.filter((_, i) => i !== index);

    if (isPrimaryRemoved && updatedAddresses.length > 0) {
      updatedAddresses[0].isPrimary = true;
    }

    setFormData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
  };

  const setPrimaryAddress = (index: number) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.map((addr, i) => ({
        ...addr,
        isPrimary: i === index
      }))
    }));
  };

  // Emergency Contact Handlers
  const addEmergencyContact = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, {
        name: "",
        relationship: "",
        phone: "",
        email: ""
      }]
    }));
  };

  const removeEmergencyContact = (index: number) => {
    if (formData.emergencyContacts.length <= 1) return;

    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
    }));
  };

  // Education Handlers
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      educations: [...prev.educations, {
        institution: "",
        degree: "",
        field: "",
        year: new Date().getFullYear(),
        isPrimary: false
      }]
    }));
  };

  const removeEducation = (index: number) => {
    if (formData.educations.length <= 1) return;

    const isPrimaryRemoved = formData.educations[index].isPrimary;
    const updatedEducations = formData.educations.filter((_, i) => i !== index);

    if (isPrimaryRemoved && updatedEducations.length > 0) {
      updatedEducations[0].isPrimary = true;
    }

    setFormData(prev => ({
      ...prev,
      educations: updatedEducations
    }));
  };

  const setPrimaryEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      educations: prev.educations.map((edu, i) => ({
        ...edu,
        isPrimary: i === index
      }))
    }));
  };

  // Document Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(files)],
      }));
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  // Change Handler
  const handleChange = (section: string, key: string, value: string | number, index?: number) => {
    if (section === "main") {
      setFormData(prev => ({ ...prev, [key]: value }));

      // Re-validate
      if (key in errors) {
        let validationError = null;
        switch (key) {
          case "nationalId": validationError = validateNationalId(value as string); break;
          case "nssf": validationError = validateNSSF(value as string); break;
          case "tin": validationError = validateTIN(value as string); break;
          case "driverLicense": validationError = validateDriverLicense(value as string); break;
          case "phone": validationError = validatePhone(value as string); break;
          case "email": validationError = validateEmail(value as string); break;
        }
        setErrors(prev => ({ ...prev, [key]: validationError }));
      }
    } else if (section === "addresses" && index !== undefined) {
      setFormData(prev => ({
        ...prev,
        addresses: prev.addresses.map((addr, i) => i === index ? { ...addr, [key]: value } : addr)
      }));
    } else if (section === "emergencyContacts" && index !== undefined) {
      setFormData(prev => ({
        ...prev,
        emergencyContacts: prev.emergencyContacts.map((contact, i) => i === index ? { ...contact, [key]: value } : contact)
      }));
    } else if (section === "educations" && index !== undefined) {
      setFormData(prev => ({
        ...prev,
        educations: prev.educations.map((edu, i) => i === index ? { ...edu, [key]: value } : edu)
      }));
    }
  };

  // Form Validation
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
    return !Object.values(newErrors).some(error => error !== null);
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = () => {
    if (validateForm()) {
      console.log("Saved data:", formData);
      setIsEditing(false);
    } else {
      console.log("Form contains errors");
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab label="Basic Info" />
        <Tab label="Address" />
        <Tab label="Emergency Contact" />
        <Tab label="Education" />
        <Tab label="Documents" />
      </Tabs>

      <Box sx={{ p: 2 }}>
        <TabPanel value={activeTab} index={0}>
          <BasicInfoForm {...formData} errors={errors} isEditing={isEditing} onChange={handleChange} />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <AddressForm
            addresses={formData.addresses}
            isEditing={isEditing}
            onAddAddress={addAddress}
            onRemoveAddress={removeAddress}
            onSetPrimaryAddress={setPrimaryAddress}
            onChange={handleChange}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <EmergencyContactForm
            contacts={formData.emergencyContacts}
            isEditing={isEditing}
            onAddContact={addEmergencyContact}
            onRemoveContact={removeEmergencyContact}
            onChange={handleChange}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <EducationForm
            educations={formData.educations}
            isEditing={isEditing}
            onAddEducation={addEducation}
            onRemoveEducation={removeEducation}
            onSetPrimaryEducation={setPrimaryEducation}
            onChange={handleChange}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <DocumentsForm
            documents={formData.documents}
            isEditing={isEditing}
            onDocumentUpload={handleFileUpload}
            onRemoveDocument={removeDocument}
          />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default PersonalInfoPanel;
