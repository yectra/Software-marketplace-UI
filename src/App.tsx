import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import route from "@/providers/router";
import { Box} from "@mui/material";
import BaseSpinner from "./common/components/UI/Basespinner";

function App() {
  const routing = useRoutes(route);
 
  return (
    <Suspense fallback={
     <BaseSpinner/>
    }>
      <Box>
        {routing}
      </Box>
    </Suspense>
  );
}

export default App;
