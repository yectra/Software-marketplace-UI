import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { GrDeploy } from "react-icons/gr";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";


const AdminSidebar = () => {
  const [activeItem, setActiveItem] = useState("Overview");
  const navigate = useNavigate();

  const handleClick = ({ text }: { text: string }) => {
    setActiveItem(text);
    if (text === "Approved Apps") {
      navigate("admin/approved");
    } else if (text === "Denied Apps") {
      navigate("/admin/denied");
    } else if (text === "Deployment Center") {
      navigate("/admin/deployment-center");
    } else {
      navigate('/admin');
    }
  };

  const iconMapping: { [key: string]: JSX.Element } = {
    "Overview": <WysiwygIcon />,
    "Approved Apps": <DoneAllOutlinedIcon />,
    "Denied Apps": <DangerousOutlinedIcon />,
    "Deployment Center": <GrDeploy />,
  };

  const DrawerList = (
    <Box sx={{ width: "auto", color: "black" }}>
      <Box
        sx={{
          width: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List>
          {["Overview", "Approved Apps", "Denied Apps", "Deployment Center"].map((text) => (
            <ListItem
              key={text}
              onClick={() => handleClick({ text })}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: activeItem === text ? "#0C9DBD" : "#6D6767",
                cursor: "pointer",
              }}
            >
                <ListItemIcon sx={{ minWidth: "30px" ,color:"black"}}>
                {iconMapping[text]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "auto",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "auto",
          boxSizing: "border-box",
          top: "62px",
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
};

export default AdminSidebar;
