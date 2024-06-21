import { useEffect, useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import axios from 'axios';
import { App, ApprovalData, Data } from '../models/ApprovalData';



const Approvaldetails = ({ title }: { title: string }) => {
  const [rows, setRows] = useState<Data[]>([]);
  const [denyReason, setDenyReason] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState<string>('');
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:2000/admin/admindisplay', { status: 'inprogress' });
      console.log(response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setRows(response.data);
      } else {
        console.log('Empty or invalid data received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleApprove = async (email: string, app: App) => {
    setLoading(true); 
    const latestVersion = app.versions[0];
    if (latestVersion) {
      const formData: ApprovalData = {
        isApproval: true,
        email: email,
        appname: app.appname,
        version: latestVersion.v,
        githublink: latestVersion.githublink,
        dockerhublink: latestVersion.dockerhublink,
        feedback: " "
      };

      try {
        await axios.post('http://localhost:2000/admin/approval', formData);
         await fetchData();
      } catch (error) {
        console.error('Error approving data:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('No versions available to approve.');
      setLoading(false);
    }
  };

  const handleDeny = async () => {
    setLoading(true); 
    if (selectedApp && selectedEmail) {
      const latestVersion = selectedApp.versions[0];
      if (latestVersion) {
        const formData: ApprovalData = {
          isApproval: false,
          email: selectedEmail,
          appname: selectedApp.appname,
          version: latestVersion.v,
          githublink: latestVersion.githublink,
          dockerhublink: latestVersion.dockerhublink,
          feedback: denyReason
        };

        try {
          await axios.post('http://localhost:2000/admin/approval', formData);
          setDenyReason(''); 
          setDialogOpen(false); 
          setSelectedEmail('');
          setSelectedApp(null);
          await fetchData();
        } catch (error) {
          console.error('Error denying data:', error);
        } finally {
          setLoading(false); 
        }
      } else {
        console.error('No versions available to deny.');
        setLoading(false); 
      }
    } else {
      console.error('No application or email selected.');
      setLoading(false); 
    }
  };

  const handleDenyDialogOpen = (email: string, app: App) => {
    setSelectedEmail(email);
    setSelectedApp(app);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedEmail('');
    setSelectedApp(null);
  };

  return (
    <Box>
      <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={rows.map((option) => option.apps.map((app) => app.appname)).flat()}
            sx={{ width: 300, height: 40, p: 2 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Find Your App"
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
                <TableCell>Username</TableCell>
                <TableCell>AppName</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Github URL</TableCell>
                <TableCell>Docker</TableCell>
                <TableCell>Approval Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) =>
                row.apps.map((app, appIndex) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={`${row.email}-${appIndex}`}>
                    {appIndex === 0 && (
                      <>
                        <TableCell rowSpan={row.apps.length}>
                          <Link href="#" underline="none">
                            {row.username}
                          </Link>
                        </TableCell>
                      </>
                    )}
                    <TableCell>{app.appname}</TableCell>
                    <TableCell>{app.versions[0]?.v ?? 'N/A'}</TableCell>
                    <TableCell>
                      {app.versions[0]?.githublink ? (
                        <Link href={app.versions[0].githublink} target="_blank" rel="noopener">
                          {app.versions[0].githublink}
                        </Link>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>{app.versions[0]?.dockerhublink ?? 'N/A'}</TableCell>
                    <TableCell>
                      <>
                        <Button variant="text" sx={{ color: 'green' }} onClick={() => handleApprove(row.email, app)}>
                          Approve
                        </Button>
                        <Button
                          variant="text"
                          sx={{ color: 'red' }}
                          onClick={() => handleDenyDialogOpen(row.email, app)}
                        >
                          Deny
                        </Button>
                      </>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Enter Deny Reason</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="deny-reason"
            label="Deny Reason"
            type="text"
            fullWidth
            value={denyReason}
            onChange={(e) => setDenyReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeny} color="primary">
            Deny
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Approvaldetails;
