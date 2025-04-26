import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewPlatform('');
    setNewUrl('');
  };

  const handleAdd = () => {
    if (newPlatform.trim() && newUrl.trim()) {
      onAddAccount({ platform: newPlatform.trim(), url: newUrl.trim() });
      handleClose();
    }
  };

  return (
    <Box>
      {/* Top section: Title + Add Button */}
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

      {/* Social Media Accounts List */}
      <Box display="grid" gap={3}>
        {socialMediaAccounts.length > 0 ? (
          socialMediaAccounts.map((account, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '2fr 3fr auto' },
                alignItems: 'center',
                gap: 2
              }}
            >
              <TextField
                label="Platform"
                value={account.platform}
                onChange={(e) => onUpdateAccount(index, 'platform', e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="URL/Username"
                value={account.url}
                onChange={(e) => onUpdateAccount(index, 'url', e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
              {isEditing && (
                <Tooltip title="Remove">
                  <IconButton
                    color="error"
                    onClick={() => onRemoveAccount(index)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          ))
        ) : (
          <Box>
            <Typography color="text.secondary" align="center">
              No social media accounts added yet.
              {isEditing && ' Click "Add Account" to add one.'}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Dialog to add new social media account */}
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
