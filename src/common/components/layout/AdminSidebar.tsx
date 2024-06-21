import {
    Box,
    List,
    ListItem,
    ListItemText,
  } from "@mui/material";
  import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const AdminSidebar = () => {

  const[activeitem,setactiveitem]=useState("Overview");
  const navigate=useNavigate();

  const handleclick=({text}:{text:string})=>{
    setactiveitem(text);
  if(text=="Approved Apps")
    {
      navigate("approved")

    }
    else if(text=="Denied Apps")
      {
        navigate("/admin/denied")

      }
      else{
        navigate("/admin")

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
              {["Overview", "Approved Apps","Denied Apps"].map((text) => (
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
      width: 132,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: "auto",
        boxSizing: "border-box",
        top: "62px",
      },
    }}
  >
  {Drawerlist}
  </Drawer> 
  )
}

export default AdminSidebar