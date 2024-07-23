import { Box } from "@mui/material"
import Monitorapps from "@/pages/developerportal/developerappdetails/components/MonitorApps"
import Monitortable from "@/pages/developerportal/developerappdetails/components/MonitorTable"

const DeploymentDetails:React.FC = () => {
  return (
 <Box > 
    <Monitortable/>
    <Monitorapps/>

 </Box>
  )
}

export default DeploymentDetails