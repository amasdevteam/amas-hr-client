import React from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { EmergencyContact } from './types';

interface EmergencyContactFormProps {
  contacts: EmergencyContact[];
  isEditing: boolean;
  onAddContact: () => void;
  onRemoveContact: (index: number) => void;
  onChange: (section: string, key: string, value: string | number, index?: number) => void;
}

const EmergencyContactForm: React.FC<EmergencyContactFormProps> = ({
  contacts,
  isEditing,
  onAddContact,
  onRemoveContact,
  onChange
}) => {
  return (
    <div>
      {contacts.map((contact, index) => (
        <Box 
          key={index}
          sx={{ 
            mb: 4, 
            pb: 2, 
            borderBottom: index < contacts.length - 1 ? '1px solid #e0e0e0' : 'none',
            position: 'relative'
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1">
              {`Emergency Contact ${index + 1}`}
            </Typography>
            {isEditing && contacts.length > 1 && (
              <Button 
                size="small" 
                color="error" 
                variant="outlined"
                onClick={() => onRemoveContact(index)}
                startIcon={<DeleteOutlineIcon />}
              >
                Remove
              </Button>
            )}
          </Stack>

          {/* CSS Grid layout for the form fields */}
          <Box 
            display="grid"
            gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
            gap={2}
          >
            <TextField
              label="Name"
              value={contact.name}
              onChange={(e) => onChange("emergencyContacts", "name", e.target.value, index)}
              fullWidth
              disabled={!isEditing}
              required
            />
            <TextField
              label="Relationship"
              value={contact.relationship}
              onChange={(e) => onChange("emergencyContacts", "relationship", e.target.value, index)}
              fullWidth
              disabled={!isEditing}
              required
            />
            <TextField
              label="Phone Number"
              value={contact.phone}
              onChange={(e) => onChange("emergencyContacts", "phone", e.target.value, index)}
              fullWidth
              disabled={!isEditing}
              required
            />
            <TextField
              label="Email"
              value={contact.email}
              onChange={(e) => onChange("emergencyContacts", "email", e.target.value, index)}
              fullWidth
              disabled={!isEditing}
            />
          </Box>
        </Box>
      ))}

      {isEditing && (
        <Button 
          variant="outlined" 
          startIcon={<AddIcon />} 
          onClick={onAddContact}
          sx={{ mt: 2 }}
          fullWidth
        >
          Add Another Emergency Contact
        </Button>
      )}
    </div>
  );
};

export default EmergencyContactForm;
