import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

const BaseforDocs = () => {
  return (
    <Box>
        <Outlet/>
    </Box>
  )
}

export default BaseforDocs