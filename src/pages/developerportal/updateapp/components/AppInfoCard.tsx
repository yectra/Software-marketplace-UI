import { getInitials } from "@/common/UI/UiHelpers";
import { UploadAppDetails } from "../models";

import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";


const AppInfoCard: React.FC<{
    appDetails: UploadAppDetails;
    appLogo: File | null;
    appDescriptionImage: File | null;
  }> = ({ appDetails, appLogo, appDescriptionImage }) => {
    return (
      <Card
        sx={{
          height: "100%",
          minWidth: 300,
          maxWidth: 400,
          position: "relative",
          overflow: "visible",
          ml: 4,
          mt: 16,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            height: 150,
            position: "relative",
            overflow: "hidden",
            borderRadius: "16px 16px 0 0",
          }}
        >
          {appDescriptionImage ? (
            <Box
              component="img"
              src={URL.createObjectURL(appDescriptionImage)}
              alt="App Description"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "grey.300",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No image uploaded
              </Typography>
            </Box>
          )}
        </Box>
  
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: 100,
            left: 24,
          }}
        >
          <Avatar
            src={appLogo ? URL.createObjectURL(appLogo) : undefined}
            alt={appDetails.appName}
            sx={{
              width: 110,
              height: 110,
              border: "4px solid white",
              boxShadow: 2,
            }}
          >
            {!appLogo && getInitials({ appName: appDetails.appName })}
          </Avatar>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ ml: 2, mt: 4, fontWeight: "bold" }}
          >
            {appDetails.appName}
          </Typography>
        </Box>
  
        <CardContent sx={{ mt: 8, pt: 2, pb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Description
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxHeight: 100,
              overflow: "auto",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
            }}
          >
            {appDetails.shortDescription}
          </Typography>
        </CardContent>
  
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Category
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {appDetails.category || "Not specified"}
          </Typography>
        </CardContent>
  
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Keywords
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {appDetails.keywords || "None"}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  export default AppInfoCard