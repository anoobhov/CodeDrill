import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { logoutUser } from "../authSlice"
import { NavLink } from 'react-router';
import AnimateBg from "../components/bg_animation";
import { Bomb } from "lucide-react";


function Homepage(){
    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    return(<>
    
    <AnimateBg/>
    {/* nav */}
    <nav className="navbar fixed top-6 left-29 bg-red-300 rounded-3xl p-3 w-[80%]">
        <div className="flex-1">
            <NavLink to="/" className="btn btn-ghost text-xl transition-all duration-400 ease-in-out hover:scale-105 hover:tracking-widest">&lt;CodeDrill&gt;</NavLink>
        </div>

        <div className="flex-1">
            <NavLink to="/problemset" className="btn btn-ghost text-xl transition-all duration-400 ease-in-out hover:scale-105 hover:tracking-widest">Problems</NavLink>
        </div>

        <div className="flex-1">
            <NavLink to="/AboutUs" className="btn btn-ghost text-xl transition-all duration-400 ease-in-out hover:scale-105 hover:tracking-widest">About Us</NavLink>
        </div>

        <div className="flex-1">
            <NavLink to="/dashboard/:id" className="btn btn-ghost text-xl transition-all duration-400 ease-in-out hover:scale-105 hover:tracking-widest">My Dashboard</NavLink>
        </div>
    </nav>

    {/* main */}
        <div className="bg-emerald-400 mt-30 min-h-[80vh] p-25 flex md:flex-row">
            
            {/* left SIde */}
            <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-4xl font-semibold  bg-amber-400">Master Data Structures & Algorithms. </h1>
            <h3>From Typing Code to Topping Contests</h3>
            <div className="bg-amber-200 rounded-3xl px-2 text-sm inline text-amber-500 shadow-sm border-amber-900 border-1">✨The Ultimate DSA platform</div>
            <div className="flex gap-2 mt-3">
                <button className="btn btn-ghost border-1 border-gray-200">1000+ Active Users</button>
                <button className="btn btn-ghost border-1 border-gray-200">10+ Special Sheets</button>
                <button className="btn btn-ghost border-1 border-gray-200">24/7 Support</button>
            </div>
            </div>
            {/* RIght side */}
            <div className="md:w-1/2 ml-3 text-right">
            <span className="inline-block bg-amber-600">Enlist as a coding recruit and rise to an elite code commando. From raw recruit to logic-special forces—train with purpose. CodeDrill molds coders through battle-tested algorithmic drills.</span>
            <button className="btn hover:underline mt-3 ">EXPLORE SHEETS —&gt;  </button>
            <button className="btn hover:underline  mt-3">Start Drill —&gt;  </button>
            </div>
        </div>

{/* features */}

<div className="bg-blue-600 mt-5 p-3 text-center">
    <div>Features</div>
    <span>Our platform is designed to help you master algorithms and ace technical interviews through deliberate practice and visual learning.</span>
    {/* cards */}
    <div className="flex gap-2 justify-center">
        {/* card */}
    <div className="card bg-base-100 w-96 shadow-sm mt-3">
  <figure className="pt-7">
        <Bomb className="bg-gray-400 p-1" width={50} height={50}/>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Reference Learning</h2>
    <p>Visualize algorithms, step through solutions, and understand core concepts.</p>
  </div>
</div>

 <div className="card bg-base-100 w-96 shadow-sm mt-3">
  <figure className="pt-7">
        <Bomb className="bg-gray-400 p-1" width={50} height={50}/>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Reference Learning</h2>
    <p>Visualize algorithms, step through solutions, and understand core concepts.</p>
  </div>
</div>

 <div className="card bg-base-100 w-96 shadow-sm mt-3">
  <figure className="pt-7">
        <Bomb className="bg-gray-400 p-1" width={50} height={50}/>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Reference Learning</h2>
    <p>Visualize algorithms, step through solutions, and understand core concepts.</p>
  </div>
</div>
</div>
</div>

{/* Pricing */}
{/* ScreenShots */}
{/* Footer */}

    </>)
}

export default Homepage