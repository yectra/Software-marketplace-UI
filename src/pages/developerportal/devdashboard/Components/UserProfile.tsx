import React, { useEffect, useState } from 'react';


import { DeveloperInfo } from '@/pages/developerportal/devdashboard/services';
import { getUserDetailsFromMsal } from '@/common/services/AuthHelper';

import { Box, Grid, TextField, Avatar, Button, Typography, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


import { useIsAuthenticated, useMsal } from '@azure/msal-react';

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [gitAccount, setGitAccount] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [approvedAppsCount, setApprovedAppsCount] = useState<number>(0);
  const [inProgressCount, setInProgressCount] = useState<number>(0);
  const [deniedAppsCount, setDeniedAppsCount] = useState<number>(0);

  const { accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const userDetails = getUserDetailsFromMsal(accounts);
    setEmail(userDetails.email || "");
    setFirstName(userDetails.name || "");
  }, [isAuthenticated, accounts]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const developerInfo = new DeveloperInfo();

  useEffect(() => {
    if (email) {
      const fetchProfile = async () => {
        const response = await developerInfo.getDeveloperProfile(email);
        setFirstName(response.userName || "");
        setLastName(response.lastName || "");
        setAge(response.age || "");
        setPhoneNumber(response.phoneNumber || "");
        setCity(response.city || "");
        setCountry(response.country || "");
        setDob(response.dob || "");
        setGitAccount(response.gitAccount || "");
        setProfession(response.profession || "");
        setApprovedAppsCount(response.approvedAppsCount || 0);
        setInProgressCount(response.inProgressCount || 0);
        setDeniedAppsCount(response.deniedAppsCount || 0);
        console.log(response);
      };
      fetchProfile();
    }
  }, [email]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 10, ml: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'pink' }}>{firstName[0]}</Avatar>
            <Button variant="outlined" size="small" sx={{ marginLeft: '10px' }}>Upload photo</Button>
            <IconButton onClick={handleEditToggle}>
              <EditIcon />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              margin="normal"
              sx={{ flex: 1, marginRight: 1 }}
              disabled={!isEditing}
            />
            <TextField
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
              margin="normal"
              sx={{ flex: 1, marginRight: 1 }}
              disabled={!isEditing}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Age"
                type="string"
                value={age}
                onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                variant="outlined"
                fullWidth
                margin="normal"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="GitHub Account"
                value={gitAccount}
                onChange={(e) => setGitAccount(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                disabled={!isEditing}
              />
            </Grid>
          

           
          </Grid>
          {isEditing && (
            <Button
              variant="contained"
              sx={{"&:hover": { bgcolor: "#0C9DBD" } ,bgcolor: "#0C9DBD",my:2}}
              onClick={handleSave}
            >
              Save
            </Button>
          )}
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box
          sx={{
            mt: 21,
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Application Insights
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="textSecondary">
              Total Apps
            </Typography>
            <Typography variant="body1">1</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="textSecondary">
              Submission in progress
            </Typography>
            <Typography variant="body1">{inProgressCount}</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="textSecondary">
              Approved Apps
            </Typography>
            <Typography variant="body1">{approvedAppsCount}</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="textSecondary">
              Denied Apps
            </Typography>
            <Typography variant="body1">{deniedAppsCount}</Typography>
          </Box>
          <Divider sx={{}} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
