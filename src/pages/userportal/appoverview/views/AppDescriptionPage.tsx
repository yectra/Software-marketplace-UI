import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import AppCard from "@/pages/userportal/appoverview/components/AppCard";
import Toolbar from "@/pages/userportal/appoverview/components/Toolbar";
import TabComponent from "@/pages/userportal/appoverview/components/TabComponent";

import { Box } from "@mui/material"

const AppDescriptionPage = () => {

    const location = useLocation();
    const { appName,appId } = location.state;
    const [currentTitle, setCurrentTitle] = useState(appName);
  
    useEffect(() => {
      setCurrentTitle(appName);
 
    }, [location]);
  return (
    <Box>
         <Box sx={{ bgcolor: "#F1F1F1", mt: 7.5 }}>
        <Toolbar appName={currentTitle.toUpperCase()} />
      </Box>
      <Box sx={{p:3}}>
      <AppCard appName={currentTitle} appId={appId}></AppCard>
      <TabComponent/>
      </Box>
    </Box>
  )
}
export default AppDescriptionPage;
