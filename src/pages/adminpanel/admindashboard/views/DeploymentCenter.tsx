import { Box, Tab, Tabs, Typography } from "@mui/material"
import { useState } from "react";


const DeploymentCenter = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };


  return (
   <Box>
    <Typography variant="h6" sx={{fontWeight:700}}>Deployment Center</Typography>
    <Box sx={{ borderBottom: 1, borderColor: 'divider',mt:2 }}>
  <Tabs value={1} onChange={handleChange} aria-label="basic tabs example">
  {['Main Information', 'Metrics', 'Container Logs', 'Admin Logs'].map((label, index) => (
          <Tab
            key={index}
            label={label}
            sx={{ textTransform:'inherit',fontWeight:600,fontStyle:"bold"  }}
          />
        ))}
  </Tabs>
</Box>
   </Box>
  )
}

export default DeploymentCenter