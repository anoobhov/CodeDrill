import { NavLink } from 'react-router';
import {Users ,NotepadText, Flame} from "lucide-react";
import Nav from "../components/nav";
import Footer from '../components/footer';


function Homepage(){
return(<div className='bg-gradient-to-tl from-gray-900 via-gray-500 to-gray-900 scroll-smooth'>
    <Nav/>

    {/* main */}
        <div className=" min-h-[100vh] p-25 pt-40 flex md:flex-row">
            {/* left SIde */}
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
              
            <a  className="btn w-45 mt-3 rounded-2xl hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300" href='#sheets'>EXPLORE SHEETS —&gt;</a>
            <NavLink to="/problemset">
            <button className="btn w-45 mt-3 rounded-2xl hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300">Start Drill —&gt;  </button>
            </NavLink>
            </div>
            </div>
        </div>

{/* features */}

<div className=" mt-5 p-3 text-center">
    <div className="text-5xl mb-5">Features</div>
    <span className="text-xl">Our platform is designed to help you master algorithms and ace technical interviews through deliberate practice and visual learning.</span>
    {/* cards */}
    <div className="flex gap-10 justify-center">
        {/* card */}
    <div className="card bg-gradient-to-tl from-yellow-400 via-white to-yellow-400 w-80 shadow-sm mt-3 border-white border-1 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-300">
  <figure className="pt-7">
         <div className="w-[50px] h-[60px] text-5xl">💣</div>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl text-black">Targeted Drills</h2>
    <p className="text-gray-800">At CodeDrill, your problem sets aren’t random — they’re strategic loadouts, crafted by experienced drill instructors and field-tested by coding veterans.
<br></br>
Each mission is grouped by combat pattern (topic), threat level (difficulty), and engagement frequency (industry relevance) — ensuring your drills hit the mark every time.
</p>
  </div>
</div>

 <div className="card bg-gradient-to-tl from-gray-900 via-gray-500 to-gray-900 w-80 shadow-sm mt-3 border-white border-1 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-300">
  <figure className="pt-7">
    <div className="w-[50px] h-[60px] text-5xl">⚔️</div>
         
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl">Tactical Advisor</h2>
    <p className="text-gray-400">Every commando needs a battle strategist, not just brute strength.
<br></br>
Meet Alpha, your personal field mentor — a mission-ready AI trained in the art of war... code war.
<br></br>
From smart code reviews and encrypted hints to tactical debugging and logic recon, Alpha AI is always at your flank — ensuring you never enter a problem unprepared.
</p>
  </div>
</div>

 <div className="card bg-gradient-to-tl from-yellow-600 via-yellow-100 to-yellow-600 w-80 mt-3 border-white border-1 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-800">
  <figure className="pt-7">
        <div className="w-[50px] h-[60px] text-5xl">🪖</div>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl text-black">Code Drills</h2>
    <p className="text-gray-800">No soldier enters the battlefield unarmed — and no coder should face a contest untrained.<br></br>Our drills aren’t just exercises — they’re battle simulations. Each coding challenge is handpicked, field-tested, and mission-ready — designed to forge your skills under pressure and transform you from a coding recruit into a logic commando.</p>
  </div>
</div>
</div>
</div>

{/* Pricing */}
<div className=" mt-5 p-6 text-center" id='sheets'>
  <h1 className='font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-300 py-2'>Structured Learning Path</h1>
  <h1 className=''>Carefully crafted curriculum designed for your Aspiration</h1>
  {/* Cards */}
   <div className="flex gap-10 justify-center">
    {/* Card */}
  <div className="card bg-gradient-to-tl from-green-600 via-green-100 to-green-600 w-80 mt-3 border-white border-1 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-green-800">
  <figure className="pt-7">
        <div className="w-[50px] h-[60px] text-5xl">🪖</div>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl text-black">Core Fundamentals</h2>
    <p className="text-gray-800">Strengthen your core with handpicked problems that focus on basics like arrays, strings, recursion, and sorting. Whether you're a beginner or revisiting concepts, this sheet builds clarity and confidence from the ground up.</p>
    <p>Visit -&gt;</p>
  </div>
</div>

{/* Interview */}
<div className="card bg-gradient-to-tl from-orange-600 via-orange-100 to-orange-600 w-80 mt-3 border-white border-1 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-800">
  <div className="w-auto absolute left-[30%] px-3 py-1 rounded-full text-sm font-semibold inline-block text-[#FFD700] bg-[#1F1F00] border border-[#FFD700] shadow-[0_0_10px_#FF61C3] animate-bounce">
  ✨ Most Popular
</div>
  <figure className="pt-7">
        <div className="w-[50px] h-[60px] text-5xl">🪖</div>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl text-black">Ace the Interviews</h2>
    <p className="text-gray-800">This sheet is tailor-made for aspirants gearing up for coding interviews at top tech companies.Tackle the most asked interview questions with focused DSA practice. Each problem is selected to sharpen your thinking and prep you for real coding rounds — smart, efficient, and to the point.</p>
    <p>Buy</p>
  </div>
</div>
{/* Cp */}
<div className="card bg-gradient-to-tl from-blue-600 via-blue-100 to-blue-600 w-80 mt-3 border-white border-1 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-800">
  <figure className="pt-7">
        <div className="w-[50px] h-[60px] text-5xl">🪖</div>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl text-black">CP</h2>
    <p className="text-gray-800">Designed for contest lovers, this sheet pushes your limits with logic-heavy, time-bound problems. Perfect your speed, strategy, and mastery of algorithms for the competitive arena.</p>
     <p>Buy</p>
  </div>
</div>
</div>
</div>
{/* ScreenShots */}
{/* Footer */}
<Footer/>


    </div>)
}

export default Homepage