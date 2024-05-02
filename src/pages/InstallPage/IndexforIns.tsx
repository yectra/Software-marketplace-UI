import { Box } from "@mui/material";
import { useLocation } from 'react-router-dom';
import Toolbar from "./Components/Toolbar";
import Appcard from "./Components/Appcard";
import { useEffect, useState } from "react";
import Imagecard from "./Components/Imagecard";
import Appviews from "./Views/Appviews";
import Appbar from "../../common/components/layout/Appbar";

const IndexforIns = () => {
  const location = useLocation();
  const { title, lndescription, linktorun } = location.state || { title: '', lndescription: '', linktorun: "" };

  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(lndescription);
  const [currentLinkToRun, setCurrentLinkToRun] = useState(linktorun);

  useEffect(() => {
    setCurrentTitle(title);
    setCurrentDescription(lndescription);
    setCurrentLinkToRun(linktorun);
  }, [location]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box>
        <Appbar />
      </Box>
      <Box sx={{ bgcolor: "#F1F1F1", mt: 7.5 }}>
        <Toolbar appname={currentTitle} />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Appcard 
              title={currentTitle}
              description={currentDescription}
              linktorun={currentLinkToRun}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Imagecard />
            <Appviews />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default IndexforIns;
