import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

import des from '@/pages/docspages/appdescription/assets/Appadstitle.png'


const Title :React.FC= () => {
  return (
    <Box component="section" sx={{ m: 2, bgcolor: "#D9F2F7", p: 2, display: "flex", justifyContent: "space-around", borderRadius: 2 }}>
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', mr: 2 }}>
      <Typography variant='h5' sx={{  color: "#FFAC4E",font:"lato",fontWeight:700}}>Build the best commerce  apps and website </Typography>
      <Typography variant='subtitle2' sx={{ mb: 2 ,mt:2}}>Lorem ipsum dolor sit amet consectetur. Nisi fermentum pharetra vel viverra tincidunt augue. In sit dolor at enim non nulla fermentum suspendisse aliquam. Ac sollicitudin fames massa bibendum malesuada aliquet dictum.</Typography>
      <Button sx={{ color: "black", border: "solid 1px grey", borderRadius: 6, p: 2.5, mt: 3, height: 30, width: 200, '&:hover': { bgcolor: "transparent" } }}>See collections</Button>
    </Box>
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={des}
        alt="man"
        style={{ maxWidth: '100%', maxHeight: '80%', objectFit: 'contain' }}
      />
    </Box>
  </Box>
  )
}

export default Title