  import { useEffect, useState } from 'react';

  import useLoading from '@/common/hooks/useLoading';
  import LoadingBackdrop from '@/common/UI/LoadingBackdrop';
  import { AdminService } from '@/pages/adminpanel/admindashboard/services/index';
  import {  AppDetails} from '@/pages/adminpanel/admindashboard/models';
  import { StyledTableCell, StyledTableRow } from '@/common/UI/StyledElements';
  import { FileCopyOutlined } from '@mui/icons-material';
  import CustomSnackbar from '@/common/components/feedback/CustomSnackbar'
  import BaseButton from '@/common/components/controls/BaseButton';

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
    Drawer,
    Divider,
    IconButton,
    Tooltip,
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';

  const ApprovedApps: React.FC = () => {
    const [rows, setRows] = useState<AppDetails[]>([]);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [selectedApp, setSelectedApp] = useState<AppDetails | null>(null); 
    const { isLoading, setLoading } = useLoading();
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<string>('success'); 
    const adminService = new AdminService();

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await adminService.getApprovedRequests();
        console.log(response);
        if (Array.isArray(response) && response.length > 0) {
          setRows(response);
        } else {
          console.log("Empty or invalid data received:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleDeployClick = (app: any) => {
      setSelectedApp(app); 
      console.log(app)
      setDrawerOpen(true);

    };

    const handleDrawerClose = () => {
      setDrawerOpen(false);
      setSelectedApp(null);
    };

    const handleCopyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        setSnackbarSeverity('success');
        setSnackbarMessage('Copied to clipboard');
        setIsSnackbarOpen(true);
      }).catch((err) => {
        console.error('Could not copy text: ', err);
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to copy to clipboard');
        setIsSnackbarOpen(true);
      });
    };

    const handleCloseSnackbar = () => {
      setIsSnackbarOpen(false);
    };

    return (
      <Box>
        <LoadingBackdrop isLoading={isLoading} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6">Approved Apps</Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Autocomplete
              freeSolo
              id="app-search"
              disableClearable
              options={rows.flatMap(row => row.developerApps.map(app => app.appName))}
              sx={{ width: 300, height: 40, p: 2 }}
              renderInput={params => (
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
                  <StyledTableCell>Username</StyledTableCell>
                  <StyledTableCell>AppName</StyledTableCell>
                  <StyledTableCell>Version</StyledTableCell>
                  <StyledTableCell>Github URL</StyledTableCell>
                  <StyledTableCell>Approval Status</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row =>
                  row.developerApps.map((app, appIndex) => (
                    <StyledTableRow key={`${row.email}-${appIndex}`}>
                      {appIndex === 0 && (
                        <TableCell rowSpan={row.developerApps.length}>
                          <Link href="#" underline="none">
                            {row.userName}
                          </Link>
                        </TableCell>
                      )}
                      <TableCell sx={{ color: 'green' }}>{app.appName}</TableCell>
                      <TableCell>{app.updatedVersion}</TableCell>
                      <TableCell>
                        {app.gitHubLink ? (
                          <Link href={app.gitHubLink} target="_blank" rel="noopener">
                            {app.gitHubLink}
                          </Link>
                        ) : 'N/A'}
                      </TableCell>
                      <TableCell sx={{ color: 'green' }}>Approved</TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          onClick={() => handleDeployClick(row)}
                        >
                          Add Deployment URL
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerClose}
        >
          <Box sx={{ width: 400, p: 2, mt: 10 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">Add Deployment URL</Typography>
              <IconButton onClick={handleDrawerClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ my: 2 }} />
            {selectedApp && ( 
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Developer's Github URL:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.200', borderRadius: 1, my: 1, p: 1 }}>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>{selectedApp.developerApps[0].gitHubLink}</Typography>
                  <Tooltip title="Copy to clipboard">
                    <IconButton onClick={() => handleCopyToClipboard(selectedApp.developerApps[0].gitHubLink)}>
                      <FileCopyOutlined />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Admin Github URL:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.200', borderRadius: 1, my: 1, p: 1 }}>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>{selectedApp.developerApps[0].createdGit}</Typography>
                  <Tooltip title="Copy to clipboard">
                    <IconButton onClick={() => handleCopyToClipboard(selectedApp.developerApps[0].createdGit)}>
                      <FileCopyOutlined />
                    </IconButton>
                  </Tooltip>
                </Box>
                <TextField
                  label="Deployment URL"
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <BaseButton
                  variant="contained"
                  fullWidth
                  marginTop={10}
                  name='Save'
                  onClick={() => setDrawerOpen(false)}
                />
              </Box>
            )}
          </Box>
        </Drawer>
        <CustomSnackbar
          open={isSnackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        />
      </Box>
    );
  };

  export default ApprovedApps;
