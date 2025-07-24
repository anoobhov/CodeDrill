import { useEffect,useState } from "react"
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient"
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function AdminStats(){

    const [pieData,setPieData] = useState([])
    const [admindata, setAdmindata] = useState(null)
    const COLORS = ['#4CAF50', '#FF9800', '#F44336']
    const {user} = useSelector((state)=>state.auth)
    useEffect(()=>{
        const fetchStats = async () => {
            try {
                const {data} = await axiosClient.get("/stats/adminstats")
                const {easyprob,mediumprob,hardprob,totalSubmissions,adminSince,admin_problems,totalUsers} = data
                setAdmindata({totalUsers,totalSubmissions,adminSince,admin_problems,easyprob,mediumprob,hardprob})
                setPieData([
                    {name:"Easy",value:easyprob},
                    {name:"Medium",value:mediumprob},
                    {name:"Hard",value:hardprob},
                ])

            } catch (error) {
                console.error("Error fetching stats: ",error.message)
            }
        }
        fetchStats()
    },[user])

    if(!admindata) return <h1>Loding Stats</h1>
    return(
      <div className="flex flex-col p-4">
    {/* Admin Profile */}
      
        <div className="bg-purple-500 rounded-2xl p-4 shadow-sm ">
          <div className="p-3 ">
      <span className="font-medium">Admin Name:</span> {user.firstName}
    </div>
            <div className="p-3 ">
      <span className="font-medium">Joined Since:</span> {admindata.adminSince}
    </div>

    <div className="p-3">
      <span className="font-medium">Problems Created by You:</span> {admindata.admin_problems}
    </div>
        </div>
      
      <div className="bg-white shadow-md rounded-2xl p-4   mt-4">
  <h2 className="text-xl font-semibold mb-3 text-gray-800">Admin Dashboard Summary</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
    <div className="bg-gray-400 p-3 rounded-lg shadow-sm">
      <span className="font-medium">Total Users:</span> {admindata.totalUsers}
    </div>
    <div className="bg-gray-400 p-3 rounded-lg shadow-sm">
      <span className="font-medium">Total Problems:</span> {admindata.easyprob + admindata.mediumprob + admindata.hardprob}
    </div>
    <div className="bg-gray-400 p-3 rounded-lg shadow-sm">
      <span className="font-medium">Total Submissions:</span> {admindata.totalSubmissions}
    </div>
    
  </div>
</div>
        <div className="w-full flex flex-col rounded-2xl p-4 mt-4 bg-blue-700">
          <h1 className="text-xl font-semibold mb-3">Problem Distribution</h1>
      <PieChart width={500} height={300}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
        <text
        x={250} y={150} // center of 350x300
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: '16px', fontWeight: 'bold',fill:"white"}}
  >
    {pieData.reduce((acc, cur) => acc + cur.value, 0)} Problems
  </text>
      </PieChart>
    </div>
    </div>
    )
}

export default AdminStats