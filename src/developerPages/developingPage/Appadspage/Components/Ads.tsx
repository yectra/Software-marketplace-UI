import { Box,Typography } from "@mui/material"
import des from '../assets/adsdescription.png'
const Ads = () => {
  return (
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginTop:15}} >
    <Box>
    <img  height={282}   src={des}></img>
    </Box>
    <Box sx={{
display: 'flex',
flexDirection: 'column', 
alignItems: 'center', 
justifyContent: 'center', 
p: 2
}}>
<Typography variant="h6" sx={{ color: "#000000" ,m:2}}>
Get more apps
</Typography>
<Typography variant="subtitle2" sx={{ color: "#6D6767", textAlign: 'center', width: '70%' }}>
Lorem ipsum dolor sit amet consectetur.Sed vel at List more app faucibus pulvinar molestie.
</Typography>
</Box>
</Box>
  )
}

export default Ads