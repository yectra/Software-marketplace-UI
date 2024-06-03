
import { Box, Grid } from "@mui/material"

import Title from "./components/Title"
import Sidebar from "../../common/components/layout/Sidebar"
import Apps from "./views/Apps"
import Appbar from "../../common/components/layout/Appbar"



const Index = () => {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'auto' }}>
     
    {/* /*<Grid container>
      <Grid item xs={0} sm={0} md={1}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={12} md={11}>
       
      </Grid>
    </Grid> */}
     <Box sx={{mt:6  }}>
          <Title />
          <Apps />
        </Box>
  </Box>

  )
}

export default Index