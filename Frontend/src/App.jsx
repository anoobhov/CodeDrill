import {BrowserRouter,Routes,Route, Navigate} from "react-router"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AdminPage from "./pages/Adminpage"
import ProblemCreation from "./components/ProbCreate"
import ProblemDelete from "./components/ProbDelete"
import Homepage from "./pages/Homepage"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./authSlice"
import ProblemPage from "./pages/ProblemPage"

// import Test from "../0notes/testing"


// 1️⃣ What is store?
// 👉 Think of store as a central warehouse for your entire app's state.

// It holds your entire Redux state tree.

// It knows how to:
// Store state (initialState)
// Update state (reducers)
// Dispatch actions
// Notify subscribers (components) when state changes.

// Now:

// store.getState() → gives you current state.

// store.dispatch(action) → sends action to reducers to update state.

// 2️⃣ What is Provider?
// 👉 Provider is simply a React wrapper that gives your entire app access to the Redux store.

// Without Provider, your React components have no idea that Redux exists.


// ✅ Simple analogy:
// | Concept       | Meaning                                                  |
// | ------------- | -------------------------------------------------------- |
// | `store`       | The bank where your app's data (state) lives             |
// | `Provider`    | The manager who gives every component access to the bank |
// | `useSelector` | How components read money from the bank                  |
// | `useDispatch` | How components send money / requests to update data      |



function App() {

  const {isAuthenticated,loading}=useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

    if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return(
    <>
    <BrowserRouter>
      <Routes>
        {/* if already logged in navigate to homepage */}
        <Route path="/" element={isAuthenticated?<Homepage/>:<Navigate to='/login'/>}></Route>
        <Route path='/login' element={isAuthenticated?<Navigate to='/'/>: <Login/>}></Route>
        <Route path='/signup' element={isAuthenticated?<Navigate to='/'/>: <Signup/>}></Route>
        <Route path="/problem/:problemId" element={<ProblemPage/>}></Route>

        {/* Admin Stuffs */}
        <Route path="/admin" element={<AdminPage/>}></Route>
        <Route path="/admin/create" element={<ProblemCreation/>}></Route>
        <Route path="/admin/delete" element={<ProblemDelete/>}></Route>
        
        {/* <Route path="/testing" element={<Test/>}></Route> */}

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


// ✅ Let’s go one-by-one:
// 1️⃣ useSelector() → Reading state
// Think of this as:
// const state = store.getState();
// But in React functional components, you can’t directly call store.getState(), 
// so Redux provides useSelector() hook.

// const user = useSelector((state) => state.auth.user);
// This means:
// Go to the store
// Look inside the auth slice
// Get me user from there




// ✅ Why don’t we directly call store.getState() or store.dispatch()?
// Because:
// Redux works outside of React.

// React hooks like useSelector() make sure that:
// Your component automatically re-renders when that piece of state changes.
// It stays inside React’s reactivity system.
// Cleaner functional component code.

