import { Box } from "@mui/material"
import Appadsnavbar from "../../common/components/layout/DocsNavbar"
import Appadssidebar from "../../common/components/layout/DocsSidebar"
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