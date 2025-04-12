// EducationForm.tsx
import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Stack,
  Typography,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Education } from './types';

interface EducationFormProps {
  educations: Education[];
  isEditing: boolean;
  onAddEducation: () => void;
  onRemoveEducation: (index: number) => void;
  onSetPrimaryEducation: (index: number) => void;
  onChange: (section: string, key: string, value: string | number, index?: number) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
  educations,
  isEditing,
  onAddEducation,
  onRemoveEducation,
  onSetPrimaryEducation,
  onChange
}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div>
      {educations.map((education, index) => (
        <Box 
          key={index} 
          sx={{ 
            mb: 4, 
            pb: 2, 
            borderBottom: index < educations.length - 1 ? '1px solid #e0e0e0' : 'none',
            position: 'relative'
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="subtitle1">
                {education.isPrimary ? "Primary Education" : `Education ${index + 1}`}
              </Typography>
              {education.isPrimary && (
                <Chip 
                  icon={<CheckCircleIcon />} 
                  label="Primary" 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
              )}
            </Stack>
            <Stack direction="row" spacing={1}>
              {isEditing && (
                <>
                  {!education.isPrimary && (
                    <Button 
                      size="small" 
                      onClick={() => onSetPrimaryEducation(index)}
                      variant="outlined"
                    >
                      Set as Primary
                    </Button>
                  )}
                  {educations.length > 1 && (
                    <Button 
                      size="small" 
                      color="error" 
                      variant="outlined"
                      onClick={() => onRemoveEducation(index)}
                      startIcon={<DeleteOutlineIcon />}
                    >
                      Remove
                    </Button>
                  )}
                </>
              )}
            </Stack>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Institution"
                value={education.institution}
                onChange={(e) => onChange("educations", "institution", e.target.value, index)}
                fullWidth
                disabled={!isEditing}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Degree"
                value={education.degree}
                onChange={(e) => onChange("educations", "degree", e.target.value, index)}
                fullWidth
                disabled={!isEditing}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Field of Study"
                value={education.field}
                onChange={(e) => onChange("educations", "field", e.target.value, index)}
                fullWidth
                disabled={!isEditing}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Graduation Year"
                value={education.year}
                onChange={(e) => onChange("educations", "year", e.target.value, index)}
                fullWidth
                type="number"
                disabled={!isEditing}
                required
                inputProps={{ min: 1900, max: currentYear }}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      
      {isEditing && (
        <Button 
          variant="outlined" 
          startIcon={<AddIcon />} 
          onClick={onAddEducation}
          sx={{ mt: 2 }}
          fullWidth
        >
          Add Another Education
        </Button>
      )}
    </div>
  );
};

export default EducationForm;