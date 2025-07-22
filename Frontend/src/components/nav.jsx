import { LogOut, User, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router';
import axiosClient from "../utils/axiosClient"
import { logoutUser } from "../authSlice"

function Nav(){
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.auth)
    const [potd,setPotd] = useState(null)
    const handleLogout = () =>{
            dispatch(logoutUser())
        }

    useEffect(()=>{
        const fetchPOTD = async () => {
          try {
              const response = await axiosClient.get('/problem/potd');
              if (response.data) {
                const potd_id = response.data
                setPotd(potd_id)
              } else {
                console.warn("No POTD ID found in response.");
              }
            }         catch (err) {
            console.error("Failed to fetch POTD:", err);
        }
     };
     fetchPOTD()
    },[])
    return(
    <nav className="navbar bg-base-100 shadow-lg px-4 fixed top-0 left-0 z-40">
                <div className="flex-1">
                    <NavLink to="/" className="btn btn-ghost text-xl transition-all duration-400 ease-in-out hover:scale-105 hover:tracking-widest">&lt;CodeDrill&gt;</NavLink>
                </div>
                {/* Problem of the day */}

                <div className="flex-1">
                    <NavLink to={`/problem/${potd}`} className="btn btn-ghost text-sm transition-all duration-200 ease-in-out hover:scale-105 hover:tracking-normal">&lt;Problem Of the Day/&gt;</NavLink>
                </div>
                <div className="flex-none gap-4">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="btn btn-ghost transition-all duration-300 ease-in-out hover:scale-105 hover:tracking-wider">
                            {user?.firstName}
                        </div>
                        <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-black-100 rounded-box w-52">
                        <li className="text-primary font-bold"><NavLink to='/dashboard'><User />My Profile</NavLink></li>
                        
                        {user?.role=='admin'&&<li className=" font-bold text-primary"><NavLink to="/admin"><Shield/>Admin</NavLink></li>}
                        <li><button onClick={handleLogout} className="font-bold text-red-500">
                          <LogOut/>Logout</button>
                          </li>
                        </ul>
                    </div>
                </div>
            </nav>)
}

export default Nav