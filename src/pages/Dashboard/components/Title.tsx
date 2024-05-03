import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import bgtitle from '../assets/Logoimg/Bg-title.png'
import man from '../assets/Logoimg/man raising cup.png'
const Title = () => {
  return (
    <Box component="section" sx={{ m:2,bgcolor:" #FFFFF2", p: 2, display:"flex", justifyContent:"space-around" }}>
    <Box sx={{ justifyItems:"center" }}>
      <Typography variant='h5' sx={{mt:5,mb:1,color:"black"}}>Favourites of 2024</Typography>
      <Typography variant='subtitle2'>Discover the stand out software that made out our year</Typography>
      <div>
        <Button  sx={{color:"black",border:"solid 1px grey",borderRadius:6,p:1,mt:3,height:30,width:200,'&:hover': { bgcolor: "transparent" } }}>See collections</Button>
      </div>
    </Box>
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={bgtitle}
        alt="man"
        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
      />
      <img
        src={man}
        alt="decor"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
        }}
      />
    </div>
  </Box>
  )
}

export default Title