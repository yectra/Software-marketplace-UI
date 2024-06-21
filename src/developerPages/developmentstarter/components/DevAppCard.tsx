import { useState, useEffect } from "react";
import { Box, Button, Typography, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../config/auth";
import { getUserEmailFromMsal } from "../../../common/services/AuthHelper";

const Devappcard = () => {
  const [appName, setAppName] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();

  const navigate = useNavigate();

  useEffect(() => {
    const email=getUserEmailFromMsal(accounts);
    setUserEmail(email);
  }, [isAuthenticated, accounts]);

const displaypopup=({alertmsg}:{alertmsg:string})=>{
  alert(alertmsg)
}

  const handleCreate = async () => {
    if (!isAuthenticated) {
      try {
        await instance.loginRedirect(loginRequest);
      } catch (e) {
        console.error("Login redirect error:", e);
      }
      return;
    }

    setIsLoading(true);

    const appData = {
      appname: appName,
      email: userEmail,
      username: developerName,
    };

    try {
      console.log(appData);
      const response = await axios.post("http://localhost:2000/developer/createapp", appData);
      console.log(response);

      if (response.status === 200) {
        console.log("App created successfully:", response.data);
        navigate("/developer/myapps");
      } else {
        console.error("Failed to create app:", response.data);
        displaypopup(response.data); 
      }
    } catch (error:any) {
      console.error("Error creating app:", error);
      displaypopup(error.message); 
    } finally {
      setIsLoading(false);
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
    </Box>
  );
};

export default Devappcard;
