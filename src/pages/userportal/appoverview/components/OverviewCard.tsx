import ImageCard from "@/pages/userportal/appoverview/components/ImageCard";
import Appdetails from "@/pages/userportal/dashboard/components/Appdetails";


import { GetApplications } from "@/pages/userportal/appoverview/services";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppOverview } from "@/pages/userportal/appoverview/models";
import useLoading from "@/common/hooks/useLoading";
import LoadingBackdrop from "@/common/UI/LoadingBackdrop";

import { Box, Grid, Typography } from "@mui/material";

const OverviewCard = () => {
  const [appOverview, setAppOverview] = useState<AppOverview | null>(null);
  const location = useLocation();
  const { appName, app_id, version_id } = location.state;
  const { isLoading, setLoading } = useLoading();

  const getApplications = new GetApplications();

  useEffect(() => {
    if (app_id) {
      setLoading(true);
      console.log(app_id)
      getApplications
        .getApplicationOverview(app_id,version_id)
        .then((response) => {
          setAppOverview(response);
          console.log(response);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [app_id]);

  const apps = [
    {
      title: "WeatherMaster",
      shortDescription: "A comprehensive weather application providing real-time weather updates and forecasts.",
      longDescription:
        "Tax Calculator provides a quick and accurate way to estimate taxes, considering various factors like income, deductions, and tax credits, simplifying financial planning and budgeting.",
      logo:'https://img.freepik.com/premium-vector/weather-cloud-sun-rain-lightning-logo-design-symbol-icon-template_23729-1786.jpg',
      linktorun: "https://nice-bay-075966900.5.azurestaticapps.net/",
      imgdes:
        "https://static-cse.canva.com/blob/1272305/tools_feature_jpeg-to-jpg_hero_mobile2x.jpg",
    },
    {
      title: "TaskTracker",
      shortDescription: "An intuitive task management tool to help you organize and prioritize your daily tasks.",
      longDescription:
        "A credit card generator is an essential tool designed to provide developers, testers, and quality assurance professionals with valid credit card numbers for system evaluation without the risk of exposing real financial details.",
      logo: 'https://cdn.dribbble.com/users/111709/screenshots/2032133/media/94bcf225589742d4ffed61a8295517ef.jpg?resize=400x300&vertical=center',
      linktorun: "https://testcreditgenerator.azurewebsites.net/docs",
      imgdes: '',
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Box sx={{ gap: 1 }}>
          <LoadingBackdrop isLoading={isLoading} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {appName} - {appOverview?.shortDescription}
          </Typography>
          <ImageCard imageUrl={appOverview?.appDescriptionImage || ""} />
          <Typography variant="body1">{appOverview?.appDescription}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>
          View More
        </Typography>
        <Grid container spacing={4} >
          {apps.map((app) => (
            <Grid item xs={12} key={app.title}>
              <Appdetails
                appName={app.title}
                shortDescription={app.shortDescription}
                appLogo={app.logo}
                overallRating="4.5"
                app_id='null'
                version_id="null"
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, gap: 1 }}>
            More Info
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Version</Typography>
            <Typography variant="body2">
              {appOverview?.appVersion}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Category</Typography>
            <Typography variant="body2">{appOverview?.category}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Last updated</Typography>
            <Typography variant="body2">
              {appOverview?.updatedOn}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OverviewCard;
