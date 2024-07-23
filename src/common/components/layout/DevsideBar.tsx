import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Drawer, Typography} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from 'react-router-dom';

const DevsideBar = () => {
  const [openApps, setOpenApps] = useState(true);
  const [activeItem, setActiveItem] = useState("Home");
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
                {text === "Home" ? <HomeIcon /> : <AppsIcon />}
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
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontSize: '0.875rem', ml: 5}}>
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
