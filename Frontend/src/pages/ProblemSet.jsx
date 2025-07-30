import { useEffect, useState } from "react"
import axiosClient from "../utils/axiosClient"
import { NavLink } from 'react-router';
import AnimateBg from "../components/bg_animation";
import { ThumbsUp,ArrowUpDown,ArrowUp, ArrowDown } from "lucide-react";
import Nav from "../components/nav";


function ProblemSet(){

    const [problems,setProblems] = useState([])
    const [potd,setPotd] = useState(null)
    const [solvedproblems,setSolvedproblems]=useState([])

    const [searchTerm, setSearchTerm] = useState('');
    const [term,setDebouncedSearchTerm] = useState('')

    const [likedproblems,setlikedproblems]=useState([])
    const [filters,setFilters] = useState({
        difficulty:"all",
        status:"all",
        tag:"all",
        likes:"none"
    })


     useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400); // 400ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);


    useEffect(()=>{
      const fetchProblems = async () => {
            try {
                const {data}=await axiosClient.get(`/problem/allproblems`,{
                 
                  params:{ query: term }
                });
                 console.log(data)
                setProblems(data.selected_problem)

                

  
            } catch (error) {
                alert("Error occured: "+error)
            }

        }
        fetchProblems()
    },[term])
    useEffect(()=>{
        
        const fetchSolvedProblems = async () => {
            try {
                const {data}=await axiosClient.get("/problem/user")
                setSolvedproblems(data)
            } catch (error) {
                console.error('error fetching solved problems: '+error)
            }
        }
        const fetchPOTD = async () => {
          try {
              const response = await axiosClient.get('/problem/potd');
              if (response.data) {
                const potd_id = response.data
                setPotd(potd_id)
              } else {
                console.warn("No POTD ID found in response.");
              }
            }         catch (err) {
            console.error("Failed to fetch POTD:", err);
        }
     };
        fetchPOTD()
        
        fetchSolvedProblems()


        const fetchLikedProblems = async () => {
          try {
            const {data} = await axiosClient.get(`/problem/likedproblems`)
            setlikedproblems(data)
          } catch (error) {
            console.error('error fetching solved problems: '+error)
          }
        }
        fetchLikedProblems()
    },[searchTerm])

    
   
    let filterproblems = problems.filter((problem)=>{
        const  difficultyMatch = filters.difficulty === 'all' || problem.difficulty ===filters.difficulty
        const  tagMatch = filters.tag === 'all' || problem.tags.some(tag => tag.toLowerCase().trim() === filters.tag.toLowerCase().trim())
        const  statusMatch = filters.status === 'all' ||(filters.status === 'solved'&& solvedproblems.some(sp=>sp._id === problem._id))|| 
                (filters.status === 'unsolved' && !solvedproblems.some(sp => sp._id === problem._id))||
                (filters.status === 'liked'&& likedproblems.some(sp=>sp._id === problem._id));
        return difficultyMatch&&tagMatch&&statusMatch
    })

    if (filters.likes === 'desc') {
    filterproblems.sort((a, b) => b.likes - a.likes);
} else if (filters.likes === 'asc') {
    filterproblems.sort((a, b) => a.likes - b.likes);
}
    const handleThumbsClick = () => {
  if (filters.likes === 'none') {
    setFilters({...filters,likes:'desc'})
  } else if (filters.likes === 'desc') {
    setFilters({...filters,likes:'asc'})
  } else {
    setFilters({...filters,likes:'none'})
  }
};
    const likedIds = likedproblems.map(p => p._id.toString())

    return(
        <div className="min-h-screen ">
            <AnimateBg/>
            {/* nav bar */}
            <Nav/>
            {/* Main contents */}
            <div className="container mt-8 mx-auto p-4">
                {/* filter */}
                <div className="flex flex-wrap gap-4 mb-1 mt-15">
                    <select
                    className="select select-secondary w-auto hover:shadow-secondary hover:shadow-md"
                    value={filters.status}
                    onChange={(e)=>setFilters({...filters,status:e.target.value})}>
                        <option value='all'>All Problems</option>
                        <option value='solved'>Solved Problems</option>
                        <option value='unsolved'>UnSolved Problems</option>
                        <option value='liked'>Liked Problems</option>
                    </select>

                    <select
                    className="select select-accent w-auto hover:shadow-accent hover:shadow-md"
                    value={filters.difficulty}
                    onChange={(e)=>setFilters({...filters,difficulty:e.target.value})}>
                        <option value='all'>All Difficulties</option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                    
                    <select
                    className="select select-info w-auto hover:shadow-info hover:shadow-md"
                    value={filters.tag}
                    onChange={(e)=>setFilters({...filters,tag:e.target.value})}>
                        <option value='all'>All tags</option>
                        <option value='array'>Array</option>
                        <option value='graph'>Graphs</option>
                        <option value='string'>String</option>
                        <option value='math'>Maths</option>
                        <option value='bitwise'>Bitwise</option>
                        <option value='linkedList'>Linked Lists</option>
                        <option value='dp'>DP</option>
                    </select>
                    <NavLink to={`/problem/${potd}`}>
                 <button className="btn" >Problem of the day</button>
                 </NavLink>
                 
                 <button className="btn">Sheets</button>   
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
  <input type="search" 
  className="grow" 
  placeholder="Search Problems"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}

   />
                </label>
                {/* Problem Lists */}
                <div className="grid gap-4">
          <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="w-1/12">#</th>
              <th className="w-6/12">Title</th>
              <th className="w-2/12">Difficulty</th>
              <th className="w-2/12">Tags</th>
              <th className="w-3/12 cursor-pointer" onClick={handleThumbsClick}>
              <div className="flex justify-center">
              
              {filters.likes === 'none' && (
                <>
                <ThumbsUp width={20} height={20}/>
              <ArrowUpDown width={20} height={20} />
              </>
              )}
              {filters.likes === 'asc' && (
                <>
                 <ThumbsUp width={20} height={20} className="text-red-400"/>
                <ArrowDown width={20} height={20} className="text-red-400" />
               </>
              )}
              {filters.likes === 'desc' && (
                <>
                <ThumbsUp width={20} height={20} className="text-green-400"/>
                <ArrowUp width={20} height={20} className="text-green-400"/>
                </>
              )}
              </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterproblems.map((problem, index) => (
              <tr key={problem._id}>
                <td>{index + 1}</td>
                <td className="font-bold group hover:text-purple-500"><NavLink to={`/problem/${problem._id}`}>
                <span className="before:content-[''] after:content-[''] group-hover:before:content-['<'] group-hover:after:content-['/>']">
                    {problem.title}</span>
                    </NavLink></td>
                <td>
                  <span className={`badge badge-soft ${
                    problem.difficulty === 'easy' 
                      ? 'badge-success' 
                      : problem.difficulty === 'medium' 
                        ? 'badge-warning' 
                        : 'badge-error'
                  }`}>
                   {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                  </span>
                </td>
                <td>
                  {problem.tags.map((tag, idx) => (
    <span key={idx} className="badge badge-outline mr-1">{tag}</span>
  ))}
                 
                    
                  
                </td>
                <td>
                  <span className={`badge py-4 ${likedIds.includes(problem._id.toString()) ? 'badge-success' : ''}`}>
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

export default ProblemSet