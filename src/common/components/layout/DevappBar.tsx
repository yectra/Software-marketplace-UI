import { useNavigate } from "react-router-dom";
import { signInUser, signOutUser } from "@/common/services/AuthHelper";
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
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreIcon from "@mui/icons-material/Store";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useState } from "react";
import { StyledInputBase } from "@/common/UI/StyledElements";

const DevappBar = () => {
  const navigate = useNavigate();
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
            sx={{ color: "#0C9DBD", fontSize: "1.10rem" }}
            onClick={handleTitleClick}
          >
            Marketplace
          </Button>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            startAdornment={
              <IconButton>
                <SearchIcon sx={{ color: "#C7C6CE" }} />
              </IconButton>
            }
          />
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
                <Box sx={{ px: 2, py: 1, width: 200, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "#0C9DBD", width: 56, height: 56, mb: 1 }}>D</Avatar>
                  <Typography variant="h6">Deepak</Typography>
                  <Typography variant="body2">deepak@yectra.com</Typography>
                </Box>
                <MenuItem onClick={() => handleNavigate('/developer/profile')}>
                  <Person2Icon sx={{ mr: 2 }} />My Profile
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/docs')}>
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
