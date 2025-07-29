import { useEffect } from "react";

function Features()
{
    useEffect(() => {
      const cardContainer = document.getElementById("card-containers");
    
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            cardContainer.classList.add("opacity-100", "translate-y-0", "flex-row", "gap-10","mb-8");
            cardContainer.classList.remove("flex-col", "gap-0");
          }
        },
        { threshold: 0.3 }
      );
    
      if (cardContainer) {
        observer.observe(cardContainer);
      }
    
      return () => {
        if (cardContainer) observer.unobserve(cardContainer);
      };
    }, []);
    return(
        <>
        <div className="text-5xl mb-5 font-bold" >Features (you'll love)</div>
    <span className="text-xl">Our platform is designed to help you master algorithms and ace technical interviews through deliberate practice and visual learning.</span>
    {/* cards */}
    <div className="flex justify-center relative gap-0 transition-all duration-1000 ease-in-out opacity-0 translate-y-10"
     id="card-containers"
    >
        {/* card */}
    <div className="card bg-gradient-to-tl from-yellow-400 via-white to-yellow-400 w-80 shadow-sm mt-3 border-white border-1 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-300"
   >
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
</>
    )
}
export default Features