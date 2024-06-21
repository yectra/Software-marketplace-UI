import { Box } from "@mui/material"
import Overview from "../components/Overview"
import Approvaldetails from "../components/Approvaldetails"


const Detailedview = () => {
  return (
    <Box sx={{mt:10,ml:20}}>
        <Overview/>
        <Approvaldetails  title={"Recent"}/>
    </Box>
  )
}

export default Detailedview