import { useState, useEffect } from "react";

import { RatingItem, VersionFeedbackReportProps } from "@/pages/developerportal/appdescription/models";

import { Box, Grid, Rating, Typography } from "@mui/material";

const VersionFeedbackReport :React.FC<VersionFeedbackReportProps>= ({ versionData }) => {
  const [ratings, setRatings] = useState<RatingItem[]>([]);
  const [readability, setReadability] = useState<string>("");
  const [maintainability, setMaintainability] = useState<string>("");
  const [optimization, setOptimization] = useState<string>("");
  const [codeDescription, setCodeDescription] = useState<string>("");
  const [adminComments, setAdminComments] = useState<string>("");

  useEffect(() => {
    console.log(versionData);
    if (versionData) {
      setRatings(versionData.Params || []);
      setReadability(versionData.readability || "");
      setMaintainability(versionData.maintainability || "");
      setOptimization(versionData.optimization || "");
      setCodeDescription(versionData.codeDescription || "");
      setAdminComments(versionData.adminComments || "");
    }
  }, [versionData]);
  

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {ratings.map((item, index) => (
          <Grid container item xs={12} key={index} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1">{item.label}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Rating
                name={item.label}
                value={parseFloat(item.value)}
                precision={0.5}
                readOnly
                sx={{ color: "#2AA9C4" }}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Readability</Typography>
        <Typography variant="body2">{readability}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Maintainability</Typography>
        <Typography variant="body2">{maintainability}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Optimization</Typography>
        <Typography variant="body2">{optimization}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Code Description</Typography>
        <Typography variant="body2">{codeDescription}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Admin Comments</Typography>
        <Typography variant="body2">{adminComments}</Typography>
      </Box>
    </Box>
  );
};

export default VersionFeedbackReport;
