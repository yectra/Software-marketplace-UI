import React, { useState } from 'react';

import { StyledInputBase } from '@/common/UI/StyledElements';

import { AppBar, Toolbar, Button, IconButton, Box, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import StoreIcon from '@mui/icons-material/Store';
import QuestionMarkIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';


const Appbar = () => {
  const navigate = useNavigate();
  const handletitleclick = () => {
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    // Navigate to profile page
    navigate("/profile");
    handleClose();
  };

  const handleLogout = () => {
    // Perform logout action
    // ...
    handleClose();
  };

  return (
    <Box>
      <AppBar position="fixed" sx={{ bgcolor: "white", zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="text" sx={{ color: '#0C9DBD', fontSize: '1.10rem' }} onClick={handletitleclick}>
            Marketplace
          </Button>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            startAdornment={
              <IconButton>
                <SearchIcon sx={{ color: "#C7C6CE" }} />
              </IconButton>
            }
            sx={{ mx: 'auto' }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <QuestionMarkIcon sx={{ color: "black" }} />
            </IconButton>
            <IconButton>
              <NotificationsIcon sx={{ color: "black" }} />
            </IconButton>
            <IconButton onClick={handleMenu}>
              <AccountCircleIcon sx={{ color: "black" }} />
            </IconButton>
            <Menu
            sx={{mt:"45px"}}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Box sx={{ px: 2, py: 1,width:200,display:"flex",flexDirection:"column",alignItems:"center" }}>
                <Avatar sx={{ bgcolor: '#0C9DBD', width: 56, height: 56, mb: 1 }}>D</Avatar>
                <Typography variant="h6">Deepak</Typography>
                <Typography variant="body2">deepak@yectra.com</Typography>
              </Box>
              <MenuItem onClick={handleProfile}><StoreIcon  sx={{mr:2}}/> Explore Community</MenuItem>
              <MenuItem onClick={handleLogout}> <LogoutIcon sx={{mr:2}}/> Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
