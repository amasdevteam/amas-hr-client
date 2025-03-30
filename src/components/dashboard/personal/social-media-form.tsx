// SocialMediaForm.tsx
import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  IconButton,
  Stack,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// Updated interface to support dynamic keys
export interface SocialMediaAccount {
  platform: string;
  url: string;
}

interface SocialMediaFormProps {
  socialMediaAccounts: SocialMediaAccount[];
  isEditing: boolean;
  onAddAccount: (account: SocialMediaAccount) => void;
  onRemoveAccount: (index: number) => void;
  onUpdateAccount: (index: number, field: 'platform' | 'url', value: string) => void;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({
  socialMediaAccounts,
  isEditing,
  onAddAccount,
  onRemoveAccount,
  onUpdateAccount
}) => {
  const [open, setOpen] = useState(false);
  const [newPlatform, setNewPlatform] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form
    setNewPlatform('');
    setNewUrl('');
  };

  const handleAdd = () => {
    if (newPlatform.trim() && newUrl.trim()) {
      onAddAccount({
        platform: newPlatform.trim(),
        url: newUrl.trim()
      });
      handleClose();
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Social Media Accounts</Typography>
        {isEditing && (
          <Button 
            startIcon={<AddIcon />} 
            variant="outlined" 
            color="primary" 
            size="small"
            onClick={handleOpen}
          >
            Add Account
          </Button>
        )}
      </Stack>

      <Grid container spacing={3}>
        {socialMediaAccounts.length > 0 ? (
          socialMediaAccounts.map((account, index) => (
            <Grid item xs={12} key={index}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2} 
                sx={{ 
                  p: 2, 
                  border: '1px solid #e0e0e0', 
                  borderRadius: 1,
                  position: 'relative'
                }}
              >
                <TextField
                  label="Platform"
                  value={account.platform}
                  onChange={(e) => onUpdateAccount(index, 'platform', e.target.value)}
                  disabled={!isEditing}
                  fullWidth
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="URL/Username"
                  value={account.url}
                  onChange={(e) => onUpdateAccount(index, 'url', e.target.value)}
                  disabled={!isEditing}
                  fullWidth
                  sx={{ flex: 2 }}
                />
                {isEditing && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Remove">
                      <IconButton 
                        color="error" 
                        onClick={() => onRemoveAccount(index)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Stack>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography color="text.secondary" align="center">
              No social media accounts added yet.
              {isEditing && ' Click "Add Account" to add one.'}
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Dialog for adding new social media */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Social Media Account</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Platform Name"
              placeholder="e.g., Instagram, TikTok, etc."
              fullWidth
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              autoFocus
            />
            <TextField
              label="URL or Username"
              placeholder="e.g., username or profile URL"
              fullWidth
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleAdd} 
            variant="contained" 
            disabled={!newPlatform.trim() || !newUrl.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SocialMediaForm;