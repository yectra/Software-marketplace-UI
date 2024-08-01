import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  UploadAppDetails,
  categories,
} from "@/pages/developerportal/updateapp/models";
import AppInfoCard from "@/pages/developerportal/updateapp/components/AppInfoCard";

import { getInitials } from "@/common/UI/UiHelpers";

import axios from "axios";
import { getUserDetailsFromMsal } from "@/common/services/AuthHelper";
import BaseButton from "@/common/components/controls/BaseButton";
import CustomSnackbar from "@/common/components/feedback/CustomSnackbar";
import LoadingBackdrop from "@/common/UI/LoadingBackdrop";
import useLoading from "@/common/hooks/useLoading";

import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";

import { useMsal } from "@azure/msal-react";

const UploadApp: React.FC = () => {
  const { appName } = useParams();
  const appNameOrDefault: string = appName ?? "";
  const logoInitials = getInitials({ appName: appNameOrDefault });
  const navigate = useNavigate();
  const { isLoading, setLoading } = useLoading();
  const { accounts } = useMsal();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<string>("success");
  const [appLogo, setAppLogo] = useState<File | null>(null);
  const [appDescriptionImage, setAppDescriptionImage] = useState<File | null>(
    null
  );

  const [appDetails, setAppDetails] = useState<UploadAppDetails>({
    appName: appNameOrDefault,
    email: "",
    shortDescription: "",
    appDescription: "",
    category: "",
    keywords: "",
    gitHubLink: "",
    dockerHubLink: "",
    appVersion: "1.0.0",
  });

  useEffect(() => {
    const userDetails = getUserDetailsFromMsal(accounts);
    setAppDetails((prevDetails) => ({
      ...prevDetails,
      email: userDetails.email,
    }));
  }, [accounts]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAppDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    Object.entries(appDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (appLogo) {
      formData.append("appLogo", appLogo);
    }
    if (appDescriptionImage) {
      formData.append("appDescriptionImage", appDescriptionImage);
    }

    console.log(formData);
    try {
      const response = await axios.put(
        "http://localhost:3000/api/developer/request",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setSnackbarSeverity("success");
      setSnackbarMessage("App details submitted successfully!");
      setSnackbarOpen(true);
      navigate("/developer/myapps");
    } catch (err) {
      console.error(err);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error submitting app details. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <LoadingBackdrop isLoading={isLoading} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
            <Box
              sx={{
                width: 35,
                height: 30,
                mr: 1,
                bgcolor: "black",
                color: "#09FFC4",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20%",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "inherit", fontSize: "inherit" }}
              >
                {logoInitials}
              </Typography>
            </Box>
            <Typography variant="h5">{appName?.toUpperCase()}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setAppLogo)}
              style={{ display: "none" }}
              id="app-logo-upload"
            />
            <label htmlFor="app-logo-upload">
              <Button component="span" variant="outlined">
                Upload App Logo
              </Button>
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setAppDescriptionImage)}
              style={{ display: "none" }}
              id="app-description-image-upload"
            />
            <label htmlFor="app-description-image-upload">
              <Button component="span" variant="outlined">
                Upload App Description Image
              </Button>
            </label>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
              name="submit"
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
            />
          </Box>
        </Grid>
        <AppInfoCard
          appDetails={appDetails}
          appLogo={appLogo}
          appDescriptionImage={appDescriptionImage}
        />
      </Grid>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default UploadApp;
