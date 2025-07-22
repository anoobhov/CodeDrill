import { LogOut, User, Shield } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router';
import { logoutUser } from "../authSlice"

function Nav(){
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.auth) 
    const handleLogout = () =>{
            dispatch(logoutUser())
        }

    return(
    <nav className="navbar bg-base-100 shadow-lg px-4 fixed top-0 left-0 z-40">
                <div className="flex-1">
                    <NavLink to="/" className="btn btn-ghost text-xl transition-all duration-400 ease-in-out hover:scale-105 hover:tracking-widest">&lt;CodeDrill&gt;</NavLink>
                </div>
                <div className="flex flex-row items-center">
                    <div>
                        <button className="btn">Problem Set</button>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="btn transition-all duration-300 ease-in-out">
                            {user?.firstName}
                        </div>
                        <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-black rounded-box w-52">
                        <li className=" font-bold"><NavLink to='/dashboard'><User />My Profile</NavLink></li>
                        
                        {user?.role=='admin'&&<li className=" font-bold "><NavLink to="/admin"><Shield/>Admin</NavLink></li>}
                        <li><button onClick={handleLogout} className="font-bold text-red-500">
                          <LogOut/>Logout</button>
                          </li>
                        </ul>
                    </div>
                </div>
            </nav>)
}

export default Nav