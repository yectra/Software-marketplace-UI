import Devappcard from "@/pages/developerportal/developmentstarter/components/DevAppCard"
import { Devdocscard } from "@/pages/developerportal/developmentstarter/components/DevDocsCard"

import { Box } from "@mui/material"



const BuildApp = () => {
  return (
    <Box sx={{display:"flex" ,justifyContent:"space-evenly"}}> 
        <Devdocscard/>
        <Devappcard/>
    </Box>
  
  )
}

export default BuildApp