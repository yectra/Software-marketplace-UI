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

} from '@mui/material';
import axios from 'axios';

interface Data {
  username: string;
  appname: string;
  github: string;
  email:string
  apps: any;
  docker: string;
  Approval: boolean;
}


const ApprovedApps = () => {
  const [rows, setRows] = useState<Data[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:2000/admin/admindisplay", { status: "accepted" });
      console.log(response.data)
      if (Array.isArray(response.data) && response.data.length > 0) {
        setRows(response.data);
      } else {
      
        console.log("Empty or invalid data received:", response.data);
      
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <Box sx={{mt:10,ml:20}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6">Approved Apps</Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={rows.map(option => option.appname)}
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
                <TableCell>Username</TableCell>
                <TableCell>AppName</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Github URL</TableCell>
                <TableCell>Docker</TableCell>
                <TableCell>Approval Status</TableCell>
              </TableRow>
            </TableHead>
          
<TableBody>
  {rows.map(row => 
    row.apps.map((app:any,index:number)=>(
    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
      {index === 0 && (
                      <>
                        <TableCell rowSpan={row.apps.length}>
                          <Link href="#" underline="none">
                            {row.username}
                          </Link>
                        </TableCell>
                      </>
                    )}
      <TableCell sx={{ color: row.Approval ? "green" : "inherit" }}>
        {app.appname}
      </TableCell>
      <TableCell>
        { app.versions[0].v}
      </TableCell>
      <TableCell>
        <Link href={app.versions[0].githublink} target="_blank" rel="noopener">
          {app.versions[0].githublink}
        </Link>
      </TableCell>
      <TableCell>
      {app.versions[0].dockerhublink}
      </TableCell>
      <TableCell sx={{color:"green"}}>
       Approved
      </TableCell>
    </TableRow>
 ) ))}
</TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
    </Box>
  );
};

export default ApprovedApps;
