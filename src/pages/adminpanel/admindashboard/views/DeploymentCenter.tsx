import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import DeployedAppInfo from "../components/DeployedAppInfo";

const DeploymentCenter = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>Deployment Center</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          {['Main Information', 'Metrics', 'Container Logs', 'Admin Logs'].map((label, index) => (
            <Tab
              key={index}
              label={label}
              sx={{ textTransform: 'inherit', fontWeight: 600, fontStyle: "bold" }}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {value === 0 && <Typography><DeployedAppInfo/></Typography>}
        {value === 1 && <Typography>Metrics Content</Typography>}
        {value === 2 && <Typography>Container Logs Content</Typography>}
        {value === 3 && <Typography>Admin Logs Content</Typography>}
      </Box>
    </Box>
  );
};

export default DeploymentCenter;
