import { NavLink } from 'react-router';
import {Users ,NotepadText, Flame} from "lucide-react";

function Main(){
    return(
        <>
        <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-5xl text-gray-200">Master Data Structures & Algorithms </h1>
            <h3 className="text-3xl mt-7  text-transparent bg-clip-text py-2 bg-gradient-to-r from-orange-500 via-white to-green-600 ">From Typing Code to Topping Contests</h3>
            <div className="px-3 py-1 rounded-full text-sm font-semibold inline-block text-[#FFD700] bg-[#1F1F00] border border-[#FFD700] shadow-[0_0_10px_#FF61C3]">
  ✨ The Ultimate DSA Platform
</div>

            <div className="flex gap-2 mt-20">
                <button className="btn btn-ghost border-1 border-gray-200 hover:border-green-600 hover:bg-transparent duration-300"><Users className="text-green-500"/>1000+ Active Users</button>
                <button className="btn btn-ghost border-1 border-gray-200 transition-all hover:border-cyan-600 hover:bg-transparent duration-300"><NotepadText className="text-cyan-500"/>10+ Special Sheets</button>
                <button className="btn btn-ghost border-1 border-gray-200 transition-all hover:border-orange-600 hover:bg-transparent duration-300"><Flame className="text-orange-500"/>24/7 Support</button>
            </div>
            </div>
            {/* RIght side */}
            <div className="md:w-1/2 ml-3 text-right">
            <span className="inline-block pl-10 text-xl text-gray-400">Enlist as a coding recruit and rise to an elite code commando. From raw recruit to logic-special forces—train with purpose.</span>
            <div className="flex flex-col items-end space-y-2 mt-3">
              
            <a  className="btn w-45 mt-3 rounded-2xl  transition-all duration-400 ease-in-out hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] " href='#sheets'>EXPLORE SHEETS —&gt;</a>
            <NavLink to="/problemset">
            <button className="btn w-45 mt-3 rounded-2xl hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300">Start Drill —&gt;  </button>
            </NavLink>
            </div>
            </div>
            </>
    )
}

export default Main