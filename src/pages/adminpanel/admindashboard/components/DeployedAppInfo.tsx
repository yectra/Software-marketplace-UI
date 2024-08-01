import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Divider, Grid, Link, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import ClearIcon from '@mui/icons-material/Clear';
import CustomSnackbar from '@/common/components/feedback/CustomSnackbar';
import { AddToMarketplace, DeployedAppOverview } from '../models';
import { AdminService } from '../services';
import { useParams, useLocation } from 'react-router-dom';

const DeployedAppInfo: React.FC = () => {
  const { appName } = useParams<{ appName?: string }>();
  const query = new URLSearchParams(useLocation().search);
  const email = query.get('email') || ''; // Get email from query parameters

  const [deployedAppInfo, setDeployedAppInfo] = useState<DeployedAppOverview>();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const adminService = new AdminService();

  const handleMovetoMarketplace = () => {
    const appDetails: AddToMarketplace = {
      appName: deployedAppInfo?.appName || '',
      email: email, 
      appVersion: deployedAppInfo?.appVersion || ''
    };
    adminService.moveToMarketplace(appDetails)
      .then((response) => {
        console.log(response)
        setSnackbarMessage('App moved to marketplace successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setOpenConfirmDialog(false); 
      })
      .catch((error) => {
        console.error(error)
        setSnackbarMessage('Failed to move app to marketplace.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setOpenConfirmDialog(false); 
      });
  };

  const handleConfirm = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (appName) {
      adminService.getDeploymentDetailsofApps(email, appName)
        .then((response) => {
          console.log(response)
          setDeployedAppInfo(response);
        })
        .catch((error) => {
          console.error('Error fetching deployment details:', error);
        });
    }
  }, [appName, email]);

  return (
    <Box>
      <Box sx={{ position: 'relative', p: 2, border: '1px solid #ccc', borderRadius: 2, margin: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{deployedAppInfo?.appName}</Typography>
                <Chip label="Running" color="success" size="small" sx={{ mt: 1 }} />
              </Box>

              <Typography variant="body1" sx={{ mt: 2 }}>App Description</Typography>
              <Typography variant="body2">{deployedAppInfo?.appDescription}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>Version</Typography>
              <Typography variant="body2">{deployedAppInfo?.appVersion}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>Approved Status</Typography>
              <Typography variant="body2" sx={{color:'green'}}>true</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>Developer Github</Typography>
              <Link href={deployedAppInfo?.gitHubLink} underline="none">
                <Typography variant="body2">{deployedAppInfo?.gitHubLink}</Typography>
              </Link>
              <Typography variant="body1" sx={{ mt: 2 }}>Developer DockerImage</Typography>
              <Typography variant="body2">{deployedAppInfo?.dockerHubLink}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={1}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Divider orientation="vertical" flexItem />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Deployment-Sources</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>Admin Github</Typography>
              <Link href={deployedAppInfo?.adminCreatedGit} underline="none">
                <Typography variant="body2">{deployedAppInfo?.adminCreatedGit}</Typography>
              </Link>
              <Typography variant="body1" sx={{ mt: 2 }}>Static WebApp Link</Typography>
              <Link href={deployedAppInfo?.staticWebAppURL} underline="none">
                <Typography variant="body2">{deployedAppInfo?.staticWebAppURL}</Typography>
              </Link>
              <Typography variant="body1" sx={{ mt: 2 }}>FunctionApp Link</Typography>
              <Link href={deployedAppInfo?.functionAppURL} underline="none">
                <Typography variant="body2">{deployedAppInfo?.functionAppURL}</Typography>
              </Link>
              <Typography variant="body1" sx={{ mt: 2 }}>Location</Typography>
              <Typography variant="body2">{deployedAppInfo?.location}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>Resource-Group</Typography>
              <Typography variant="body2">{deployedAppInfo?.resourceGroup}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
        <Button variant="outlined" color="success" onClick={handleConfirm}>
          <CloudDoneIcon sx={{ mr: 1 }} /> Move to Marketplace
        </Button>
        <Button variant="outlined" color="warning">
          <StopIcon sx={{ mr: 1 }} /> Stop Deployment
        </Button>
        <Button variant="outlined" color="error">
          <ClearIcon sx={{ mr: 1 }} /> Remove
        </Button>
      </Box>

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Move to Marketplace</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to move this app to the marketplace?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={handleMovetoMarketplace}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default DeployedAppInfo;
