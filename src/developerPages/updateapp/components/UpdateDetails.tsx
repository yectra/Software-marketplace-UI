import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { getUserEmailFromMsal } from '../../../common/services/AuthHelper';
import { Data } from '../models';

const Updatedetails = () => {
  const[userEmail,setUserEmail]=useState<string>('')
  const { appName } = useParams();
  const [version, setVersion] = useState([1, 0, 0]); 
  const [selectedVersionType, setSelectedVersionType] = useState<string | null>(null);
  const [github, setGithub] = useState("");
  const [dockerurl, setDockerurl] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { accounts } = useMsal();

  useEffect(() => {
    const email = getUserEmailFromMsal(accounts);
    setUserEmail(email);
  }, [accounts]);



  const approvalData: Data = {
    email:userEmail,
    githublink: github,
    dockerhublink: dockerurl,
    appname: appName || '',
    version: version.join('.'), 
    description
  };

  const handleApprovalClick = async () => {
    try {
      console.log(approvalData);
      const response = await axios.put("http://localhost:2000/developer/request", approvalData);
      navigate("/developer/myapps")
      console.log(response.data)
    } catch (error) {
      console.error('Error sending approval request:', error);
    }
  };

  const handleVersionUpdate = (type: string) => {
    let newVersion = [...version];

    if (selectedVersionType) {
      switch (selectedVersionType) {
        case 'Major':
          newVersion[0] -= 1;
          break;
        case 'Minor':
          newVersion[1] -= 1;
          break;
        case 'Patch':
          newVersion[2] -= 1;
          break;
        default:
          break;
      }
    }

    switch (type) {
      case 'Major':
        newVersion[0] += 1; 
        newVersion[1] = 0; 
        newVersion[2] = 0; 
        break;
      case 'Minor':
        newVersion[1] += 1; 
        newVersion[2] = 0;
        break;
      case 'Patch':
        newVersion[2] += 1; 
        break;
      default:
        break;
    }

    setVersion(newVersion);
    setSelectedVersionType(type);
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, textTransform: "uppercase" }} gutterBottom>
        Update App: {appName}
      </Typography>
      <Typography gutterBottom>What's New</Typography>
      <TextField
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Add the feature updates"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ width: '100%' }}
      />

      <Typography variant="h6" sx={{ fontWeight: 700 }}>Update Details</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: 300, mt: 2 }}>
        <Button variant="contained" onClick={() => handleVersionUpdate('Major')}>
          Major
        </Button>
        <Button
          variant="contained"
          sx={{ color: "white", backgroundColor: "green", "&:hover": { backgroundColor: "green" } }}
          onClick={() => handleVersionUpdate('Minor')}
        >
          Minor
        </Button>
        <Button
          variant="contained"
          sx={{ color: "white", backgroundColor: "orange", '&:hover': { backgroundColor: "orange" } }}
          onClick={() => handleVersionUpdate('Patch')}
        >
          Patch
        </Button>
      </Box>
      <Typography variant="h6" sx={{ mt: 2 }}> Version {version.join('.')}</Typography>
      <TextField
        label={`GitHub Link of ${appName}`}
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Enter GitHub link"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />

      <TextField
        label="Link to your Docker Image on hub"
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Your Docker image link"
        value={dockerurl}
        onChange={(e) => setDockerurl(e.target.value)}
      />

     

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#0C9DBD",
          color: "#fff",
          '&:hover': { backgroundColor: "#0C9DBD" },
          mt: 2
        }}
        onClick={handleApprovalClick}
      >
        Request for Approval
      </Button>
    </Box>
  );
}

export default Updatedetails;
