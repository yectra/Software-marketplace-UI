import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { UploadAppDetails, categories } from "@/pages/developerportal/updateapp/models"; 
import { getInitials } from "@/common/UI/UiHelpers";
import { AppManagementService } from '@/pages/developerportal/updateapp/services';
import { getUserDetailsFromMsal } from '@/common/services/AuthHelper';
import BaseButton from '@/common/components/controls/BaseButton';
import CustomSnackbar from '@/common/components/feedback/CustomSnackbar';
import LoadingBackdrop from '@/common/UI/LoadingBackdrop';
import useLoading from '@/common/hooks/useLoading';

import { Box, TextField, Typography, MenuItem } from "@mui/material";

import { useMsal } from '@azure/msal-react';


const UploadApp :React.FC= () => {
  const { appName } = useParams();
  const appNameOrDefault: string = appName ?? '';
  const logoInitials = getInitials({ appName: appNameOrDefault });
  const navigate = useNavigate();
  const {isLoading, setLoading} = useLoading();
  const { accounts } = useMsal();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<string>('success');

  const appManagementService = new AppManagementService();

  const [appDetails, setAppDetails] = useState<UploadAppDetails>({
    appName: appNameOrDefault,
    email: '',
    shortDescription: '',
    appDescription: '',
    category: '',
    keywords: '',
    gitHubLink: '',
    dockerHubLink: '',
    appVersion: "1.0.0"
  });

  useEffect(() => {
    const userDetails = getUserDetailsFromMsal(accounts);
    setAppDetails(prevDetails => ({
      ...prevDetails,
      email:  userDetails.email
    }));
  }, [accounts]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAppDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log(appDetails)
      const response = await appManagementService.uploadAppdetails(appDetails);
      console.log(response);
      setSnackbarSeverity('success');
      setSnackbarMessage('App details submitted successfully!');
      setSnackbarOpen(true);
      navigate("/developer/myapps");
    } catch (error) {
      console.error('Error submitting app details:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error submitting app details. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '600px' }}>
      <LoadingBackdrop isLoading={isLoading}/>
      <Box sx={{ display: 'flex', alignItems: 'center', pb: 2 }}>
        <Box
          sx={{
            width: 35,
            height: 30,
            mr: 1,
            bgcolor: 'black',
            color: '#09FFC4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '20%',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          <Typography variant="body2" component="span" sx={{ color: 'inherit', fontSize: 'inherit' }}>
            {logoInitials}
          </Typography>
        </Box>
        <Typography variant="h5">{appName?.toUpperCase()}</Typography>
      </Box>
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField 
          name="shortDescription"
          variant="outlined" 
          label="Explain your app in one line" 
          fullWidth 
          value={appDetails.shortDescription}
          onChange={handleChange}
        />
        <TextField 
          name="appDescription"
          variant="outlined" 
          label="Add description of your app" 
          fullWidth 
          multiline 
          rows={4} 
          value={appDetails.appDescription}
          onChange={handleChange}
        />
        <TextField 
          name="category"
          variant="outlined" 
          label="Category of app" 
          fullWidth 
          select 
          value={appDetails.category}
          onChange={handleChange}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField 
          name="keywords"
          variant="outlined" 
          label="Add keywords of your app" 
          fullWidth 
          value={appDetails.keywords}
          onChange={handleChange}
        />
        <TextField 
          name="gitHubLink"
          variant="outlined" 
          label="GitHub link" 
          fullWidth 
          value={appDetails.gitHubLink}
          onChange={handleChange}
        />
        <TextField 
          name="dockerHubLink"
          variant="outlined" 
          label="DockerHub link" 
          fullWidth 
          value={appDetails.dockerHubLink}
          onChange={handleChange}
        />
        <BaseButton 
        name='submit'
        variant='contained'
        onClick={handleSubmit}
        disabled={isLoading}
     
        />
      </Box>
      <CustomSnackbar 
        open={snackbarOpen} 
        message={snackbarMessage} 
        severity={snackbarSeverity} 
        onClose={handleCloseSnackbar} 
      />
    </Box>
  );
}

export default UploadApp;
