
import { Typography, TextField, Button, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

const Uploadapp = () => {
  const { appName } = useParams();
  const [email,setEmail]=useState("");
  const[github,setGithub]=useState("");
  const [dockerurl,setDockerurl]=useState("");
  const navigate=useNavigate();

  const isAuthenticated=useIsAuthenticated();
  const {  accounts } = useMsal();

  useEffect(()=>{
    if(isAuthenticated && accounts.length>0)
      {
        const account=accounts[0];
        const username=account.username;
        setEmail(username);
      }
  },[isAuthenticated,accounts])


  const appdata={
    email, githublink:github, dockerhublink:dockerurl, appName 
  }

  const handleuploadclick=async ()=>{
    const response= await axios.put("http://localhost:2000/details/appupdate",appdata);
    if (response.status === 200)
      {
        navigate("/developer/myapps")
      }
      else{
        console.log(response);
      }

  }

  return (
    <Box sx={{mt:10}}>
      <Typography variant="h6" gutterBottom>
        Upload App: {appName}
      </Typography>
      <TextField
        label={`GitHub Link of  ${appName}`}
        fullWidth
        onChange={(e) => setGithub(e.target.value)}
        variant="outlined"
        margin="normal"
        placeholder="Enter GitHub link"
      />
      <TextField
        label="Link to your Docker Image on hub "
        fullWidth
        onChange={(e)=>setDockerurl(e.target.value)}
        variant="outlined"
        margin="normal"
        placeholder="your docker image link"
      
      />
      <Button variant="contained" sx={{color:"#0C9DBD"}} onClick={handleuploadclick}>
        Upload
      </Button>
    </Box>
  );
};

export default Uploadapp;
