import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Box,
  Typography,
  TextField,
  Autocomplete,
  Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { loginRequest } from '../../../config/auth';

interface Data {
  name: string;
  status: string;
  created: string;
  size: string;
}

const rows: Data[] = [
  { name: 'Jpg converter', status: 'Unused', created: '1 months ago', size: '-' },
  { name: 'Bg remover', status: 'In use', created: '2 months ago', size: '140.8 MB' },
  { name: 'Text summerizer', status: 'In use', created: '12 days ago', size: '162.76 MB' },
  { name: 'Pdf converter', status: 'In use', created: '5 days ago', size: '918.35 MB' },
];

const DataTable = () => {
  const navigate = useNavigate();
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  useEffect(() => {
 
    if (inProgress === null && isAuthenticated) {
      
      const redirectUrl = location.state?.from?.pathname || '/';

  
      navigate(redirectUrl, { replace: true });
    }
  }, [inProgress, isAuthenticated, location.state, navigate]);

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
    navigate(`/developer/upload/${encodeURIComponent(appName)}`, { state: { from: location } });
  };

  const handleMonitorClick = (appName: string) => {
    navigate(`/developer/monitor/${encodeURIComponent(appName)}`, { state: { from: location } });
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6">My Apps</Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={rows.map(option => option.name)}
            sx={{ width: 300, height: 40 }}
            renderInput={params => (
              <TextField
                {...params}
                label="Find your app"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
        </Box>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Size</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  <TableCell>
                    <Link href="#" underline="none">
                      {row.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {row.status === 'In use' ? (
                      <Link href="#" underline="none">
                        {row.status}
                      </Link>
                    ) : (
                      row.status
                    )}
                  </TableCell>
                  <TableCell>{row.created}</TableCell>
                  <TableCell>{row.size}</TableCell>
                  <TableCell>
                    {row.status === 'Unused' ? (
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleUploadClick(row.name)}
                        style={{ marginLeft: '8px' }}
                      >
                        Upload
                      </Button>
                    ) : (
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleMonitorClick(row.name)}
                        style={{ marginLeft: '8px' }}
                      >
                        Monitor your site
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DataTable;