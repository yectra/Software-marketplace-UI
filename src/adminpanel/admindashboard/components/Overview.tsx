import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { StatsData } from "../models/ApprovalData";



const Overview = () => {
  const [overallCount, setOverallCount] = useState<StatsData[]>([]);

  const fetchRequest = async () => {
    try {
      const response = await axios.post("http://localhost:2000/admin/requests");
      const data = response.data;
      const counts = [
        { label: "Approved Requests", value: data.Accepted },
        { label: "Pending Requests", value: data.Pending },
        { label: "Denied Requests", value: data.Denied },
      ];

      setOverallCount(counts);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOverallCount([]); 
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

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

  return (
    <Box sx={{ bgcolor: "white", p: 3 }}>
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
