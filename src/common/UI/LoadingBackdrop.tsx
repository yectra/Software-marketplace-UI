
import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface IProps {
  isLoading: boolean;
}

const LoadingBackdrop: React.FC<IProps> = ({ isLoading }) => {
  return (
    <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress sx={{color:"#0C9DBD"}} />
    </Backdrop>
  );
};

export default LoadingBackdrop;
