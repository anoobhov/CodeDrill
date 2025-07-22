import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { NavLink } from 'react-router';
import { Trophy, ChartNoAxesCombined } from "lucide-react";

function ProgressBar({ solved, total, difficulty }) {
  const percentage = (solved / total) * 100;

  const getColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return 'green-500';
      case 'medium':
        return 'orange-500';
      case 'hard':
        return 'red-500';
      default:
        return 'blue-500'; // fallback
    }
  };

  return (
    <div className="w-full max-w-md p-2">
      <div className="flex justify-between">
      {difficulty.toUpperCase()}:
      <div className={`text-${getColor(difficulty)} text-sm font-medium mb-1 flex justify-end items-end px-3`}>
        {solved} / {total}
      </div>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2">
        <div
          className={`bg-${getColor(difficulty)} h-2 rounded-full transition-all duration-300`}
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
  const [submissions,setSubmissions] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axiosClient.get("/stats/userstats");
      // console.log(data)
      setUserData(data.user);
      setTotalProblems(data.totalprobs);
      setSubmissions(data.userTotalSubmissions)
    };
    fetchUserData();
  }, []);

  if (!userdata || !totalProblems) {
    return <h1 className="text-6xl">Loading data....................</h1>;
  }

  return (
<>
  <div className="grid grid-cols-[1fr_2fr] gap-4">
      {/* Left */}
      <div className="w-full bg-gray-700 p-4 text-white border-2 mt-3 hover:shadow-2xl">
        <div className="text-3xl font-bold mb-3">{user.firstName}'s Dashboard</div>
        <span className="text-gray-300 ">Track your progress and improve your Skills</span>
        <hr className="mt-2" />
        <div className=" my-7 py-3">Email:<br></br> {user.emailId}</div>
        <div className="py-3 my-7">Member Since: {userdata.createdAt}</div>
        <div>Current Streak: </div>
      </div>

      {/* Right */}
      <div className="w-full bg-black flex-col p-4 text-white">
        {/* Stats */}
        <div className="border-2 bg-gray-700 p-2 mb-4">
          <h1 className="text-lg font-bold flex items-center text-yellow-400"><ChartNoAxesCombined/>Your Stats: </h1>
          <div className="p-2 border">
            <h3 className="mb-2 flex items-center"><Trophy/>Problems Solved:</h3>
            
            <ProgressBar solved={userdata.counts.easy} total={totalProblems.easyprob} difficulty="easy" />
            {/* <h1>Medium: </h1> */}
            <ProgressBar solved={userdata.counts.medium} total={totalProblems.mediumprob} difficulty="medium" />
            {/* <h1>Hard: </h1> */}
            <ProgressBar solved={userdata.counts.hard} total={totalProblems.hardprob} difficulty="hard" />
            <hr className="my-3" />
            <h3>Submission Success:</h3>
            <ProgressBar solved={3} total={10} difficulty="submission" />
          </div>
        </div>

        {/* Submission History */}
        <div className="mt-3 bg-gray-700 border-2">
          {/* name */}
          <h1 className="text-2xl font-semibold py-2 ">Recent Submissions</h1>
          <hr></hr>
          <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission._id}>
                <th>{index + 1}</th>
                <td>{submission.problemId.title}</td>
                <td>
                  <span className={`badge ${
                    submission.status === 'accepted' 
                      ? 'badge-success' 
                      : submission.status === 'pending' 
                        ? 'badge-warning' 
                        : 'badge-error'
                  }`}>
                    {submission.status}
                  </span>
                </td>
                <td>
                  <span className="badge">
                    {new Date(submission.createdAt).toLocaleString("en-IN", {
  year: "numeric",
  month: "long",
  day: "numeric",
})}
                  </span>
                </td>

                <td>
                  <span className="text-gray-400 ">
                    
                    {submission.runtime} s | {submission.memory} KB
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default UserDash;
