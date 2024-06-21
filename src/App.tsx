import { useRoutes } from "react-router-dom";
import route from "./providers/router";
import { Box } from "@mui/material";

function App() {
  const routing = useRoutes(route);

  return (
    
      <Box className="">
        {routing}
      </Box>

  );
}

export default App;
