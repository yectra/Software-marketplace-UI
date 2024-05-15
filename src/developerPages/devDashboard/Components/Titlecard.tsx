import { Box, Button, Typography } from "@mui/material"
import des from '../../assets/Description.png'
import { useNavigate } from "react-router-dom"

export const Titlecard = () => {
    const navigate=useNavigate();

    const handleclick=()=>{
        navigate('/dev')

    }
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
    <Typography variant="h6" sx={{ color: "#6D6767" }}>
        Build for 1,000,000+ from
    </Typography>
    <Typography variant="h6" sx={{ color: "#6D6767", textAlign: 'center', width: '100%' }}>
        Marketplace
    </Typography>
</Box>
        <Box>
        <Button onClick={handleclick} sx={{  bgcolor: "#0C9DBD",width:150,borderRadius:20}} variant="contained">Create app</Button>
        </Box>
    </Box>
  )
}
