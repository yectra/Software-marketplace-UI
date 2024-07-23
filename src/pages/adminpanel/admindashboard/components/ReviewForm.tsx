import { useState } from "react";

import { Box, Grid, Rating, TextField, Typography, Button, CircularProgress, Backdrop } from "@mui/material";

import BaseButton from "@/common/components/controls/BaseButton";


interface IProps
{
  onClose: () => void;
  onSubmit: (data:any) => void;
  loading: boolean;
};


const ReviewForm:React.FC<IProps>  = ({ onClose, onSubmit, loading }) => {
  const initialRatingData = [
    { label: "Readability", value: 0 },
    { label: "Maintainability", value: 0 },
    { label: "Commenting", value: 0 },
    { label: "Execution Time", value: 0 },
    { label: "Memory Usage", value: 0 },
    { label: "Optimization", value: 0 },
  ];

  const [ratings, setRatings] = useState(initialRatingData);
  const [readability, setReadability] = useState<String>('');
  const [maintainability, setMaintainability] = useState<String>('');
  const [vulnerability, setVulnerability] = useState<String>('');
  const [security, setSecurity] = useState<String>('');
  const [memoryUsage, setMemoryUsage] = useState<String>('');
  const [optimization, setOptimization] = useState<String>('');
  const [codeDescription, setCodeDescription] = useState<String>('');
  const [adminComments, setAdminComments] = useState<String>('');

  const handleRatingChange = (index:number, newValue:any) => {
    const updatedRatings = ratings.map((rating, i) =>
      i === index ? { ...rating, value: newValue } : rating
    );
    setRatings(updatedRatings);
  };

  const handleSubmit = async () => {
    const reviewData = {
      readability,
      maintainability,
      vulnerability,
      security,
      memoryUsage,
      optimization,
      codeDescription,
      adminComments,
      rating:ratings
    };

    onSubmit(reviewData);
  };

  return (
    <Box sx={{mt:2 }}>
       <Backdrop
        open={loading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress />
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField variant="outlined" label="Readability" fullWidth value={readability} onChange={(e) => setReadability(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" label="Maintainability" fullWidth value={maintainability} onChange={(e) => setMaintainability(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" label="Performance" fullWidth value={vulnerability} onChange={(e) => setVulnerability(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" label="Security" fullWidth value={security} onChange={(e) => setSecurity(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" label="Vulnerability" fullWidth value={memoryUsage} onChange={(e) => setMemoryUsage(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" label="Optimization" fullWidth value={optimization} onChange={(e) => setOptimization(e.target.value)} />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography>Code Description</Typography>
        <TextField variant="outlined" fullWidth value={codeDescription} onChange={(e) => setCodeDescription(e.target.value)} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography>Admin comments</Typography>
        <TextField variant="outlined" fullWidth value={adminComments} onChange={(e) => setAdminComments(e.target.value)} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Select Top 5 Parameters
        </Typography>
        <Grid container spacing={2}>
          {ratings.map((item, index) => (
            <Grid container item xs={12} key={index} alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body1">{item.label}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Rating
                  name={item.label}
                  value={item.value}
                  precision={0.5}
                  onChange={(_, newValue) => handleRatingChange(index, newValue)}
                  sx={{ color: "#2AA9C4" }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mt: 2}}>
      <Button variant="outlined" sx={{ bgcolor: "white", color: "#0C9DBD", borderColor: "#0C9DBD", "&:hover": { color: "#0C9DBD", bgcolor: "white", borderColor: "#0C9DBD" } }} onClick={onClose}>
              Cancel
            </Button>
            <BaseButton onClick={handleSubmit}
            variant="contained"
            marginLeft={10}
            name="submit"
            ></BaseButton>
         
      </Box>
    </Box>
  );
};

export default ReviewForm;
