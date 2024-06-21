import { Box } from "@mui/material"

import Devappcard from "../components/DevAppCard"
import { Devdocscard } from "../components/DevDocsCard"


const Devpage = () => {
  return (
    <Box sx={{display:"flex" ,justifyContent:"space-around",mt:10}}> 
        <Devdocscard/>
        <Devappcard/>
    </Box>
  
  )
}

export default Devpage