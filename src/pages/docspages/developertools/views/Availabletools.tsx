import { Box, Grid, Typography } from "@mui/material";

import Tools from "@/pages/docspages/developertools/components/Tools";

const Availabletools = () => {
  const tools = [
    {
      title: "App build",
      description:
        "Creates an optimized version of your application ready for deployment."
    },
    {
      title: "App release",
      description: "Publishes your built application to a production environment."
    },
    {
      title: "App Dev",
      description:
        "Starts a development server for testing and debugging your application."
    },
    {
      title: "App Config",
      description:
        "Allows you to manage and edit configuration settings for your application."
    },
    {
      title: "App Env Show",
      description:
        "Displays the current environment variables used by your application."
    },
    {
      title: "App function build",
      description:
        "Packages serverless functions for deployment to a cloud platform."
    },
    {
      title: "App Function run",
      description:
        "Executes a specific serverless function locally for testing purposes."
    },
    {
      title: "Generate extensions",
      description:
        "Creates custom extensions to enhance the functionality of the Software Marketplace."
    }
  ];

  return (
    <Box >
      <Typography sx={{ p: 2, fontWeight: 700 }} variant="h6">
        Software Marketplace developer tools
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 2, md:2 }} columns={{ xs: 6, sm: 12, md: 12 }}>
        {tools.map((app, index) => (
          <Grid item xs={6} sm={6} md={4} key={index}>
            <Tools title={app.title} description={app.description} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Availabletools;
