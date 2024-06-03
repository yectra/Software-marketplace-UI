import { Box, Grid, Typography} from "@mui/material"
import Adsdetails from "../components/Adsdetails"
import Marketplacefunctions from '../assets/Marketplacefunctions.png'
import Metaobjects from '../assets/metaobjects.png'
import UIUX from '../assets/Extensions.png'
import Testing from '../assets/Testing.png'
const Multiads = () => {
    const adsData = [
        {
          title: "Marketplace Function",
          logo: Marketplacefunctions,
          description: "Lorem ipsum dolor sit amet consectetur. Nisi fermentum pharetra vel viverra tincidunt augue. In sit dolor at enim non nulla fermentum suspendisse aliquam. Ac sollicitudin fames massa bibendum malesuada aliquet dictum.",
          bgcolor:"#FED19C"
        },
        {
          title: "Metaobjects",
          logo: Metaobjects,
          description: "Lorem ipsum dolor sit amet consectetur. Nisi fermentum pharetra vel viverra tincidunt augue. In sit dolor at enim non nulla fermentum suspendisse aliquam. Ac sollicitudin fames massa bibendum malesuada aliquet dictum.",
          bgcolor:"black"
        },
        {
          title: "UI UX extensions",
          logo:UIUX,
          description: "Lorem ipsum dolor sit amet consectetur. Nisi fermentum pharetra vel viverra tincidunt augue. In sit dolor at enim non nulla fermentum suspendisse aliquam. Ac sollicitudin fames massa bibendum malesuada aliquet dictum.",
          bgcolor:"#B2D677"
        },
        {
            title: "Testing",
            logo: Testing,
            description: "Lorem ipsum dolor sit amet consectetur. Nisi fermentum pharetra vel viverra tincidunt augue. In sit dolor at enim non nulla fermentum suspendisse aliquam. Ac sollicitudin fames massa bibendum malesuada aliquet dictum.",
            bgcolor:"#85DAED"
          }
      ];


  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" sx={{color:"#292A2E",fontStyle:"bold",fontWeight:700,mb:2}}>What's new with marketplace apps</Typography>
    <Grid container spacing={2}>
      {adsData.map((app, index) => (
        <Grid item xs={12} sm={6} md={6} key={index}>
          <Adsdetails
            title={app.title}
            description={app.description}
            logo={app.logo}
            bgcolor={app.bgcolor}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
  )
}

export default Multiads