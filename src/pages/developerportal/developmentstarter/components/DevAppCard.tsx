import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { loginRequest } from "@/config/auth";
import { getUserDetailsFromMsal } from "@/common/services/AuthHelper";
import { CreateApp } from "@/pages/developerportal/developmentstarter/services";
import { CreateAppDetails } from "@/pages/developerportal/developmentstarter/model";
import useLoading from "@/common/hooks/useLoading";

import { Box, Button, Typography, TextField, CircularProgress, Snackbar, Alert } from "@mui/material";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";




const Devappcard :React.FC= () => {
  const [appName, setAppName] = useState<string>("");
  const [developerName, setDeveloperName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const {isLoading,setLoading}=useLoading();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [errorPopup, setErrorPopup] = useState<string>("");
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();

  const createApp = new CreateApp();
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = getUserDetailsFromMsal(accounts);
    setUserEmail(userDetails.email);
  }, [isAuthenticated, accounts]);

  const handleCreate = async () => {
    if (!isAuthenticated) {
      try {
        await instance.loginRedirect(loginRequest);
      } catch (e) {
        console.error("Login redirect error:", e);
      }
      return;
    }

    const appData: CreateAppDetails = {
      appName: appName,
      email: userEmail,
      userName: developerName,
    };

    try {
      setLoading(true);
      const response = await createApp.createApp(appData);
      if (response) {
        setSnackbarMessage("App created Succesfully");
        setSnackbarOpen(true);
        setErrorPopup("");
        navigate("/developer/myapps");
      } else {
        console.error("Failed to create app:", response);
        setErrorPopup(response.message || "An error occurred. Please try again.");
      }
    } catch (error: any) {
      if (error.response) {
        setErrorPopup(error.response.data);
      } else {
        setErrorPopup("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isCreateDisabled = !appName || !developerName;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2, boxShadow: 5, borderRadius: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "100%", height: "270px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography variant="h5">Use Marketplace Partners</Typography>
          <Typography variant="subtitle2">Create an App From scratch.</Typography>
          <Typography variant="subtitle2">App Name</Typography>
          <TextField
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
              },
            }}
          />
          <Typography variant="subtitle2">Developer Name</Typography>
          <TextField
            value={developerName}
            onChange={(e) => setDeveloperName(e.target.value)}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
              },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "250px", marginTop: 2.5 }}>
          <Button
            sx={{
              width: "100px",
              border: "0.5px solid black",
              color: "#6D6767",
              borderRadius: "8px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={isCreateDisabled || isLoading}
            sx={{
              width: "100px",
              bgcolor: isCreateDisabled || isLoading ? "#D9D9D9" : "#424242",
              color: isCreateDisabled || isLoading ? "#6D6767" : "white",
              border: "0.5px",
              borderRadius: "8px",
              outline: "none",
              "&:hover": { bgcolor: isCreateDisabled || isLoading ? "#D9D9D9" : "#424242", color: "white" },
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create"}
          </Button>
        </Box>
      </Box>
      <Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {errorPopup && (
        <Snackbar
          open={Boolean(errorPopup)}
          autoHideDuration={4000}
          onClose={() => setErrorPopup("")}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setErrorPopup("")} severity="error">
            {errorPopup}
          </Alert>
        </Snackbar>
      )}
      </Box>
    </Box>
  );
};

export default Devappcard;
