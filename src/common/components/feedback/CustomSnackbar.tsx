import React from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: string;
  onClose: () => void;
}

const CustomSnackbar: React.FC<SnackbarProps> = ({ open, message, severity, onClose }) => {
  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        sx={{
          backgroundColor: severity === 'success' ? '#4caf50' : '#f44336',
          color: '#fff'
        }}
        message={message}
      />
    </MuiSnackbar>
  );
};

export default CustomSnackbar;
