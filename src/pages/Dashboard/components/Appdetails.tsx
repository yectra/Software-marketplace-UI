import { Box, Typography, Button ,useTheme} from '@mui/material';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import StayPrimaryLandscapeIcon from '@mui/icons-material/StayPrimaryLandscape';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';


const Appdetails = ({title,logo,shdescription,lndescription,linktorun,imgdes}:{title:string,logo:string,shdescription:string,lndescription:string,linktorun:string,imgdes:string}) => {
  const theme = useTheme();
const navigate=useNavigate();
  const handleboxclick = () => {
    navigate('/install', { state: { title, lndescription, logo,linktorun,imgdes } });
  };
  return (
    <Box onClick={handleboxclick} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: '100%' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing(2) }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
  src={logo}
  alt='app logo'
  style={{ maxWidth: '120px', maxHeight: '120px', width: '100%', height: '100%', objectFit: 'contain' }}
/>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InstallDesktopIcon />
          <StayPrimaryLandscapeIcon sx={{ ml: 1 }} />
        </Box>
      </Box>
      <Typography variant='subtitle2'>{shdescription}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='overline'>4.1</Typography>
          <StarIcon sx={{ fontSize: 'inherit', verticalAlign: 'middle', ml: 0.5 }} />
          <Typography variant='overline' sx={{ color: "grey", ml: 0.5 }}>(3.8K) </Typography>
          <InfoIcon sx={{color:"grey",fontSize: '1.0rem'}}/>
        </Box>
        <Button sx={{ height: 28, width: 80, p: 1, borderRadius: "15px", border: "1px solid #000000", color: "#000000", '&:hover': { bgcolor: "transparent" } }}>
          Install
        </Button>
      </Box>
    </Box>
  )
}

export default Appdetails
