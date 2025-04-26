import React from 'react';
import {
  Box,
  Button,
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
          {/* Header */}
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
            {isEditing && (
              <Stack direction="row" spacing={1}>
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
              </Stack>
            )}
          </Stack>

          {/* Form Grid */}
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
          >
            <TextField
              label="Institution"
              value={education.institution}
              onChange={(e) => onChange("educations", "institution", e.target.value, index)}
              fullWidth
              disabled={!isEditing}
              required
            />
            <TextField
              label="Degree"
              value={education.degree}
              onChange={(e) => onChange("educations", "degree", e.target.value, index)}
              fullWidth
              disabled={!isEditing}
              required
            />
            <TextField
              label="Field of Study"
              value={education.field}
              onChange={(e) => onChange("educations", "field", e.target.value, index)}
              fullWidth
              disabled={!isEditing}
              required
            />
            <TextField
              label="Graduation Year"
              value={education.year}
              onChange={(e) => onChange("educations", "year", e.target.value, index)}
              type="number"
              fullWidth
              disabled={!isEditing}
              required
              inputProps={{ min: 1900, max: currentYear }}
            />
          </Box>
        </Box>
      ))}

      {/* Add New Education Button */}
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
