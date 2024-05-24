import { Box } from "@mui/material"
import Appadsnavbar from "../../../common/components/layout/Appadsnavbar"
import Appadssidebar from "../../../common/components/layout/Appadssidebar"
import Title from "../components/Title"

import Multiads from "./Multiads"


const Descriptionview = () => {
  return (
    <Box>
        <Appadsnavbar/>
        <Appadssidebar/>
        <Box sx={{ml:19,mt:10}}>
        <Title/>
        <Multiads/>
        </Box>
    </Box>
  )
}

export default Descriptionview