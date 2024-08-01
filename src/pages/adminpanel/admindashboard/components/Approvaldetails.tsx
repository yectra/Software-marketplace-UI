import { useEffect, useState } from "react";
import {
  DeveloperApp,
  ApprovalData,
  AppDetails,
  ReviewData,
} from "@/pages/adminpanel/admindashboard/models";
import ReviewForm from "@/pages/adminpanel/admindashboard/components/ReviewForm";
import CustomSnackbar from "@/common/components/feedback/CustomSnackbar";
import { StyledTableCell, StyledTableRow } from "@/common/UI/StyledElements";
import useLoading from "@/common/hooks/useLoading";
import LoadingBackdrop from "@/common/UI/LoadingBackdrop";
import { AdminService } from "@/pages/adminpanel/admindashboard/services";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Box,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

interface Iprops {
  title: string;
}

const ApprovalDetails: React.FC<Iprops> = ({ title }) => {
  const [rows, setRows] = useState<AppDetails[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<DeveloperApp | null>(null);
  const { isLoading, setLoading } = useLoading();
  const [isApproval, setIsApproval] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<string>("");

  const adminService = new AdminService();

  const handleAction = (
    email: string,
    app: DeveloperApp,
    approval: boolean
  ) => {
    setDialogOpen(true);
    setSelectedEmail(email);
    setSelectedApp(app);
    setIsApproval(approval);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedEmail("");
    setSelectedApp(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fetchData = () => {
    setLoading(true);
    adminService
      .getPendingRequests()
      .then((response) => {
        if (Array.isArray(response) && response.length > 0) {
          setRows(response);
        } else {
          console.log("Empty or invalid data received:", response);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSubmit = async (reviewData: ReviewData) => {
    setLoading(true);
    const latestVersion = selectedApp?.updatedVersion;
    if (latestVersion) {
      const approveform: ApprovalData = {
        isApproval: isApproval,
        email: selectedEmail,
        appName: selectedApp.appName,
        appVersion: latestVersion,
        readability: reviewData.readability,
        maintainability: reviewData.maintainability,
        vulnerability: reviewData.vulnerability,
        security: reviewData.security,
        memoryUsage: reviewData.memoryUsage,
        optimization: reviewData.optimization,
        codeDescription: reviewData.codeDescription,
        adminComments: reviewData.adminComments,
        ratings: reviewData.ratings,
      };

      adminService
        .approveDeveloperRequests(approveform)
        .then((response) => {
          setSnackbarSeverity("success");
          setSnackbarMessage("Review sent successfully." + response);
        })
        .catch((err) => {
          console.error("Error approving data:", err);
          setSnackbarSeverity("error");
          setSnackbarMessage("Error completing action.");
        })
        .finally(() => {
          fetchData();
          setLoading(false);
          handleDialogClose();
          setSnackbarOpen(true);
        });
    } else {
      console.error("No versions available to approve.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <LoadingBackdrop isLoading={isLoading} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          <Autocomplete
            freeSolo
            id="app-search"
            disableClearable
            options={rows.flatMap((row) =>
              row.developerApps.map((app) => app.appName)
            )}
            sx={{ width: 300, height: 40, p: 2 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Find Your App"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Box>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>AppName</StyledTableCell>
                <StyledTableCell>Version</StyledTableCell>
                <StyledTableCell>Github URL</StyledTableCell>
                <StyledTableCell>Docker</StyledTableCell>
                <StyledTableCell>Approval Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) =>
                row.developerApps.map((app, appIndex) => (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`${row.email}-${appIndex}`}
                  >
                    {appIndex === 0 && (
                      <>
                        <TableCell rowSpan={row.developerApps.length}>
                          <Link href="#" underline="none">
                            {row.userName}
                          </Link>
                        </TableCell>
                      </>
                    )}
                    <TableCell>{app.appName}</TableCell>
                    <TableCell>{app.updatedVersion}</TableCell>
                    <TableCell>
                      {app.gitHubLink ? (
                        <Link
                          href={app.gitHubLink}
                          target="_blank"
                          rel="noopener"
                        >
                          {app.gitHubLink}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>{app.dockerHubLink ?? "N/A"}</TableCell>
                    <TableCell>
                      <>
                        <Button
                          variant="text"
                          sx={{ color: "green" }}
                          onClick={() => handleAction(row.email, app, true)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="text"
                          sx={{ color: "red" }}
                          onClick={() => handleAction(row.email, app, false)}
                        >
                          Deny
                        </Button>
                      </>
                    </TableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullScreen>
        <DialogTitle>Enter Feedback</DialogTitle>
        <DialogContent>
          <ReviewForm
            onClose={handleDialogClose}
            onSubmit={handleSubmit}
            loading={isLoading}
          />
        </DialogContent>
      </Dialog>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default ApprovalDetails;
