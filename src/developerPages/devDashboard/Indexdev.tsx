import { Box } from "@mui/material"
import DevappBar from "../../common/components/layout/DevappBar"
import DevsideBar from "../../common/components/layout/DevsideBar"
import { Outlet } from "react-router-dom"


const Indexdev = () => {
  return (
    <Box>
        <DevappBar/>
        <DevsideBar/>
        <Outlet/>
    </Box>
  )
}

export default Indexdev