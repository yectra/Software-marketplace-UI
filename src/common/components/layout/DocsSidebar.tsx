import {
    Box,
    List,
    ListItem,
    ListItemText,
  } from "@mui/material";
  import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const DocsSidebar = () => {

  const[activeitem,setactiveitem]=useState("Overview");
  const navigate=useNavigate();


  const handleclick=({text}:{text:string})=>{
    setactiveitem(text);
    if(text=="Developer tools")
      {
        navigate("/docs/developertools")

      }
      if(text=="Overview")
        {
          navigate("/docs")
        }
  

  }
    const Drawerlist = (
        <Box sx={{width: "auto", color: "black" }}>
          <Box
            sx={{
              width: "auto",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <List>
              {["Overview", "Developer tools", "App structure", "Design guidelines","Payments","Marketing"].map((text) => (
                <ListItem
                  key={text}
                  onClick={()=>handleclick({text})}
                  sx={{ display: "flex", flexDirection: "column",alignItems: "flex-start",color:activeitem==text?"#0C9DBD":"#6D6767",cursor:"pointer"}}
                >
                  
                  <ListItemText primary={text}  />
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
      width: 170,
      "& .MuiDrawer-paper": {
        width: 170,
        boxSizing: "border-box",
        top: "64px",
      },
    }}
  >
  {Drawerlist}
  </Drawer> 
  )
}

export default DocsSidebar;