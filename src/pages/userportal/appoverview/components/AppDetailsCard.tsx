import { useState } from "react";

import {
  CloseButton,
  IframeContainer,
  StyledModal,
} from "@/common/UI/StyledElements";

import {
  Box,
  IconButton,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import TabletIcon from "@mui/icons-material/Tablet";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";

interface Iprops {
  title: string;
  description: string;
  linktorun: string;
}

const Appcard: React.FC<Iprops> = ({ title, description, linktorun }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleRunButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Box>
      <Card variant="outlined" sx={{ width: 378, m: 2, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", m: 2 }}>
            <Box
              sx={{
                width: 35,
                height: 30,
                bgcolor: "black",
                color: "#09FFC4",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20%",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "inherit", fontSize: "inherit" }}
              >
                {getInitials(title)}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ ml: 1 }}>
              {title}
            </Typography>
          </Box>
          <Box sx={{ m: 2 }}>
            <IconButton size="medium">
              <InstallDesktopIcon />
            </IconButton>
            <IconButton>
              <TabletIcon />
            </IconButton>
            <IconButton>
              <InstallMobileIcon />
            </IconButton>
          </Box>
          <Box sx={{ m: 2 }}>
            <Typography variant="subtitle2">{description}</Typography>
          </Box>
          <Box sx={{ m: 2, display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ bgcolor: "#0C9DBD", width: 150, borderRadius: 20 }}
              variant="contained"
              onClick={handleRunButtonClick}
            >
              Run
            </Button>
          </Box>
        </CardContent>
      </Card>
      <StyledModal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby={title}
        aria-describedby={description}
      >
        <IframeContainer>
          <iframe
            src={linktorun}
            style={{
              width: "100%",
              height: "calc(100% - 32px)",
              border: "none",
            }}
            title="Embedded Content"
          ></iframe>
          <CloseButton onClick={handleCloseModal}>
            <CloseIcon />
          </CloseButton>
        </IframeContainer>
      </StyledModal>
    </Box>
  );
};
export default Appcard;
