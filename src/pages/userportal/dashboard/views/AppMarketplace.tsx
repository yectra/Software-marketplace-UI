import { useEffect, useState } from "react";

import Title from "@/pages/userportal/dashboard/components/Title";
import { MarketplaceApplications } from "@/pages/userportal/dashboard/services";
import { getApps } from "@/pages/userportal/dashboard/models";
import { Item } from "@/common/UI/StyledElements";
import Appdetails from "../components/Appdetails";
import useLoading from "@/common/hooks/useLoading";

import { Box, Grid } from "@mui/material";
import LoadingBackdrop from "@/common/UI/LoadingBackdrop";

const AppMarketplace = () => {
  const [availableApps, setAvailableApps] = useState<getApps[]>([]);
  const { isLoading, setLoading } = useLoading();

  const marketPlaceApplications = new MarketplaceApplications();

  useEffect(() => {
    setLoading(true);
    marketPlaceApplications
      .getAllApplications()
      .then((response) => {
        setAvailableApps(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <LoadingBackdrop isLoading={isLoading} />
      <Title />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {availableApps.map?.((app) => (
          <Grid item xs={4} sm={4} md={4} key={app.appId}>
            <Item>
              <Appdetails
                appName={app.appName}
                shortDescription={app.shortDescription}
                icon={app.icon}
                appId={app.appId}
                overallRating={app.overallRating}
              />
            </Item>
          </Grid>
        ))}
      </Grid>
      {/* <Apps/> */}
    </Box>
  );
};

export default AppMarketplace;
