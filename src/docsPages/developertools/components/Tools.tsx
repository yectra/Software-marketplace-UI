import { Box, Typography } from "@mui/material"
interface data{
    title:string,
    description:string
}
const Tools = ({title,description}:data) => {

  return (
    <Box sx={{display:"flex",flexDirection:"column",boxShadow:2,justifyContent:"center",height:150,borderRadius:1}}>
        <Typography sx={{pl:2,color:"#363636 "}}variant="h6">{title}</Typography>
        <Typography sx={{p:2,color:"#929292 "}} variant="subtitle2">{description}</Typography>

    </Box>
  )
}

export default Tools