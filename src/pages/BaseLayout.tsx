
import IndexforIns from "./InstallPage/IndexforIns"
import { useLocation } from "react-router-dom"



const BaseLayout = () => {
  const location=useLocation();
  return (

      <IndexforIns key={location.key}/>
 

  )
}

export default BaseLayout