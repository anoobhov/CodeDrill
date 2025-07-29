import { useEffect } from "react";

function Pricing()
{

    useEffect(() => {
  const cardContainer = document.getElementById("card-container");

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
        <h1 className='font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-300 py-2'>Structured Learning Path</h1>
  <h1 className=''>Carefully crafted curriculum designed for your Aspiration</h1>
  {/* Cards */}
   <div className="flex justify-center relative gap-0 transition-all duration-1000 ease-in-out opacity-0 translate-y-10"
   id='card-container'
   >
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
</>
    )
}

export default Pricing