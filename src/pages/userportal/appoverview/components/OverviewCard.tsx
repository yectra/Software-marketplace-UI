import ImageCard from "@/pages/userportal/appoverview/components/ImageCard";
import Appdetails from "@/pages/userportal/dashboard/components/Appdetails";
import creditcard from '@/pages/userportal/dashboard/assets/Logoimg/ccard.png';
import jpg from '@/pages/userportal/dashboard/assets/Logoimg/Thumbnail.png';
import ccg from '@/pages/userportal/dashboard/assets/Descriptionimg/creditcard.jpg';

import { GetApplications } from "@/pages/userportal/appoverview/services";
import { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import { AppOverview } from "@/pages/userportal/appoverview/models";
import useLoading from "@/common/hooks/useLoading";
import LoadingBackdrop from "@/common/UI/LoadingBackdrop";


import { Box, Grid, Typography } from "@mui/material";

const OverviewCard = () => {
  const [appOverview, setAppOverview] = useState<AppOverview | null>(null);
  const location = useLocation();
  const { appName, appId } = location.state;
  const {isLoading,setLoading}=useLoading();

  const getApplications = new GetApplications();

  useEffect(() => {
    const fetchAppDetails = async () => {
      if (appId) {
        setLoading(true);
        try {
          
          const response = await getApplications.getApplicationOverview(appId);
          setAppOverview(response);
          console.log(response);
  
        } catch (error) {
          console.error("Failed to fetch app details:", error);
        }
        finally{
          setLoading(false);
        }
      }
    };
    fetchAppDetails();
  }, [appId]);

  const apps = [
    {
      title: "JPG Convertor",
      shortDescription: "It convert the image from any format to jpg.",
      longDescription: "Tax Calculator provides a quick and accurate way to estimate taxes, considering various factors like income, deductions, and tax credits, simplifying financial planning and budgeting.",
      logo: jpg,
      linktorun: "https://nice-bay-075966900.5.azurestaticapps.net/",
      imgdes: "https://static-cse.canva.com/blob/1272305/tools_feature_jpeg-to-jpg_hero_mobile2x.jpg"
    },
    {
      title: "Credit card Generator",
      shortDescription: "A credit card generator.",
      longDescription: "A credit card generator is an essential tool designed to provide developers, testers, and quality assurance professionals with valid credit card numbers for system evaluation without the risk of exposing real financial details.",
      logo: creditcard,
      linktorun: "https://testcreditgenerator.azurewebsites.net/docs",
      imgdes: ccg
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Box sx={{ gap: 1 }}>
        <LoadingBackdrop isLoading={isLoading}/>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{appName} - {appOverview?.shortDescription}</Typography>
          <ImageCard imageUrl={appOverview?.appImage || ""} />
          <Typography variant="body1">{appOverview?.appDescription}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>View More</Typography>
        <Grid container spacing={4}>
          {apps.map((app) => (
            <Grid item xs={12} key={app.title}>
              <Appdetails
                appName={app.title}
                shortDescription={app.shortDescription}
                icon={app.logo}
                overallRating="4.5"
                appId="null"
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, gap: 1 }}>More Info</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Version</Typography>
            <Typography variant="body2">{appOverview?.latestUpdateVersion}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Created At</Typography>
            <Typography variant="body2">{appOverview?.createdAt}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Last updated</Typography>
            <Typography variant="body2">{appOverview?.latestUpdatedOn}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default OverviewCard;
