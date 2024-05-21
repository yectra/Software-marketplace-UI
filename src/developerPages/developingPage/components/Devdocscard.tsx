import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

export const Devdocscard = () => {
  const [activeTool, setActiveTool] = useState("npm");
  const [copyText, setCopyText] = useState("npx degit yectra/smp-template .");
  const [copyMessage, setCopyMessage] = useState("");

  const handleToolClick = (tool:string) => {
    setActiveTool(tool);
    setCopyText(getCopyText(tool));
  };

  const getCopyText = (tool:string) => {
    switch (tool) {
      case "npm":
        return "npx degit yectra/smp-template .";
      case "yarn":
        return "Yarn add @Marketplace/app@latest";
      case "pnpm":
        return "Pnpm add @Marketplace/app@latest";
      default:
        return "";
    }
  };

  const copyToClipboard = (text:string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopyMessage("Text copied successfully.");
        setTimeout(() => {
          setCopyMessage("");
        }, 1000);
      })
      .catch((error) => setCopyMessage("Error copying text: " + error.message));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", boxShadow: 5, borderRadius: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", m: 2 }}>
        <Typography sx={{ mb: 2 }} variant="h5">
          Use the Marketplace
        </Typography>
        <Typography variant="subtitle2">
        In this tutorial, you'll create an app that users can access in
        </Typography>
        <Typography variant="subtitle2">
        You'll generate starter code to develop your app.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "300px", m: 2 }}>
        <Button variant="text" onClick={() => handleToolClick("npm")} sx={{ fontWeight: activeTool === "npm" ? "bold" : "normal", color: "black" }}>
          Npm
        </Button>
        <Button variant="text" onClick={() => handleToolClick("yarn")} sx={{ fontWeight: activeTool === "yarn" ? "bold" : "normal", color: "black" }}>
          Yarn
        </Button>
        <Button variant="text" onClick={() => handleToolClick("pnpm")} sx={{ fontWeight: activeTool === "pnpm" ? "bold" : "normal", color: "black" }}>
          Pnpm
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#D9D9D9", borderRadius: "7px", m: 2 }}>
        <Typography variant="subtitle1" sx={{ ml: 3 }}>
          {copyText}
        </Typography>
        <Button onClick={() => copyToClipboard(copyText)} sx={{ "&:hover": { bgcolor: "#252525" }, bgcolor: "#252525", borderRadius: "6px", color: "white" }}>Copy</Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", color: "green", mb: 2 }}>
        {copyMessage}
      </Box>
    </Box>
  );
};
