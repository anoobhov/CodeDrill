import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { NavLink } from 'react-router';

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
  const [submissions,setSubmissions] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axiosClient.get("/stats/userstats");
      console.log(data)
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
<nav className="navbar fixed top-6 left-29 bg-gradient-to-r from-black-950 via-purple-950 to-black rounded-3xl p-3 w-[80%]">
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
            <NavLink to={`/dashboard/${user._id}`} className="btn btn-ghost text-xl transition-all duration-400 ease-in-out hover:scale-105 hover:tracking-widest">My Dashboard</NavLink>
        </div>
    </nav>

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
        <div className="mt-3 bg-pink-600">
          {/* name */}
          <h1 className="text-2xl font-semibold">Recent Submissions</h1>
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
                  <span className="badge badge-outline">
                    {new Date(submission.createdAt).toLocaleString("en-IN", {
  year: "numeric",
  month: "long",
  day: "numeric",
})}
                  </span>
                </td>

                <td>
                  <span className="badge badge-outline">
                    {submission.runtime} | {submission.memory}
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
