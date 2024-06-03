import { Box, Typography,Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

const Adsdetails = ( 
    {title,
        logo,
        description,
        bgcolor}:{
            title: string;
            logo: string;
            description: string;
            bgcolor:string
    
        }) => { 

            const navigate=useNavigate();
            const handleboxclick=()=>{
                navigate("/docs/function")
            }
  return (
    <Box sx={{display:"flex",flexDirection:"column"}} >
        <Box sx={{display:"flex",justifyContent:"space-evenly",alignItems:"center",bgcolor:bgcolor,height:150}}>
            <Typography variant="h6"  sx={{fontFamily:"bold",color:"white"}}>{title}</Typography>
            <img
        src={logo}
        alt="man"
        style={{ maxWidth: '100%', maxHeight: '80%', objectFit: 'contain' }}
      />
        </Box>
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"flex-start",margin:2}}>
            <Typography variant="subtitle2">{description}</Typography>
            <Button sx={{ color: "black", border: "solid 1px black", borderRadius: 2, p: 1, mt: 3, height: 30, width:100, '&:hover': { bgcolor: "transparent" } }} onClick={handleboxclick}>View</Button>
        </Box>
    </Box>
  
  )
}

export default Adsdetails