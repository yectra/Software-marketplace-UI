import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "./pages/Dashboard/Index"
import Wrapper from "./pages/InstallPage/Components/Wrapper"
import Indexdev from "./developerPages/devDashboard/Indexdev"
import Devpage from "./developerPages/developingPage/view/Devpage"
import Adspageview from "./developerPages/developingPage/Appadspage/Adspageview"



function App() {
 

  return (

<BrowserRouter>
   <Routes>
   <Route path="/" element={<Index/>}/>
    <Route path='/install' element={<Wrapper/>}/>
    <Route path="/developer" element={<Indexdev/>}/>
    <Route path="/dev" element={<Devpage/>}/>
    <Route path="/ads" element={<Adspageview/>}/>
   </Routes>
   </BrowserRouter>




  )
}

export default App
