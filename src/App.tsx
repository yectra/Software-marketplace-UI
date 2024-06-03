import  { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import route from "./providers/router";
import BaseSpinner from "./common/components/UI/Basespinner";
import { Box } from "@mui/material";

function App() {
  const routing = useRoutes(route);

  return (
    <Suspense fallback={<BaseSpinner />}>
      <Box className="">
        {routing}
      </Box>
    </Suspense>
  );
}

export default App;
