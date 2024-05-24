import route from "./providers/router"

import { useRoutes } from "react-router-dom";




function App() {
 
 const router=useRoutes(route)

  return (

<div className="">
    {router}
  </div>



  )
}

export default App
