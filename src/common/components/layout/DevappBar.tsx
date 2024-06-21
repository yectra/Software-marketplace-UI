
import { AppBar, Toolbar, Button, InputBase, IconButton, styled, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

import { useNavigate } from 'react-router-dom';
import { signInUser, signOutUser } from '../../services/AuthHelper';
import { PublicClientApplication } from '@azure/msal-browser';

const StyledInputBase = styled(InputBase)({
  border: '1px solid #C7C6CE',
  borderRadius: '17px',
  padding: '1px 40px',
  width: 350,
  height: 40,
});

const DevappBar = () => {
  const navigate = useNavigate();
  const handleTitleClick = () => {
    navigate("/developer");
  };
  const { instance, inProgress} = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const typedInstance = instance as PublicClientApplication;

  const handleSignIn = (): void => {
    signInUser(typedInstance, inProgress, isAuthenticated);
  };

  const handleSignOut = (): void => {
    signOutUser(typedInstance, "/developer");
  };

  return (
    <Box>
      <AppBar position="fixed" sx={{ bgcolor: 'white', boxShadow: 'none', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button variant="text" sx={{ color: '#0C9DBD', fontSize: '1.10rem' }} onClick={handleTitleClick}>
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
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <NotificationsIcon sx={{ color: 'black' }} />
            </IconButton>
            {isAuthenticated ? (
              <Button variant="text" sx={{ color: 'black' }} onClick={handleSignOut}>
                Logout
              </Button>
            ) : (
              <Button variant="text" sx={{ color: 'black' }} onClick={handleSignIn}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DevappBar;
