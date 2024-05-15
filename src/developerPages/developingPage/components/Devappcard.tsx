import { Box, Button, Typography, TextField } from "@mui/material";

const Devappcard = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2, boxShadow: 5, borderRadius: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "100%", height: "270px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography variant="h5">Use Marketplace Partners</Typography>
          <Typography variant="subtitle2">Create an App From scratch.</Typography>
          <Typography variant="subtitle2">App Name</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField size="small" sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "black", 
          },
          "&:hover fieldset": {
            borderColor: "black", 
          },
          "&.Mui-focused fieldset": {
            borderColor: "black", 
          },
        },
      }}  />
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "250px",marginTop:8  }}>
            <Button sx={{ width: "100px", border: "0.5px solid black", color: "#6D6767", borderRadius: "8px" }}>
              Cancel
            </Button>
            <Button
              sx={{
                width: "100px",
                bgcolor: "#D9D9D9",
                color: "#6D6767",
                border: "0.5px ",
                borderRadius: "8px",
                outline: "none",
                "&:hover": { bgcolor: "#D9D9D9", color: "black" },
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Devappcard;