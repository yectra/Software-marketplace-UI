import { Box, Grid } from "@mui/material"
import DevappBar from "../../common/components/layout/DevappBar"
import DevsideBar from "../../common/components/layout/DevsideBar"
import { Outlet } from "react-router-dom"


const Indexdev = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <DevappBar />
    <Grid container>
      <Grid item xs={0} sm={2} md={2}>
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