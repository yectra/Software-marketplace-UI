import { Box } from "@mui/material"
import Functiontitle from "../components/Functiontitle"
import Functiondes from "../components/Functiondes"

const Functiondesview = () => {
  return (
  
        <Box sx={{ml:20,mt:10}}>
        <Functiontitle/>
        <Functiondes title={"Availability of Marketplace Functions"}/>
        <Functiondes title={"Limitations and considerations"}/>
        </Box>
  )
}

export default Functiondesview