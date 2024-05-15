import { Box } from "@mui/material"
import DevappBar from "../../../common/components/layout/DevappBar"
import DevsideBar from "../../../common/components/layout/DevsideBar"
import Devappcard from "../components/Devappcard"
import { Devdocscard } from "../components/Devdocscard"


const Devpage = () => {
  return (
  <Box>
     <DevappBar/>
    <DevsideBar/>
    <Box sx={{display:"flex" ,justifyContent:"space-around", ml:20,mt:10}}>
       
        <Devdocscard/>
        <Devappcard/>
    </Box>
  </Box>
  )
}

export default Devpage