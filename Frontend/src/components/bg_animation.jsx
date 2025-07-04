
import React from "react";
import {
  Code,
  Braces,
  Bug,
  Parentheses,
  Binary,
  SquareTerminal,
  Terminal,
  FolderCode,
  Computer,
  Ampersand,
} from "lucide-react";

const icons = [
  Code,
  Braces,
  Bug,
  Parentheses,
  Binary,
  SquareTerminal,
  Terminal,
  FolderCode,
  Computer,
  Ampersand,
];

const positions = [
  { top: "10%", left: "5%" },
  { top: "20%", left: "25%" },
  { top: "15%", left: "45%" },
  { top: "30%", left: "70%" },
  { top: "40%", left: "85%" },
  { top: "60%", left: "10%" },
  { top: "55%", left: "35%" },
  { top: "70%", left: "60%" },
  { top: "80%", left: "80%" },
  { top: "65%", left: "50%" },
];

//const sizes = ["w-8 h-8", "w-10 h-10", "w-13 h-13", "w-15 h-15", "w-20 h-20"];
const colors = [
  "text-red-400",
  "text-blue-400",
  "text-green-400",
  "text-yellow-400",
  "text-purple-400",
  "text-pink-400",
  "text-orange-400",
  "text-cyan-400",
  "text-emerald-400",
  "text-rose-400",
];

const AnimateBg = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden z-[-1]">
      {icons.map((Icon, i) => (
        <div
          key={i}
          className={`absolute animate-float w-100 h-100 ${colors[i % colors.length]}`}
          style={{
            top: positions[i].top,
            left: positions[i].left,
            opacity: 0.8,
          }}
        >
          <Icon size={60}/>
        </div>
      ))}
    </div>
  );
};

export default AnimateBg;

