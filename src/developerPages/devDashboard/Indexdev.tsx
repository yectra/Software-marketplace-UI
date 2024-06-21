import { Box, Grid } from "@mui/material"
import DevappBar from "../../common/components/layout/DevAppbar"
import DevsideBar from "../../common/components/layout/DevSidebar"
import { Outlet } from "react-router-dom"


const Indexdev = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <DevappBar />
    <Grid container>
      <Grid item xs={0} sm={1} md={1.7}>
        <DevsideBar />
      </Grid>
      <Grid item xs={12} sm={10} md={10}> 
          <Outlet />
      </Grid>
    </Grid>
  </Box>
  )
}

export default Indexdev