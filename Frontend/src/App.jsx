import {BrowserRouter,Routes,Route} from "react-router"
import './App.css'
import Login from "./pages/Login"
import Signup from "./pages/signup"
import Homepage from "./pages/Homepage"

function App() {
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
