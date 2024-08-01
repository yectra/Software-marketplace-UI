import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Apps,
  CloudUpload,
  Search,
  Verified,
  Group,
  Code,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { signInUser } from "@/common/services/AuthHelper";

const panels = [
  {
    id: "panel1",
    title: "1. Explore Applications",
    content:
      "Dive into our extensive library of apps, covering various categories and functionalities. Whether you need tools for work, creativity, or entertainment, our marketplace has something for everyone.",
  },
  {
    id: "panel2",
    title: "2. Use Apps Instantly",
    content:
      "Instantly With our platform, you can use apps directly without the need to download or install them on your device. Enjoy seamless access to applications from anywhere, at any time.",
  },
  {
    id: "panel3",
    title: "3. Publish Your App",
    content:
      "Are you a developer? Share your innovations with the world by publishing your app on our marketplace. Simply provide the GitHub URL of your project, and our team will take care of the rest.",
  },
  {
    id: "panel4",
    title: "4. Verification and Deployment",
    content:
      "Once submitted, our admins will verify and approve your code. After successful verification, we deploy your app to our marketplace, making it available for users to explore and use instantly.",
  },
];

const perks = [
  {
    icon: <CloudUpload />,
    title: "Instant Access",
    description:
      "Use applications directly from your browser without downloads or installations. Start using powerful software instantly.",
    color: "#2196F3",
  },
  {
    icon: <Code />,
    title: "Publish Your App",
    description:
      "Developers can easily share their creations. Submit your app's GitHub URL, and we'll handle the deployment process.",
    color: "#FF9800",
  },
  {
    icon: <Verified />,
    title: "Verification Process",
    description:
      "Our team verifies all submitted apps for quality and security, ensuring a safe and reliable marketplace for all users.",
    color: "#9C27B0",
  },
  {
    icon: <Search />,
    title: "Easy Discovery",
    description:
      "Find the perfect app quickly with our intuitive search and category filters. Explore new tools to enhance your workflow.",
    color: "#F44336",
  },
  {
    icon: <Group />,
    title: "Developer Community",
    description:
      "Join a thriving ecosystem of developers. Collaborate, get feedback, and contribute to an innovative software community.",
    color: "#009688",
  },
  {
    icon: <Apps />,
    title: "Vast App Library",
    description:
      "Access a diverse range of applications across various categories. Find tools for productivity, creativity, and more, all in one place.",
    color: "#4CAF50",
  },
];

const DeveloperDescription: React.FC = () => {
  const [expandedPanels, setExpandedPanels] = useState<string[]>([]);
  const isAuthenticated = useIsAuthenticated();
  const { instance, inProgress } = useMsal();

  const navigate = useNavigate();

  const handleLoginandNavigation = async () => {
    if (!isAuthenticated) {
      await signInUser(instance, inProgress, isAuthenticated);
    }
    navigate("create-app");
  };

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedPanels((prev) =>
        newExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
      );
    };

  return (
    <Box>
      <Box sx={{ bgcolor: "#E8EBE8", p: 10 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "black",
              gap: 2,
            }}
          >
            <Typography variant="h3" sx={{fontWeight:700}}>
              Build Publish and Use Apps Effortlessly
            </Typography>
            <Typography variant="subtitle1">
              Start exploring today and find the perfect tools to boost your
              productivity, creativity, and more.
            </Typography>
            <Button
              sx={{
                bgcolor: "#0C9DBD",
                "&:hover": { bgcolor: "#0C9DBD" },
                width: "220px",
                height: "60px",
                mt: 5,
              }}
              onClick={handleLoginandNavigation}
              variant="contained"
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            {panels.map((panel) => (
              <Accordion
                key={panel.id}
                expanded={expandedPanels.includes(panel.id)}
                onChange={handleChange(panel.id)}
                sx={{ bgcolor: "white", color: "black" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "grey" }} />}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {panel.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{panel.content}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "white",
          py: 8,
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", mb: 6 }}
          variant="h3"
          align="center"
          gutterBottom
        >
          A software marketplace with perks
        </Typography>
        <Grid container spacing={9} sx={{ px: 2 }}>
          {perks.map((perk, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    bgcolor: "#e6eff2",
                  },
                }}
              >
                <Box sx={{ color: perk.color, fontSize: 64, mb: 2 }}>
                  {perk.icon}
                </Box>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="h5"
                  component="h3"
                  gutterBottom
                >
                  {perk.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {perk.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          backgroundColor: "#F0EFEC",
          color: "black",
          padding: 15,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography sx={{ fontWeight: "bold" }} variant="h3">
              24/7 Support Team
            </Typography>
            <Typography variant="subtitle1">
              Whether you're a customer seeking assistance with a product, a
              developer needing help with integration, or a partner with
              inquiries, we’re here to assist you.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DeveloperDescription;
