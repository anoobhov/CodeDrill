import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axiosClient from "../utils/axiosClient"
import { logoutUser } from "../authSlice"
import { NavLink } from 'react-router';
import AnimateBg from "../components/bg_animation";
import { ThumbsUp } from "lucide-react";


function Homepage(){

    const dispatch = useDispatch()
    const {user}=useSelector((state)=>state.auth)
    const [problems,setProblems] = useState([])
    const [potd,setPotd] = useState(null)
    const [solvedproblems,setSolvedproblems]=useState([])
    const [filters,setFilters] = useState({
        difficulty:"all",
        status:"all",
        tag:"all"
    })

    useEffect(()=>{
        const fetchProblems = async () => {
            try {
                // console.log("Hello")
                const {data}=await axiosClient.get('/problem/allproblems')
                setProblems(data)
            } catch (error) {
                alert("Error occured: "+error)
                // console.error("Error fetching problem: "+error)
            }
        }

        const fetchPOTD = async () => {
    try {
      const response = await axiosClient.get('/problem/potd');
      console.log(response)
      if (response.data) {
        // setPotd(response.data.potdID);
        const potd_id = response.data
        setPotd(potd_id)
      } else {
        console.warn("No POTD ID found in response.");
      }
    } catch (err) {
      console.error("Failed to fetch POTD:", err);
    }
  };

  

        const fetchSolvedProblems = async () => {
            try {
                const {data}=await axiosClient.get("/problem/user")
                setSolvedproblems(data)
            } catch (error) {
                console.error('error fetching solved problems: '+error)
            }
        }
        fetchProblems()
        if(user)
            fetchSolvedProblems()
        fetchPOTD();
    },[user])

    const handleLogout = () =>{
        dispatch(logoutUser())
        setSolvedproblems([])
    }

    const filterproblems = problems.filter((problem)=>{
        const  difficultyMatch = filters.difficulty === 'all' || problem.difficulty ===filters.difficulty
        const  tagMatch = filters.difficulty === 'all' || problem.tag ===filters.tag
        const  statusMatch = filters.difficulty === 'all' || solvedproblems.some(sp=>sp._id === problem._id)
        return difficultyMatch&&tagMatch&&statusMatch
    })
    // const difficultyBadgeColor = (difficulty)=>{
    //     switch(difficulty.toLowerCase()){
    //         case 'easy':return 'badge-success'
    //         case 'medium':return 'badge-warning'
    //         case 'hard':return 'badge-error'
    //         default:return 'badge-neutral'
    //     }
    // }
    return(
        <div className="min-h-screen">
            <AnimateBg/>
            {/* nav bar */}
            <nav className="navbar bg-base-100 shadow-lg px-4 fixed top-0 left-0 z-40">
                <div className="flex-1">
                    <NavLink to="/" className="btn btn-ghost text-xl transition-all duration-400 ease-in-out hover:scale-105 hover:tracking-widest">&lt;CodeDrill&gt;</NavLink>
                </div>
                {/* Problem of the day */}

                <div className="flex-1">
                    <NavLink to={`/problem/${potd}`} className="btn btn-ghost text-sm transition-all duration-200 ease-in-out hover:scale-105 hover:tracking-normal">&lt;Problem Of the Day/&gt;</NavLink>
                </div>
                <div className="flex-none gap-4">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="btn btn-ghost transition-all duration-300 ease-in-out hover:scale-105 hover:tracking-wider">
                            {user?.firstName}
                        </div>
                        <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><NavLink>My Profile</NavLink></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                        {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Main contents */}
            <div className="container mx-auto p-4">
                {/* filter */}
                <div className="flex flex-wrap gap-4 mb-1 mt-15">
                    <select
                    className="select select-secondary"
                    value={filters.status}
                    onChange={(e)=>setFilters({...filters,status:e.target.value})}>
                        <option value='all'>All Problems</option>
                        <option value='solved'>Solved Problems</option>
                        <option value='liked'>Liked Problems</option>
                    </select>

                    <select
                    className="select select-accent"
                    value={filters.difficulty}
                    onChange={(e)=>setFilters({...filters,difficulty:e.target.value})}>
                        <option value='all'>All Difficulties</option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                    
                    <select
                    className="select select-info"
                    value={filters.tag}
                    onChange={(e)=>setFilters({...filters,tag:e.target.value})}>
                        <option value='all'>All tags</option>
                        <option value='array'>Array</option>
                        <option value='graph'>Graphs</option>
                        <option value='dp'>DP</option>
                    </select>
                    
                </div>
                {/* Search Bar */}
                <label className="input w-full outline-none border-none mt-2">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" className="grow" placeholder="Search Problems" />
                </label>
                {/* Problem Lists */}
                <div className="grid gap-4">
                    {/* {filterproblems.map((problem,index) => (
            <div key={problem._id} className={`card bg-base-100 shadow-xl`}>
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title">
                    <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
                      {index+1}. {problem.title}
                    </NavLink>
                  </h2>
                  {solvedproblems.some(sp => sp._id === problem._id) && (
                    <div className="badge badge-success gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Solved
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <div className={`badge badge-soft ${difficultyBadgeColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </div>
                  <div className="badge badge-dash badge-info">
                    {problem.tags}
                  </div>
                </div>
              </div>
            </div>
          ))} */}

          <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="w-1/12">#</th>
              <th className="w-6/12">Title</th>
              <th className="w-2/12">Difficulty</th>
              <th className="w-2/12">Tags</th>
              {/* <th className="w-1/12">Starred</th> */}
              <th className="w-3/12"><ThumbsUp width={50} height={20}/></th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={problem._id}>
                <td>{index + 1}</td>
                <td className="font-bold hover:text-primary"><NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
                    {problem.title}
                    </NavLink></td>
                <td>
                  <span className={`badge badge-soft ${
                    problem.difficulty === 'easy' 
                      ? 'badge-success' 
                      : problem.difficulty === 'medium' 
                        ? 'badge-warning' 
                        : 'badge-error'
                  }`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td>
                  <span className="badge  ">
                    {problem.tags}
                  </span>
                </td>
                <td>
                  <span className="badge">
                    {problem.likes}
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
    )
}

export default Homepage