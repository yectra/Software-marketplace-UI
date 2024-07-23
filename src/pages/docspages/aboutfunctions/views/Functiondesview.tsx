import { Box } from "@mui/material"
import FunctionTitle from "../components/FunctionTitle"
import FunctionDescription from "../components/FunctionDescription"

const Functiondesview :React.FC= () => {
  return (
  
        <Box>
        <FunctionTitle/>
        <FunctionDescription title={"Availability of Marketplace Functions"}/>
        <FunctionDescription title={"Limitations and considerations"}/>
        </Box>
  )
}

export default Functiondesview