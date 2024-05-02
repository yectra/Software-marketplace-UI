import  { useState } from 'react';
import { Box, IconButton, Typography, Button, Card, CardContent, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import TabletIcon from '@mui/icons-material/Tablet';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto', 
});

const IframeContainer = styled('div')({
  position: 'relative',
  width: '90vw',  
  maxWidth: '1280px',
  height: '100vh',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' 
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: 'red',
  zIndex: 1, 
});

export default function Appcard({ title, description, linktorun }:{title:string,description:string,linktorun:string}) {
  const [openModal, setOpenModal] = useState(false);

  const handleRunButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getInitials = (name:string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div>
      <Card variant="outlined" sx={{ width: 378, m: 2, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", m: 2 }}>
            <Box sx={{
              width: 30,
              height: 30,
              bgcolor: 'black',
              color: '#09FFC4',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '20%',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>
              <Typography variant="body2" component="span" sx={{ color: 'inherit', fontSize: 'inherit' }}>
                {getInitials(title)}
              </Typography>
            </Box>
            <Typography variant='h6' sx={{ ml: 1 }}>{title}</Typography>
          </Box>
          <Box sx={{ m: 2 }}>
            <IconButton size='medium'>
              <InstallDesktopIcon />
            </IconButton>
            <IconButton><TabletIcon /></IconButton>
            <IconButton>
              <InstallMobileIcon />
            </IconButton>
          </Box>
          <Box sx={{ m: 2 }}>
            <Typography variant='subtitle2'>{description}</Typography>
          </Box>
          <Box sx={{ m: 2 }}>
            <Button sx={{ ml: 15, bgcolor: "#0C9DBD" }} variant="contained" onClick={handleRunButtonClick}>Run</Button>
          </Box>
        </CardContent>
      </Card>
      <StyledModal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby={title}
          aria-describedby={description}
      >
        <IframeContainer>
          <Typography variant="h6" component="h2" sx={{ mt: 2, color: 'black' }}>
           {title}
          </Typography>
          <iframe
              src={linktorun}
              style={{
                  width: '100%',
                  height: 'calc(100% - 32px)',
                  border: 'none'
              }}
              title="Embedded Content"
          ></iframe>
          <CloseButton onClick={handleCloseModal}>
            <CloseIcon />
          </CloseButton>
        </IframeContainer>
      </StyledModal>
    </div>
  );
}
