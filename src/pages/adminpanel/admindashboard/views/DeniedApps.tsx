import { useEffect, useState } from 'react';

import { AdminService } from '@/pages/adminpanel/admindashboard/services/index';
import { AppDetails } from '@/pages/adminpanel/admindashboard/models';
import { StyledTableCell, StyledTableRow } from '@/common/UI/StyledElements';
import useLoading from '@/common/hooks/useLoading';
import LoadingBackdrop from '@/common/UI/LoadingBackdrop';

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
} from '@mui/material';

const DeniedApps: React.FC = () => {
  const [rows, setRows] = useState<AppDetails[]>([]);
  const { isLoading, setLoading } = useLoading();
  const adminService = new AdminService();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await adminService.getDeniedRequests();
      if (Array.isArray(response) && response.length > 0) {
        console.log(response);
        setRows(response);
      } else {
        console.log("Empty or invalid data received:", response);
        setRows([]); // Ensure rows is always an array
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows([]); // Ensure rows is always an array
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <LoadingBackdrop isLoading={isLoading} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6">Denied Apps</Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={rows.flatMap(row => row.developerApps.map(app => app.appName))} // Ensure rows is an array
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
                <StyledTableCell>Docker</StyledTableCell>
                <StyledTableCell>Approval Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row =>
                row.developerApps.map((app, index) => (
                  <StyledTableRow key={index}>
                    {index === 0 && (
                      <TableCell rowSpan={row.developerApps.length}>
                        <Link href="#" underline="none">
                          {row.userName}
                        </Link>
                      </TableCell>
                    )}
                    <TableCell>{app.appName}</TableCell>
                    <TableCell>{app.updatedVersion}</TableCell>
                    <TableCell>
                      <Link href={app.gitHubLink} target="_blank" rel="noopener">
                        {app.gitHubLink}
                      </Link>
                    </TableCell>
                    <TableCell>{app.dockerHubLink}</TableCell>
                    <TableCell sx={{ color: 'red' }}>Denied</TableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DeniedApps;
