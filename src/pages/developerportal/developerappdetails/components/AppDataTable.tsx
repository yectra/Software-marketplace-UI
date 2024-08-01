import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ApprovalStatus,
  MyAppsData,
} from "@/pages/developerportal/developerappdetails/model";
import {
  getUserDetailsFromMsal,
  signInUser,
} from "@/common/services/AuthHelper";
import { AppInfo } from "@/pages/developerportal/developerappdetails/services";
import { StyledTableCell, StyledTableRow } from "@/common/UI/StyledElements";
import useLoading from "@/common/hooks/useLoading";
import BaseButton from "@/common/components/controls/BaseButton";
import LoadingBackdrop from "@/common/UI/LoadingBackdrop";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
} from "@mui/material";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";

const DataTable: React.FC = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [developerApps, setDeveloperApps] = useState<MyAppsData[]>([]);
  const { isLoading, setLoading } = useLoading();
  const { instance, inProgress, accounts } = useMsal();

  const isAuthenticated = useIsAuthenticated();

  const appInfo = new AppInfo();

  useEffect(() => {
    const userDetails = getUserDetailsFromMsal(accounts);
    setEmail(userDetails.email);
  }, [isAuthenticated, accounts]);

  const getAppsbasedonStatus =  ({ status }: { status: string }) => {
    const approvalStatus: ApprovalStatus = {
      email: email,
      status: status,
    };

    setLoading(true);
    appInfo
      .getAppsbasedonStatus(approvalStatus)
      .then((response) => {
        console.log(response);
        setDeveloperApps(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setDeveloperApps([]);
        setLoading(false);
      });
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue);
    if (newValue === 1) {
      getAppsbasedonStatus({ status: "accepted" });
    } else if (newValue === 2) {
      getAppsbasedonStatus({ status: "denied" });
    } else {
      getAppsbasedonStatus({ status: "all" });
    }
  };

  useEffect(() => {
    if (email) {
      getAppsbasedonStatus({ status: "all" });
    }
  }, [email]);

  const getAppsbySearch = (value: string) => {
    console.log(value);
    setLoading(true);
    if (value === "") {
      getAppsbasedonStatus({ status: "all" });
    }

    appInfo
      .getAppsBySearch(email, value)
      .then((response) => {
        console.log(response);
        setDeveloperApps(response);
        setLoading(false);
      })
      .catch((error) => {
        setDeveloperApps([]);
        console.error("Error searching:", error);
        setLoading(false)
      });
  };

  const handleSignIn = (): void => {
    signInUser(instance, inProgress, isAuthenticated);
  };

  const handleUploadClick = (appName: string): void => {
    navigate(`/developer/upload/${encodeURIComponent(appName)}`);
  };

  const handleMonitorClick = (appName: string): void => {
    navigate(`/developer/monitor/${encodeURIComponent(appName)}`);
  };

  const handleAppClick = (appName: string): void => {
    navigate(`/developer/appdetails/${encodeURIComponent(appName)}`);
  };

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          p: 2,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Typography variant="h6">Login to view your apps</Typography>
        <Button variant="text" sx={{ color: "#0C9DBD" }} onClick={handleSignIn}>
          Click here to login
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <LoadingBackdrop isLoading={isLoading} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ ml: 1 }}>
          My Apps
        </Typography>
        <TextField
          label="Find your app"
          variant="outlined"
          size="medium"
          onChange={(e) => getAppsbySearch(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        sx={{
          mb: 4,
          mt: 2,
          "& .MuiTabs-indicator": {
            backgroundColor: "#0C9DBD",
            height: "2px",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: "bold",
            minWidth: 100,
          },
          "& .Mui-selected": {
            color: "black",
          },
        }}
      >
        <Tab label="All" />
        <Tab label="Accepted" />
        <Tab label="Denied" />
      </Tabs>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>AppName</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Version</StyledTableCell>
              <StyledTableCell>Updated On</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {developerApps.map?.((apps) => (
              <StyledTableRow key={apps.appName}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleAppClick(apps.appName)}
                >
                  {apps.appName}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    color: (() => {
                      const latestStatus =
                        apps.versions[apps.versions.length - 1]?.status;
                      switch (latestStatus) {
                        case "accepted":
                          return "green";
                        case "inprogress":
                          return "#367CFF";
                        case "denied":
                          return "red";
                        default:
                          return "inherit";
                      }
                    })(),
                  }}
                >
                  {apps.versions.length > 0
                    ? apps.versions[apps.versions.length - 1].status
                    : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {apps.versions.length > 0
                    ? apps.versions[apps.versions.length - 1].appVersion
                    : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {apps.versions.length > 0
                    ? apps.versions[apps.versions.length - 1].updatedOn
                    : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {apps.versions[apps.versions.length - 1].approvedStatus ===
                  "accepted" ? (
                    <BaseButton
                      variant="text"
                      color="primary"
                      name="Monitor your site"
                      onClick={() => handleMonitorClick(apps.appName)}
                    ></BaseButton>
                  ) : apps.versions[apps.versions.length - 1].approvedStatus ===
                    "pending" ? (
                    <BaseButton
                      variant="text"
                      name=" Monitor your site"
                      color="primary"
                      onClick={() => handleMonitorClick(apps.appName)}
                      disabled
                    ></BaseButton>
                  ) : (
                    <BaseButton
                      variant="text"
                      color="primary"
                      onClick={() => handleUploadClick(apps.appName)}
                      name={
                        apps.versions[apps.versions.length - 1].appVersion ===
                        "0.0.0"
                          ? "Upload"
                          : "Update"
                      }
                    />
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {developerApps.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Apps to display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
