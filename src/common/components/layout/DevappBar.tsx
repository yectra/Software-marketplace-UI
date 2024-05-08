import { AppBar, Toolbar, Typography, InputBase, IconButton, styled, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';

const StyledInputBase = styled(InputBase)({
    border: '1px solid #C7C6CE',
    borderRadius: '17px',
    padding: '1px 40px',
    width:350,
    height:40,
    flexGrow: 1,
    marginLeft:200
  });

const DevappBar = () => {
  return (
    <AppBar position="fixed" sx={{bgcolor:"white", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar sx={{ display: 'flex', alignItems:"center",justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h6' sx={{ color: '#0C9DBD'}}>
          Marketplace
        </Typography>
        </Box>
        <Box>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          startAdornment={
            <IconButton>
              <SearchIcon sx={{color:"#C7C6CE"}} />
            </IconButton>
          }
        />
         </Box>
         <Box sx={{display:"flex",justifyContent:"space-evenly"}}>
        <IconButton >
          <NotificationsIcon  sx={{color:"black"}}  />
        </IconButton>
        <IconButton>
            <SentimentSatisfiedAltIcon sx={{color:"black"}}/>
        </IconButton>
        <Box>
        <Typography variant='subtitle2' sx={{ color:"black"}}>Rajeesh</Typography>
        <Typography variant='subtitle2' sx={{color:"#6D6767"}}>Rajeesh@yectra.com</Typography>
        </Box>
      </Box>
    </Toolbar>
  </AppBar>

  )
}

export default DevappBar