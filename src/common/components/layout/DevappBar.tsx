import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetailsFromMsal, signInUser, signOutUser } from "@/common/services/AuthHelper";
import MarketplaceIcon from "@/assets/marketplace.png";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Badge,
  Avatar,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreIcon from "@mui/icons-material/Store";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

const DevappBar = () => {
  const navigate = useNavigate();
  const { instance, inProgress } = useMsal();
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const userDetails = getUserDetailsFromMsal(accounts);
    setEmail(userDetails.email || '');
    setUserName(userDetails.name || '');
  }, [isAuthenticated, accounts]);


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTitleClick = () => {
    navigate("/developer");
  };

  const handleSignIn = (): void => {
    signInUser(instance, inProgress, isAuthenticated);
  };

  const handleSignOut = (): void => {
    signOutUser(instance, "/developer");
  };

  const handleNavigate = (path: string) => {
    handleClose();
    navigate(path);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "white",
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "#0C9DBD",
              fontSize: "1.00rem",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleTitleClick}
          >
            <Box sx={{ height: 20, width: 20, marginRight: 1, mb: 0.4 }}>
              <img
                src={MarketplaceIcon}
                alt="Marketplace Icon"
                style={{ height: "100%", width: "100%" }}
              />
            </Box>
            Marketplace
          </Button>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <Badge
                badgeContent={0}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#0C9DBD",
                    color: "white",
                  },
                }}
              >
                <NotificationsIcon sx={{ color: "black" }} />
              </Badge>
            </IconButton>
            <IconButton onClick={handleMenu}>
              <AccountCircleIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>
          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isAuthenticated ? (
              <>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    width: 200,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{ bgcolor: "#0C9DBD", width: 56, height: 56, mb: 1 }}
                  >
                    {userName[0]}
                  </Avatar>
                  <Typography variant="h6">{userName}</Typography>
                  <Typography variant="body2">{email}</Typography>
                </Box>
                <MenuItem onClick={() => {handleNavigate("/developer/profile")
                  setAnchorEl(null)}}>
                  <Person2Icon sx={{ mr: 2 }} />
                  My Profile
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/docs")}>
                  <StoreIcon sx={{ mr: 2 }} /> Explore Community
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <LogoutIcon sx={{ mr: 2 }} /> Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleSignIn}>
                <LoginIcon sx={{ mr: 2 }} /> Login
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DevappBar;
