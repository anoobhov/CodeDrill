import { LogOut } from "lucide-react";


function nav(){
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
                        <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><NavLink to>My Profile</NavLink></li>
                        <li><button onClick={handleLogout}><LogOut/>Logout</button></li>
                        {user?.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
                        </ul>
                    </div>
                </div>
            </nav>
}