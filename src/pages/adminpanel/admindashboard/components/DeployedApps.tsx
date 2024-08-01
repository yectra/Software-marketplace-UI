import React, { useEffect, useState } from 'react';
import { Typography, Link, Container, Card, CardContent, CardActions, Grid, Chip } from '@mui/material';
import { DeployedAppDetails } from '../models';
import { AdminService } from '../services';
import { useNavigate } from 'react-router-dom';


const DeployedApps: React.FC = () => {

  const[deployedApps,setDeployedApps]=useState<DeployedAppDetails[]>([]);

  const navigate=useNavigate();

  const adminService=new AdminService();

 
  useEffect(()=>{
    adminService.getDeployedApps()
    .then((response)=>{
      console.log(response)
      setDeployedApps(response)
    })
    .catch((err)=>{
      console.error(err);
    })
  },[])

  const handleAppClick = (appName: string, email: string) => {
  navigate(`/admin/deployment-center/${appName}?email=${email}`);
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Deployment Center</Typography>
      <Grid container spacing={3}>
        {deployedApps.map((app, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                <Link
                    href="#"
                    onClick={() => handleAppClick(app.appName, app.email)}
                    underline="none"
                    sx={{ color: '#0C9DBD' }}
                  >
                    {app.appName}
                  </Link>
                </Typography>
                <Typography variant="body2" color="black" sx={{ mt: 1, fontSize: '0.875rem' }}>
                  <strong>Type:</strong> <Typography component="span" sx={{ color: 'grey.600', fontSize: '0.775rem' }}>WebApp</Typography>
                </Typography>
                <Typography variant="body2" color="black" sx={{ fontSize: '0.875rem' }}>
                  <strong>Resource Group:</strong> <Typography component="span" sx={{ color: 'grey.600', fontSize: '0.775rem' }}>{app.resourceGroup}</Typography>
                </Typography>
                <Typography variant="body2" color="black" sx={{ fontSize: '0.875rem' }}>
                  <strong>Location:</strong> <Typography component="span" sx={{ color: 'grey.600', fontSize: '0.775rem' }}>{app.location}</Typography>
                </Typography>
                <Typography variant="body2" color="black" sx={{ fontSize: '0.875rem' }}>
                  <strong>Developer Email:</strong> <Typography component="span" sx={{ color: 'grey.600', fontSize: '0.775rem' }}>{app.email}</Typography>
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Link href={app.staticWebAppURL} underline="none" sx={{ fontSize: '0.875rem' }}>
                  {app.staticWebAppURL}
                </Link>
                  <Chip label="Free" color="primary" size="small" />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DeployedApps;
