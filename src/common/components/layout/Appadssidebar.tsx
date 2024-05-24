import {
    Box,
   
    List,
    ListItem,
    ListItemText,
  } from "@mui/material";
  import Drawer from "@mui/material/Drawer";


const Appadssidebar = () => {
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
                  sx={{ display: "flex", flexDirection: "column",alignItems: "flex-start"}}
                >
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
        width: "auto",
        boxSizing: "border-box",
        top: "64px",
      },
    }}
  >
  {Drawerlist}
  </Drawer> 
  )
}

export default Appadssidebar