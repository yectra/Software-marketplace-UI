import { AppBar, Toolbar, Typography, InputBase, IconButton, styled, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import QuestionMarkIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Outlet } from 'react-router-dom';


const StyledInputBase = styled(InputBase)({
    border: '1px solid #C7C6CE',
    borderRadius: '17px',
    padding: '1px 40px',
    width:350,
    height:40,
    flexGrow: 1,
    marginLeft:200
  });

const Appbar = () => {
  return (
    <Box>
    <AppBar position="fixed" sx={{bgcolor:"white", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h6' sx={{ color: '#0C9DBD', mr: 40}}>
          Marketplace
        </Typography>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          startAdornment={
            <IconButton  >
              <SearchIcon sx={{color:"#C7C6CE"}} />
            </IconButton>
          }
        />
      </div>
      <div>
        <IconButton >
          <QuestionMarkIcon  sx={{color:"black"}}/>
        </IconButton>
        <IconButton >
          <NotificationsIcon  sx={{color:"black"}}  />
        </IconButton>
        <IconButton >
          <AccountCircleIcon   sx={{color:"black"}}/>
        </IconButton>
      </div>
    </Toolbar>
  </AppBar>
  <Outlet/>
  </Box>

  )
}

export default Appbar