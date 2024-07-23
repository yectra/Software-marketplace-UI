import { Box, Typography } from "@mui/material"

interface Iprops{
  title:string
}

const FunctionDescription:React.FC<Iprops> = ({title}) => {
  return (
    <Box sx={{m:2}}>
    <Typography variant="h6">{title}</Typography>
    <Box>
        <Typography variant="subtitle2" sx={{color:"#6D6767",mt:2}}>Lorem ipsum dolor sit amet consectetur. Malesuada integer vel leo non pellentesque turpis in. Nec a proin dolor metus enim. Sed blandit id turpis urna enim morbi etiam. Pulvinar nunc facilisi adipiscing facilisis eleifend eget. Lectus blandit feugiat in aliquam fermentum. Imperdiet sapien ac enim pellentesque. Quis purus tortor mi magna tellus.</Typography>
        <Typography variant="subtitle2" sx={{color:"#6D6767",mt:2}}>Lorem ipsum dolor sit amet consectetur. Malesuada integer vel leo non pellentesque turpis in. Nec a proin dolor metus enim. Sed blandit id turpis urna enim morbi etiam. Pulvinar nunc facilisi adipiscing facilisis eleifend eget. Lectus blandit feugiat in aliquam fermentum. Imperdiet sapien ac enim pellentesque. Quis purus tortor mi magna tellus. </Typography>
    </Box>
   </Box>
  )
}

export default FunctionDescription