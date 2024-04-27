import { Route, Router, Routes, } from "react-router"
import Login from "./Pages/Login"
import Navbar from "./Pages/Navbar"
import Signup from "./Pages/Signup"
import Compose from "./Pages/Compose"
import Bulkemail from "./Pages/Bulkemail"
import Settings from "./Pages/Settings"
import Senditems from "./Pages/Senditems"
import { Toaster } from "react-hot-toast"
import Schedule from "./Pages/Schedule"
import 'react-big-calendar/lib/css/react-big-calendar.css';




function App() {
 
  return <>
    <div>
    <Navbar />
    <Toaster/>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/compose" element={<Compose />} />
      <Route path="/bulk" element={<Bulkemail />} />
      <Route path="/schedule" element={<Schedule/>} />
      <Route path="/setting" element={<Settings />} />
      <Route path="/senditem" element={<Senditems/>} />
      <Route path="*" element={<Login/>} />
      </Routes>
      </div>
  </>
}

export default App
