import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UpdateAppdetails } from "@/pages/developerportal/updateapp/models";
import { getUserDetailsFromMsal } from "@/common/services/AuthHelper";
import { AppManagementService } from "@/pages/developerportal/updateapp/services";
import CustomSnackbar from "@/common/components/feedback/CustomSnackbar";
import useLoading from "@/common/hooks/useLoading";
import LoadingBackdrop from "@/common/UI/LoadingBackdrop";
import BaseButton from "@/common/components/controls/BaseButton";

import { Box, Button, TextField, Typography } from "@mui/material";

import { useMsal } from "@azure/msal-react";

const Updatedetails: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const { appName } = useParams<{ appName: string }>();
  const [version, setVersion] = useState<number[]>([1, 0, 0]);
  const [selectedVersionType, setSelectedVersionType] = useState<string | null>(
    null
  );
  const [github, setGithub] = useState<string>("");
  const [dockerurl, setDockerurl] = useState<string>("");
  const [versionDescription, setVersionDescription] = useState<string>("");
  const navigate = useNavigate();
  const { accounts } = useMsal();
  const { isLoading, setLoading } = useLoading();
  const appManagementService = new AppManagementService();

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<string>("success");

  useEffect(() => {
    const userDetails = getUserDetailsFromMsal(accounts);
    setUserEmail(userDetails.email);
  }, [accounts]);

  useEffect(() => {
    if (appName) {
      const appDetails = {
        appName: appName ? appName : "",
        email: userEmail,
      };
      setLoading(true);
      appManagementService
        .getLatestVersion(appDetails)
        .then((response) => {
          const initialVersionArray = response.split(".").map(Number);
          if (initialVersionArray.length === 3) {
            const [major, minor, patch] = initialVersionArray;
            setVersion([major, minor, patch]);
          } else {
            console.error("Invalid initial version format received.");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching initial version:", error);
          setLoading(false);
        });
    }
  }, [appName, userEmail, accounts]);

  const handleApprovalClick = async () => {
    const approvalData: UpdateAppdetails = {
      email: userEmail,
      gitHubLink: github,
      dockerHubLink: dockerurl,
      appName: appName || "",
      appVersion: version.join("."),
      versionDescription,
    };
    setLoading(true);
    appManagementService
      .updateAppdetails(approvalData)
      .then((response) => {
        handleSnackbarOpen("success", "Approval request sent successfully.");
        console.log(response.data);
        navigate("/developer/myapps");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error sending approval request:", error);
        handleSnackbarOpen(
          "error",
          error.response?.data || "An error occurred"
        );
        setLoading(false);
      });
  };

  const handleVersionUpdate = (type: string) => {
    let newVersion = [...version];

    if (selectedVersionType) {
      switch (selectedVersionType) {
        case "Major":
          newVersion[0] -= 1;
          break;
        case "Minor":
          newVersion[1] -= 1;
          break;
        case "Patch":
          newVersion[2] -= 1;
          break;
        default:
          break;
      }
    }

    switch (type) {
      case "Major":
        newVersion[0] += 1;
        newVersion[1] = 0;
        newVersion[2] = 0;
        break;
      case "Minor":
        newVersion[1] += 1;
        newVersion[2] = 0;
        break;
      case "Patch":
        newVersion[2] += 1;
        break;
      default:
        break;
    }

    setVersion(newVersion);
    setSelectedVersionType(type);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (
    severity: "success" | "error",
    message: string
  ) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{}}>
      <LoadingBackdrop isLoading={isLoading} />
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, textTransform: "uppercase" }}
        gutterBottom
      >
        Update App: {appName}
      </Typography>
      <Typography gutterBottom>What's New</Typography>
      <TextField
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Add the feature updates"
        value={versionDescription}
        onChange={(e) => setVersionDescription(e.target.value)}
        sx={{ width: "100%" }}
      />

      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Update Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: 300,
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => handleVersionUpdate("Major")}
        >
          Major
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "green",
            "&:hover": { backgroundColor: "green" },
          }}
          onClick={() => handleVersionUpdate("Minor")}
        >
          Minor
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "orange",
            "&:hover": { backgroundColor: "orange" },
          }}
          onClick={() => handleVersionUpdate("Patch")}
        >
          Patch
        </Button>
      </Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        {" "}
        Version {version.join(".")}
      </Typography>
      <TextField
        label={`GitHub Link of ${appName}`}
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Enter GitHub link"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />

      <TextField
        label="Link to your Docker Image on hub"
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Your Docker image link"
        value={dockerurl}
        onChange={(e) => setDockerurl(e.target.value)}
      />

      <BaseButton
        variant="contained"
        onClick={handleApprovalClick}
        name="Request for Approval"
      ></BaseButton>

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default Updatedetails;
