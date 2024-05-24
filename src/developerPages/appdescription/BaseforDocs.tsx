import { Box } from "@mui/material"
import Appadsnavbar from "../../common/components/layout/Appadsnavbar"
import Appadssidebar from "../../common/components/layout/Appadssidebar"
import { Outlet } from "react-router-dom"

const BaseforDocs = () => {
  return (
    <Box>
        <Appadsnavbar/>
        <Appadssidebar/>
        <Outlet/>
    </Box>
  )
}

export default BaseforDocs