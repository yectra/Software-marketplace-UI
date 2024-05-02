import {
    Box,
    List,
    ListItem,
    ListItemText,
  } from "@mui/material";
  import Drawer from "@mui/material/Drawer";
  import HomeIcon from "@mui/icons-material/Home";

  import AppsIcon from "@mui/icons-material/Apps";
  import FileOpenIcon from "@mui/icons-material/FileOpen";
  import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
  
  export default function Sidebar() {
  
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
                {["Home", "Apps", "Files", "Marketplace"].map((text) => (
                  <ListItem
                    key={text}
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                    {text === "Home" && <HomeIcon />}
                    {text === "Apps" && <AppsIcon />}
                    {text === "Files" && <FileOpenIcon />}
                    {text === "Marketplace" && <AddShoppingCartIcon />}
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
    );
  }
  