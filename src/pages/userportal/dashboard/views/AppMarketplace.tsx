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
      console.log(response)
        if (Array.isArray(response)) {
          setAvailableApps(response);
        } else {
          console.error("Response is not an array", response);
        }
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
        {availableApps.map((app) => (
          <Grid item xs={4} sm={4} md={4} key={app.app_id}>
            <Item>
              <Appdetails
                appName={app.appName}
                shortDescription={app.shortDescription}
                appLogo={app.appLogo}
                app_id={app.app_id}
                overallRating={app.overallRating}
                version_id={app.version_id}
              />
            </Item>
          </Grid>
        ))}
      </Grid>
 
    </Box>
  );
};

export default AppMarketplace;
