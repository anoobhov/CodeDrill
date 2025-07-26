import { useState, useEffect, useRef } from "react";
import { AlarmClock } from "lucide-react"; // or wherever you're importing it from

const Stopwatch = ({ isRunning, setIsRunning }) => {
  const [time, setTime] = useState(0); // time in seconds
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Cleanup on stop or unmount
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="text-white text-lg flex items-center gap-4">
      <button className="btn" onClick={handleStartStop}>
        <span>{formatTime(time)}</span>
        <AlarmClock />
      </button>
      
    </div>
  );
};

export default Stopwatch;
