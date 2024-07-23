import { useState, useEffect } from "react";

import { AdminService } from "@/pages/adminpanel/admindashboard/services";
import { RatingItem } from "@/pages/developerportal/appdescription/models";
import useLoading from "@/common/hooks/useLoading";
import LoadingBackdrop from "@/common/UI/LoadingBackdrop";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const Overview :React.FC= () => {
  const [overallCount, setOverallCount] = useState<RatingItem[]>([]);
  const {isLoading,setLoading}=useLoading();
  const adminService=new AdminService();

  const getBackgroundColor = (label: string) => {
    switch (label) {
      case "Approved Requests":
        return '#429A3A';
      case "Pending Requests":
        return '#F2C94C';
      case "Denied Requests":
        return '#CA383A';
      default:
        return '#fff';
    }
  };

  const fetchRequest = async () => {
    try {
      setLoading(true)
      const response = await adminService.getRequestsCount();
      console.log(response)
      const counts = [
        { label: "Approved Requests", value:response.Accepted },
        { label: "Pending Requests", value: response.Pending },
        { label: "Denied Requests", value: response.Denied },
      ];

      setOverallCount(counts);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOverallCount([]); 
    }
    finally{
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchRequest();
  }, []);

  return (

    <Box sx={{ bgcolor: "white", p: 3 }}>
    <LoadingBackdrop isLoading={isLoading}/>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        App Update & Feature Requests
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
    
         { overallCount.map((count) => (
            <Grid item xs={12} sm={4} key={count.label}>
              <Card sx={{ backgroundColor: getBackgroundColor(count.label), color: 'white' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1
                    }}
                  >
                    <Typography variant="h5" sx={{ color: 'black' }} align="center">{count.value}</Typography>
                  </Box>
                  <Typography align="center">{count.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
};

export default Overview;
