import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";

function ProgressBar({ solved, total, difficulty }) {
  const percentage = (solved / total) * 100;

  const getColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-orange-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-blue-500'; // fallback
    }
  };

  return (
    <div className="w-full max-w-md p-2">
      <div className="text-sm font-medium mb-1">
        {solved} / {total} problems solved
      </div>
      <div className="w-full bg-gray-300 rounded-full h-4">
        <div
          className={`${getColor(difficulty)} h-4 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function UserDash() {
  const { user } = useSelector((state) => state.auth);
  const [userdata, setUserData] = useState(null);
  const [totalProblems, setTotalProblems] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axiosClient.get("/stats/userstats");
      console.log(data)
      setUserData(data.user);
      setTotalProblems(data.totalprobs);
    };
    fetchUserData();
  }, []);

  if (!userdata || !totalProblems) {
    return <h1 className="text-6xl">Loading data....................</h1>;
  }

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4">
      {/* Left */}
      <div className="w-full h-full bg-amber-800 p-4 text-white">
        <div>{user.firstName}</div>
        <hr />
        <div>{user.emailId}</div>
        <div>Joined Since {userdata.createdAt}</div>
      </div>

      {/* Right */}
      <div className="w-full bg-blue-600 flex-col p-4 text-white">
        {/* Stats */}
        <div className="border-2 bg-fuchsia-700 p-2 mb-4">
          <h1 className="text-lg font-bold">Your Stats: </h1>
          <div className="p-2 border">
            <h3 className="mb-2">Problems Solved:</h3>
            <h1>Easy: </h1>
            <ProgressBar solved={userdata.counts.easy} total={totalProblems.easyprob} difficulty="easy" />
            <h1>Medium: </h1>
            <ProgressBar solved={userdata.counts.medium} total={totalProblems.mediumprob} difficulty="medium" />
            <h1>Hard: </h1>
            <ProgressBar solved={userdata.counts.hard} total={totalProblems.hardprob} difficulty="hard" />
            <hr className="my-3" />
            <h3>Submission Success:</h3>
            <ProgressBar solved={3} total={10} difficulty="submission" />
          </div>
        </div>

        {/* Submission History */}
        <div>
          {/* To be added */}
        </div>
      </div>
    </div>
  );
}

export default UserDash;
