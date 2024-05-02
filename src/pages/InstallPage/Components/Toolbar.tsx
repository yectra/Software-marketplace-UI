import {  Box,   IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';



const Toolbar = ({appname}:{appname:string}) => {
    const navigate=useNavigate();
    const handleiconclick=()=>{
        navigate("/")

    }
  return (
    <Box sx={{ display: "flex", alignItems: "center"}}>
      <IconButton size="small" sx={{ml:3}}  onClick={handleiconclick} >
        <ArrowBackIosIcon />
      </IconButton>
      <Typography variant='h6' sx={{ml:68}} >{appname}</Typography>
    </Box>

  )
}

export default Toolbar