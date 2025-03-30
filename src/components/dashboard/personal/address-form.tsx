// AddressForm.tsx
import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Stack,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Address, tanzaniaRegions } from './types';

interface AddressFormProps {
  addresses: Address[];
  isEditing: boolean;
  onAddAddress: () => void;
  onRemoveAddress: (index: number) => void;
  onSetPrimaryAddress: (index: number) => void;
  onChange: (section: string, key: string, value: string | number, index?: number) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  addresses,
  isEditing,
  onAddAddress,
  onRemoveAddress,
  onSetPrimaryAddress,
  onChange
}) => {
  return (
    <div>
      {addresses.map((address, index) => (
        <Box 
          key={index} 
          sx={{ 
            mb: 4, 
            pb: 2, 
            borderBottom: index < addresses.length - 1 ? '1px solid #e0e0e0' : 'none',
            position: 'relative'
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="subtitle1">
                {address.isPrimary ? "Primary Address" : `Address ${index + 1}`}
              </Typography>
              {address.isPrimary && (
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
                  {!address.isPrimary && (
                    <Button 
                      size="small" 
                      onClick={() => onSetPrimaryAddress(index)}
                      variant="outlined"
                    >
                      Set as Primary
                    </Button>
                  )}
                  {addresses.length > 1 && (
                    <Button 
                      size="small" 
                      color="error" 
                      variant="outlined"
                      onClick={() => onRemoveAddress(index)}
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
            <Grid item xs={12}>
              <TextField
                label="Street Address"
                value={address.street}
                onChange={(e) => onChange("addresses", "street", e.target.value, index)}
                fullWidth
                disabled={!isEditing}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City/Town"
                value={address.city}
                onChange={(e) => onChange("addresses", "city", e.target.value, index)}
                fullWidth
                disabled={!isEditing}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={!isEditing} required>
                <InputLabel>Region</InputLabel>
                <Select
                  value={address.region}
                  label="Region"
                  onChange={(e) => onChange("addresses", "region", e.target.value, index)}
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
                value={address.postalCode}
                onChange={(e) => onChange("addresses", "postalCode", e.target.value, index)}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ward"
                value={address.ward}
                onChange={(e) => onChange("addresses", "ward", e.target.value, index)}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      
      {isEditing && (
        <Button 
          variant="outlined" 
          startIcon={<AddIcon />} 
          onClick={onAddAddress}
          sx={{ mt: 2 }}
          fullWidth
        >
          Add Another Address
        </Button>
      )}
    </div>
  );
};

export default AddressForm;