import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import AppsIcon from "@mui/icons-material/Apps";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from 'react-router-dom';

const DevsideBar = () => {
  const [openApps, setOpenApps] = useState(true);
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();

  const handleItemClick = (text: string) => {
    setActiveItem(text);
    if (text === "Apps") setOpenApps(!openApps);

    if (text=="Home") {
      navigate("/developer");
    }
    else if(text=="App Ads"){
    navigate("/ads")
  }
  else if(text=="My Apps")
  {
    navigate("/dev")
  }
}

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 140,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 132,
          boxSizing: "border-box",
          top: "64px",
        },
      }}
    >
      <List>
        {["Home", "Apps"].map((text, index) => (
          <React.Fragment key={text}>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                color: activeItem === text ? "lightblue" : "black",
              }}
            >
              <Button
                onClick={() => handleItemClick(text)}
                sx={{
                  color: activeItem === text ? "lightblue" : "inherit",
                  fontSize: '1rem',
                  "&:hover": {
                    color: "lightblue",
                  }
                }}
              >
                {text === "Home" && <HomeIcon sx={{ m: 1 }} />}
                {text === "Apps" && <AppsIcon sx={{ m: 1 }} />}
                <ListItemText primary={text} />
              </Button>
            </ListItem>
            {index === 1 && (
              <List disablePadding sx={{ display: openApps ? "block" : "none" }}>
                {["My Apps", "App Ads"].map((subtext) => (
                  <ListItem key={subtext} sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      onClick={() => handleItemClick(subtext)}
                      variant='text'
                      size='small'
                      sx={{
                        ml: 4,
                        color: activeItem === subtext ? "lightblue" : "black",
                        "&:hover": {
                          color: "lightblue",
                        },
                      }}
                    >
                      {subtext}
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default DevsideBar;