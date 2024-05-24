import { Box, Typography } from "@mui/material"
import animationGif from '../assets/Mailanimation.gif'

export const Mailsuccesspage = () => {
  return (
      <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center"
    }}
  >
   <object data={animationGif} type="image/gif">
    <img src={animationGif} alt="Animation" />
  </object>
    <Typography variant="h4" sx={{ mb: 2 }}>
      Email Sent Successfully!
    </Typography>
   
    <Typography variant="subtitle1" sx={{ mt: 2 }}>
      Thank you for creating an app. We have sent a confirmation email to your inbox.
    </Typography>
  </Box>

  )
}
