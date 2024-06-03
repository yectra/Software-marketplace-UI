import { Box } from "@mui/material"

import Devappcard from "../components/Devappcard"
import { Devdocscard } from "../components/Devdocscard"


const Devpage = () => {
  return (
    <Box sx={{display:"flex" ,justifyContent:"space-around",mt:10}}> 
        <Devdocscard/>
        <Devappcard/>
    </Box>
  
  )
}

export default Devpage