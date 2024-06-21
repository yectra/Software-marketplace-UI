import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import axios from 'axios';
import { loginRequest } from '../../../config/auth';
import { getUserEmailFromMsal } from '../../../common/services/AuthHelper';
import { MyappsData } from '../model/MyAppsData';


const DataTable = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [rows, setRows] = useState<MyappsData[]>([]);
  const { instance, inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
   const email=getUserEmailFromMsal(accounts);
   setEmail(email);
  }, [isAuthenticated, accounts]);

  const fetchData = async ({ status }: { status: string }) => {
    try {
      const response = await axios.post("http://localhost:2000/developer/devdisplay", { email, status });
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows([]); 
    }
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (newValue === 1) {
      fetchData({ status: "accepted" });
    } else if (newValue === 2) {
      fetchData({ status: "denied" });
    } else {
      fetchData({ status: "all" });
    }
  };

  useEffect(() => {
    if (email) {
      fetchData({ status: "all" });
    }
  }, [email]);

  const handleSearch = async (value: string) => {
    console.log(value);
    if (value === "") {
      fetchData({ status: "all" });
    } else {
      try {
        const response = await axios.get(`http://localhost:2000/developer/devsearch/${email}/${value}`);
        console.log(response.data);
        setRows(response.data[0]);
      } catch (error) {
        console.error("Error searching:", error);
        setRows([]);
      }
    }
  };

  const signInUser = () => {
    if (inProgress === InteractionStatus.None && !isAuthenticated) {
      instance
        .loginRedirect(loginRequest)
        .catch(e => {
          console.error('Login redirect error:', e);
        });
    }
  };

  const handleUploadClick = (appName: string) => {
    navigate(`/developer/update/${encodeURIComponent(appName)}`);
  };

  const handleMonitorClick = (appName: string) => {
    navigate(`/developer/monitor/${encodeURIComponent(appName)}`);
  };

  const handleAppClick = (appName: string) => {
    navigate(`/developer/appdetails/${encodeURIComponent(appName)}`);
  };

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          p: 2,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h6">Login to view your apps</Typography>
        <Button variant="text" sx={{ color: '#0C9DBD' }} onClick={signInUser}>
          Click here to login
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ ml: 1 }}>My Apps</Typography>
        <TextField
          label="Find your app"
          variant="outlined"
          size="medium"
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        sx={{
          mb: 4, mt: 2,
          '& .MuiTabs-indicator': {
            backgroundColor: '#0C9DBD',
            height: '2px',
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 'bold',
            minWidth: 100,
          },
          '& .Mui-selected': {
            color: 'black',
          },
        }}
      >
        <Tab label="All" />
        <Tab label="Accepted" />
        <Tab label="Denied" />
      </Tabs>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>AppName</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Version</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map?.(row => (
                <TableRow key={row.appname} hover role="checkbox" tabIndex={-1}>
                  <TableCell sx={{ cursor: "pointer" }} onClick={() => handleAppClick(row.appname)}>
                    {row.appname}
                  </TableCell>
                  <TableCell sx={{ color: row.status === "In Use" ? "green" : "inherit" }}>
                    {row.versions.length > 0 ? row.versions[row.versions.length-1].status : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {row.versions.length > 0 ? row.versions[row.versions.length - 1].v : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {row.versions[row.versions.length-1].approvedStatus==='accepted'? (
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleMonitorClick(row.appname)}
                        style={{ marginLeft: '8px' }}
                      >
                        Monitor your site
                      </Button>
                    ) : row.versions[row.versions.length-1].approvedStatus == 'pending' ? (
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleMonitorClick(row.appname)}
                        style={{ marginLeft: '8px' }}
                        disabled
                      >
                        Monitor your site
                      </Button>
                    ) : (
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleUploadClick(row.appname)}
                        style={{ marginLeft: '8px' }}
                      >
                        Upload
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DataTable;
