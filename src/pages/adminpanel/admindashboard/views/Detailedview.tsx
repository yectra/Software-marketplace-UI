
import Overview from "@/pages/adminpanel/admindashboard/components/Overview"
import Approvaldetails from "@/pages/adminpanel/admindashboard/components/Approvaldetails"

import { Box } from "@mui/material"

const Detailedview:React.FC = () => {
  return (
    <Box>
        <Overview/>
        <Approvaldetails  title={"Recent"}/>
    </Box>
  )
}

export default Detailedview