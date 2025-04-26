import React from 'react';
import {
  Box,
  Button,
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
          {/* Header Row */}
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
            {isEditing && (
              <Stack direction="row" spacing={1}>
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
              </Stack>
            )}
          </Stack>

          {/* Form Layout */}
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
          >
            <Box gridColumn="span 2">
              <TextField
                label="Street Address"
                value={address.street}
                onChange={(e) => onChange("addresses", "street", e.target.value, index)}
                fullWidth
                disabled={!isEditing}
                required
              />
            </Box>

            <TextField
              label="City/Town"
              value={address.city}
              onChange={(e) => onChange("addresses", "city", e.target.value, index)}
              fullWidth
              disabled={!isEditing}
              required
            />
            <FormControl fullWidth disabled={!isEditing} required>
              <InputLabel>Region</InputLabel>
              <Select
                value={address.region}
                label="Region"
                onChange={(e) => onChange("addresses", "region", e.target.value, index)}
              >
                {tanzaniaRegions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Postal Code"
              value={address.postalCode}
              onChange={(e) => onChange("addresses", "postalCode", e.target.value, index)}
              fullWidth
              disabled={!isEditing}
            />
            <TextField
              label="Ward"
              value={address.ward}
              onChange={(e) => onChange("addresses", "ward", e.target.value, index)}
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
