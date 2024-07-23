import { useNavigate } from 'react-router-dom';

import { formatTitleForUrl } from '@/common/UI/UiHelpers';

import { Box, Typography, Button, useTheme } from '@mui/material';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import StayPrimaryLandscapeIcon from '@mui/icons-material/StayPrimaryLandscape';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';

interface Iprops{
    appId:string,
    appName:string,
    shortDescription:string,
    overallRating:string,
    icon:string
}

const Appdetails:React.FC<Iprops> = ( {
  appName,
  icon,
  shortDescription,
  appId,
  overallRating
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleBoxClick = () => {
    const formattedTitle = formatTitleForUrl(appName)
    navigate(`/app/${formattedTitle}`, {
      state: { appName, icon,
        shortDescription,
        appId,
        overallRating},
    });
  };

  return (
    <Box
      onClick={handleBoxClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        maxWidth: '100%', 
        '@media (max-width: 600px)': {
          maxWidth: '100%', 
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing(2),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            maxHeight: '120px',
            overflow: 'hidden',
            '@media (max-width: 600px)': {
              maxWidth: '80px', 
              maxHeight: '80px', 
            },
          }}
        >
          <img
            src={icon}
            alt="app logo"
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'contain',
            }}
          />
        <Typography sx={{ml:1}} >{appName}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'end' }}>
          <InstallDesktopIcon />
          <StayPrimaryLandscapeIcon sx={{ ml: 1 }} />
        </Box>
      </Box>
      <Typography
        variant="subtitle2"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {shortDescription}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          marginTop: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="overline">{overallRating}</Typography>
          <StarIcon
            sx={{ fontSize: 'inherit', verticalAlign: 'middle', ml: 0.5 }}
          />
          <Typography variant="overline" sx={{ color: 'grey', ml: 0.5 }}>
            (3.8K)
          </Typography>
          <InfoIcon sx={{ color: 'grey', fontSize: '1.0rem' }} />
        </Box>
        <Button
          sx={{
            height: 28,
            width: 80,
            borderRadius: '15px',
            border: '1px solid #000000',
            color: '#000000',
            '&:hover': { bgcolor: 'transparent' },
          }}
        >
          Use
        </Button>
      </Box>
    </Box>
  );
};

export default Appdetails;