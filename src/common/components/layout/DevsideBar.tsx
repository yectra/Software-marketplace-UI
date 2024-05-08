import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemText,
  } from "@mui/material";
  import Drawer from "@mui/material/Drawer";
  import AppsIcon from "@mui/icons-material/Apps";
  import HomeIcon from "@mui/icons-material/Home";
  
const DevsideBar = () => {
    const Drawerlist = (
        <Box sx={{width: 132, color: "black" }}>
          <Box
            sx={{
              width: 132,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <List>
              {["Home", "Apps"].map((text) => (
                <ListItem
                  key={text}
                  sx={{ display: "flex",alignItems: "center" }}
                >
                 <IconButton sx={{color:"black"}}>
                  {text === "Home" && <HomeIcon />}
                  {text === "Apps" && <AppsIcon />}
                  </IconButton>
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
      width: 132,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: 132,
        boxSizing: "border-box",
        top: "64px",
      },
    }}
  >
    {Drawerlist}
  </Drawer>
 
    
  )
}

export default DevsideBar