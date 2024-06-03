import { AppBar, Toolbar, Button, InputBase, IconButton, styled, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { loginRequest } from '../../../config/auth';
import { useNavigate } from 'react-router-dom';

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
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const signInUser = async () => {
    try {
      if (inProgress === InteractionStatus.None && !isAuthenticated) {
        await instance.loginRedirect(loginRequest);
      }
    } catch (e) {
      console.error('Login redirect error:', e);
    }
  };

  const signOutUser = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return (
    <Box sx={{  }}>
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
              <Button variant="text" sx={{ color: 'black' }} onClick={signOutUser}>
                Logout
              </Button>
            ) : (
              <Button variant="text" sx={{ color: 'black' }} onClick={signInUser}>
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
