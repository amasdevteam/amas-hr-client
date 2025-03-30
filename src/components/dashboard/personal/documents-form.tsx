// DocumentsForm.tsx
import React from 'react';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

interface DocumentsFormProps {
  documents: File[];
  isEditing: boolean;
  onDocumentUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveDocument: (index: number) => void;
}

const DocumentsForm: React.FC<DocumentsFormProps> = ({
  documents,
  isEditing,
  onDocumentUpload,
  onRemoveDocument
}) => {
  return (
    <div>
      <Typography variant="body1" gutterBottom>
        Upload your documents (e.g., ID, Passport, Certificates)
      </Typography>
      
      {isEditing && (
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFileIcon />}
          sx={{ mb: 2 }}
          fullWidth
        >
          Upload File
          <input
            type="file"
            hidden
            multiple
            onChange={onDocumentUpload}
          />
        </Button>
      )}
      
      {documents.length > 0 ? (
        <Paper variant="outlined" sx={{ mt: 2 }}>
          <List>
            {documents.map((doc: File, index: number) => (
              <ListItem key={index}>
                <ListItemText 
                  primary={doc.name} 
                  secondary={`${(doc.size / 1024).toFixed(2)} KB`}
                />
                {isEditing && (
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => onRemoveDocument(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No documents uploaded yet.
        </Typography>
      )}
    </div>
  );
};

export default DocumentsForm;