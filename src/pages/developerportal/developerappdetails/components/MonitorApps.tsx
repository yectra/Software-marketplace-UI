import { Box, Typography } from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Monitorapps:React.FC = () => {
  const responseTimeData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Average Response Time (ms)",
        data: [120, 132, 130, 140, 137, 140],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const requestData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Number of Requests",
        data: [1010, 1320, 1750, 2000, 1900, 2100],
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return (
    <Box p={2}>
      <Box sx={{ mt: 2, mb: 2 }}></Box>

      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 4 }}>
        <Box
          sx={{
            height: 450,
            width: 450,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Server Response Time
          </Typography>
          <Line data={responseTimeData} />
        </Box>

        <Box
          sx={{
            height: 450,
            width: 450,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Server Requests
          </Typography>
          <Line data={requestData} />
        </Box>
      </Box>
    </Box>
  );
};

export default Monitorapps;
