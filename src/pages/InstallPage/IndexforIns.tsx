import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import Toolbar from "./Components/Toolbar";
import Appcard from "./Components/Appcard";
import { useEffect, useState } from "react";
import Imagecard from "./Components/Imagecard";
import Appviews from "./Views/Appviews";


const IndexforIns = () => {
  const location = useLocation();
  const navigate=useNavigate();
  window.scrollTo(0,0)
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ bgcolor: "#F1F1F1", mt: 7.5 }}>
        <Toolbar appname={currentTitle} />
      </Box>
      <Box sx={{ display: "flex",flexGrow:1 }}>
        <Box sx={{ display: 'flex', flexGrow: 1,margin:"auto" }}>
          <Box >
            <Appcard 
              title={currentTitle}
              description={currentDescription}
              linktorun={currentLinkToRun}
            />
          </Box>
          <Box sx={{ display: "flex",flexDirection:"column",flexGrow:1,m:2}}>
            <Imagecard />
            <Appviews />
          </Box>
        </Box>
      </Box>
      <Button onClick={()=>{
        navigate('/developer')

      }}>Developer page</Button>
    </Box>
  );
}

export default IndexforIns;
