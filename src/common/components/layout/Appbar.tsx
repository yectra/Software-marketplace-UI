import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MarketplaceIcon from '@/assets/marketplace.png';
import { StyledInputBase } from '@/common/UI/StyledElements';

import { AppBar, Toolbar, Button, IconButton, Box, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import StoreIcon from '@mui/icons-material/Store';
import CodeOffOutlinedIcon from '@mui/icons-material/CodeOffOutlined';
import QuestionMarkIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getUserDetailsFromMsal } from '@/common/services/AuthHelper';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

const Appbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (title: string) => {
    navigate(`/${title}`);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
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

  return (
    <Box>
      <AppBar position="fixed" sx={{ bgcolor: 'white', zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="text"
            sx={{
              color: '#0C9DBD',
              fontSize: '1.00rem',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => handleNavigation('marketplace')}
          >
            <Box sx={{ height: 20, width: 20, marginRight: 1, mb: 0.4 }}>
              <img
                src={MarketplaceIcon}
                alt="Marketplace Icon"
                style={{ height: '100%', width: '100%' }}
              />
            </Box>
            Marketplace
          </Button>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            startAdornment={
              <IconButton>
                <SearchIcon sx={{ color: '#C7C6CE' }} />
              </IconButton>
            }
            sx={{ mx: 'auto' }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <QuestionMarkIcon sx={{ color: 'black' }} />
            </IconButton>
            <IconButton>
              <NotificationsIcon sx={{ color: 'black' }} />
            </IconButton>
            <IconButton onClick={handleMenu}>
              <AccountCircleIcon sx={{ color: 'black' }} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
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
              <Box sx={{ px: 2, py: 1, width: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#0C9DBD', width: 56, height: 56, mb: 1 }}>D</Avatar>
                <Typography variant="h6">{userName}</Typography>
                <Typography variant="body2">{email}</Typography>
              </Box>
              <MenuItem onClick={() => handleNavigation('developer')}>
                <CodeOffOutlinedIcon sx={{ mr: 2 }} /> Develop Apps
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('docs')}>
                <StoreIcon sx={{ mr: 2 }} /> Explore Community
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('logout')}>
                <LogoutIcon sx={{ mr: 2 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
