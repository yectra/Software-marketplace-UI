import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  CloseButton,
  IframeContainer,
  StyledModal,
} from "@/common/UI/StyledElements";

import { GetApplications } from "@/pages/userportal/appoverview/services";
import { AppDetails } from "@/pages/userportal/appoverview/models";

import { Box, Button, Rating, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AppProps {
  appName: string;
  appId: string;
}

const AppCard: React.FC<AppProps> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [appDetails, setAppDetails] = useState<AppDetails>();
  const location = useLocation();
  const { appName, app_id,version_id} = location.state;

  const getApplications = new GetApplications();

  useEffect(() => {
    getApplications
      .getApplicationdetails(app_id,version_id)
      .then((response) => {
        console.log(response)
        setAppDetails(response);
      })
      .catch((error) => console.log(error));
  }, [app_id]);

  const handleUseButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
        <Box
          sx={{
            width: 90,
            height: 90,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20%",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          <img
            src={appDetails?.appLogo}
            alt="app logo"
            style={{
              width: "90px",
              height: "90px",
              objectFit: "contain",
            }}
          />
        </Box>
        <Box>
          <Typography variant="h6">{appName.toUpperCase()}</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Rating
              name="read-only"
              value={appDetails?.overallRating || 3}
              readOnly
              sx={{ color: "#0C9DBD" }}
            />
            <Typography>(1000) | </Typography>
            <Typography>free trial</Typography>
          </Box>
          <Typography>{appDetails?.shortDescription}</Typography>
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#0C9DBD",
            ml: 14,
            width: 100,
            "&:hover": {
              bgcolor: "#0C9DBD",
            },
          }}
          onClick={handleUseButtonClick}
        >
          Use
        </Button>
      </Box>

      <StyledModal open={openModal} onClose={handleCloseModal}>
        <IframeContainer>
          <iframe
            src={appDetails?.staticWebAppURL}
            style={{
              width: "100%",
              height: "calc(100% - 32px)",
              border: "none",
            }}
          ></iframe>
          <CloseButton onClick={handleCloseModal}>
            <CloseIcon/>
          </CloseButton>
        </IframeContainer>
      </StyledModal>
    </Box>
  );
};

export default AppCard;
