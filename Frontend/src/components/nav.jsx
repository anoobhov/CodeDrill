import { LogOut, User, Shield, Flame, FlameKindling } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router';
import { useEffect, useState } from "react";
import { logoutUser,fetchStreaks } from "../authSlice"
function Nav(){
    const dispatch = useDispatch()
    const currentStreak = useSelector((state) => state.auth.currentStreak);
    const longestStreak = useSelector((state) => state.auth.longestStreak);

     const [scrolled, setScrolled] = useState(false);
    const {user} = useSelector((state)=>state.auth) 
    const handleLogout = () =>{
            dispatch(logoutUser())
        }

    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

   

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   useEffect(() => {
    dispatch(fetchStreaks());
}, [dispatch]);

    return(
        <div className="flex justify-center w-[100vw]">
    <nav id="navbar" className={`navbar bg-gradient-to-tr backdrop-blur-md bg-opacity-60 px-4 fixed top-0 z-40 transition-all duration-600 linear ${
          scrolled ? "w-[100vw] px-10" : "w-[60%] rounded-4xl pt-2"
        }`}>
                <div className="flex-1">
                    <NavLink to="/" className={`text-2xl font-bold transition-all duration-400 ease-in-out`}>
                <img src={scrolled? "/logo_big.png":"/logo_small.png"} className={`${scrolled?"w-auto h-15":"h-15 w-auto"}`}></img>
                </NavLink>
                </div>
                <div className="flex flex-row items-center gap-2">

                <div>
                        <button className={`btn border-0 bg-green-300/80 text-green-700 transition-all duration-2000 ease-in-out ${scrolled? "":"rounded-4xl"}
                        `}>{currentStreak}<Flame/></button>
                    </div>
                    <div>
                        <button className={`btn border-0 bg-red-300 text-red-700 transition-all duration-2000 ease-in-out ${scrolled? "":"rounded-4xl"}
                        `}>{longestStreak}<FlameKindling/></button>
                    </div>
                    <div>
                        <NavLink to="/problemset">
                        <button className={`btn btn-dash transition-all duration-2000 ease-in-out ${scrolled? "":"rounded-4xl"}
                        `}>Problem Set</button></NavLink>
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className={`btn btn-dash 
                            transition-all duration-2000 ease-in-out font-bold ${scrolled? "":"rounded-4xl"}
                            `}>
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
            </nav>
            </div>
            )
}

export default Nav