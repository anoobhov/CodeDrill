import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { NavLink } from 'react-router';

import { Trophy, ChartNoAxesCombined } from "lucide-react";
import Nav from "../components/nav";
import AnimateBg from "../components/bg_animation";
import Loading from "../components/loading";
import Heatmap from "../components/UserStats/heatmap";

function ProgressBar({ solved, total, difficulty }) {
  const percentage = (solved / total) * 100;

  const textgetColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return 'text-green-500';
      case 'medium':
        return 'text-orange-500';
      case 'hard':
        return 'text-red-500';
      default:
        return 'text-blue-500'; // fallback
    }
  };

  const bggetColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return 'bg-gradient-to-l from-green-800 via-green-200 to-green-800';
      case 'medium':
        return 'bg-gradient-to-l from-orange-500 via-orange-200 to-orange-500';
      case 'hard':
        return 'bg-gradient-to-l from-red-800 via-red-200 to-red-800';
      default:
        return 'bg-gradient-to-l from-blue-800 via-blue-200 to-blue-800'; // fallback
    }
  };
  return (
    <div className="w-full max-w-md p-2">
      <div className="flex justify-between">
      {difficulty.toUpperCase()}:
      <div className={`${textgetColor(difficulty)} text-sm font-medium mb-1 flex justify-end items-end px-3`}>
        {solved} / {total}
      </div>
      </div>
      <div className="w-full bg-gray-300  rounded-full h-2">
        <div
          className={`${bggetColor(difficulty)} h-2 rounded-full transition-all duration-300`}
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
  const [dailyCounts,setDailyCounts] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axiosClient.get("/stats/userstats");
      // console.log(data)
      setUserData(data.user);
      setTotalProblems(data.totalprobs);
      setSubmissions(data.userTotalSubmissions)
      setDailyCounts(data.dailyCounts)
    };
    fetchUserData();
  }, []);

if (!userdata || !totalProblems) {
  return (
    <Loading/>
  )
}
  return (
<>
<AnimateBg/>
<Nav/>
  <div className="grid grid-cols-[1fr_2fr] gap-4 mt-25 bg-cover bg-center bg-no-repeat">
      {/* Left */}
      <div className="h-[43%] inline-block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border rounded-xl p-6 shadow-xl text-white  mt-3 transition-all duration-300 border-yellow-300 hover:shadow-xl shadow-amber-300">
        <div className="text-3xl font-bold mb-3">{user.firstName}'s Dashboard</div>
        <span className="text-gray-300 ">Track your progress and improve your Skills</span>
        <hr className="mt-2" />
        <div className=" my-7 py-3">Email:<br></br> {user.emailId}</div>
        <div className="py-3 my-7">Member Since: {userdata.createdAt}</div>
        <div>Current Streak: </div>
      </div>

      {/* Right */}
      <div className="w-full flex-col p-4 text-white rounded-2xl">
        {/* Stats */}
        <div className=" bg-gradient-to-l from-gray-900 via-gray-700 to-gray-900 p-4 mb-4 transition-all duration-300 inner-shadow-hover rounded-2xl">
          <h1 className="text-lg font-bold flex items-center text-yellow-400 pl-2 pb-2"><ChartNoAxesCombined/>Your Stats: </h1>
          <div className="p-2 border rounded-2xl">
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

        {/* HEat map */}
        <div className=" bg-gradient-to-l from-gray-900 via-gray-700 to-gray-900 p-4 mb-4 transition-all duration-300 inner-shadow-hover rounded-2xl">
  <div className="border rounded-2xl p-3">
          <Heatmap dailyCounts={dailyCounts}/>
</div>
        </div>

        {/* Submission History */}
        <div className="mt-3 bg-gray-700 rounded-2xl p-3 transition-all duration-300 inner-shadow-hover">
          {/* name */}
          <h1 className="text-2xl font-semibold py-2 ">Recent Submissions</h1>
          <hr></hr>
          <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission._id}>
                <th>{index + 1}</th>
                <NavLink to= {`/problem/${submission.problemId._id}`}>
                <td>{submission.problemId.title}</td>
                </NavLink>
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
