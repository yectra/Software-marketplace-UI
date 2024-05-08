import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "./pages/Dashboard/Index"
import Wrapper from "./pages/InstallPage/Components/Wrapper"
import Indexdev from "./developerPages/devDashboard/Indexdev"



function App() {
 

  return (

<BrowserRouter>
   <Routes>
   <Route path="/" element={<Index/>}/>
    <Route path='/install' element={<Wrapper/>}/>
    <Route path="/developer" element={<Indexdev/>}/>
   </Routes>
   </BrowserRouter>



  
  )
}

export default App
