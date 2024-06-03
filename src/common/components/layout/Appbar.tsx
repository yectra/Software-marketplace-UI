import { AppBar, Toolbar, Button, InputBase, IconButton, styled, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import QuestionMarkIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Outlet, useNavigate } from 'react-router-dom';

const StyledInputBase = styled(InputBase)({
  border: '1px solid #C7C6CE',
  borderRadius: '17px',
  padding: '1px 40px',
  width: 380,
  height: 40
});

const Appbar = () => {
  const navigate = useNavigate();
  const handletitleclick = () => {
    navigate("/");
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
            <IconButton>
              <AccountCircleIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Appbar;
