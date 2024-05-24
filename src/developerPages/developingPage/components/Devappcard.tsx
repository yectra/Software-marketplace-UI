import { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Devappcard = () => {
  const [appName, setAppName] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [developerEmail, setDeveloperEmail] = useState("");

  const navigate=useNavigate();

  const handleCreate = async () => {
    const appData = {
      appname:appName,
      name:developerName,
      email:developerEmail,
    };

    try {
      const response = await axios.post('http://localhost:32769/createapp', appData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('App created successfully:', response.data);
        navigate("mailsuccessfullysent")
        const timer = setTimeout(() => {
          navigate('/docs'); 
        }, 2000);
  
        return () => clearTimeout(timer);
        
      } else {
        console.error('Failed to create app:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating app:', error);
    }
  };

  const isCreateDisabled = !appName || !developerName || !developerEmail;

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
          <Typography variant="subtitle2">Developer Email</Typography>
          <TextField
            value={developerEmail}
            onChange={(e) => setDeveloperEmail(e.target.value)}
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
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "250px", marginTop: 5 }}>
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
            disabled={isCreateDisabled}
            sx={{
              width: "100px",
              bgcolor: isCreateDisabled ? "#D9D9D9" : "#424242",
              color: isCreateDisabled ? "#6D6767" : "white",
              border: "0.5px",
              borderRadius: "8px",
              outline: "none",
              "&:hover": { bgcolor: isCreateDisabled ? "#D9D9D9" : "#424242", color: "white" },
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Devappcard;
