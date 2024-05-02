import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "./pages/Dashboard/Index"
import Wrapper from "./pages/InstallPage/Components/Wrapper"



function App() {
 

  return (

<BrowserRouter>
   <Routes>
   <Route path="/" element={<Index/>}/>
    <Route path='/install' element={<Wrapper/>}/>
   </Routes>
   </BrowserRouter>



  
  )
}

export default App
