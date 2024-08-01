import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Drawer, Typography} from "@mui/material";
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';
import { useNavigate } from 'react-router-dom';

const DevsideBar = () => {
  const [openApps, setOpenApps] = useState(true);
  const [activeItem, setActiveItem] = useState("Create App");
  const navigate = useNavigate();

  const handleItemClick = (text: string) => {
    setActiveItem(text);
    if (text === "Apps") setOpenApps(!openApps);
    if (text === "Home") {
      navigate("/developer");
    } else if (text === "Create App") {
      navigate("/developer/create-app");
    } else if (text === "My Apps") {
      navigate("/developer/myapps");
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 175, 
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 175, 
          boxSizing: "border-box",
          top: "64px",
          cursor:"pointer"
        },
      }}
    >
      <List>
        {["Home", "Apps"].map((text) => (
          <React.Fragment key={text}>
            <ListItem
              onClick={() => handleItemClick(text)}
              sx={{
                display: "flex",
                color: activeItem === text ? "lightblue" : "black",
              }}
            >
                {text === "Home" ? <RoofingOutlinedIcon /> : <AppRegistrationRoundedIcon/>}
              <ListItemText primary={text} sx={{fontWeight:"bold",ml:2}} />
            </ListItem>
            {text === "Apps" && (
              <Collapse in={openApps} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {["Create App", "My Apps"].map((subtext) => (
                    <ListItem
                      key={subtext}
                      onClick={() => handleItemClick(subtext)}
                      sx={{
                        color: activeItem === subtext ? "lightblue" : "black",
                      }}
                    >
                    
                        {subtext === "Create App" ? <AddOutlinedIcon  sx={{ml:1,mr:1.5,width:"30px"}}/> : <AirplayOutlinedIcon sx={{ml:1,mr:1.5,width:"30px"}}/>}
                   
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontSize: '0.875rem'}}>
                            {subtext}
                          </Typography>
                        }
                      /> 
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default DevsideBar;
