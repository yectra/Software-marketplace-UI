
import { Box } from "@mui/material"
import Appbar from "../../common/components/layout/Appbar"
import Title from "./components/Title"
import Sidebar from "../../common/components/layout/Sidebar"
import Apps from "./views/Apps"


const Index = () => {
  return (
    <Box sx={{ position: 'relative'}}>
    <Appbar/>
    <Sidebar/>
    <Box sx={{ marginTop: '77px', marginLeft: '131px' }}>
  <Title/>
  <Apps/>
  </Box>
  </Box>
  )
}

export default Index