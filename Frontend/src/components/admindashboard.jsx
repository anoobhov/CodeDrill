import { useEffect,useState } from "react"
import axiosClient from "../utils/axiosClient"
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function AdminStats(){

    const [pieData,setPieData] = useState([])
    const [admindata, setAdmindata] = useState(null)
    const COLORS = ['#4CAF50', '#FF9800', '#F44336']
    useEffect(()=>{
        const fetchStats = async () => {
            try {
                const {data} = await axiosClient.get("/admin/userStats")
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
    },[])

    if(!admindata) return <h1>Loding Stats</h1>
    return(
      <>
      <div className="flex p-2">
            Users: {admindata.totalUsers}
            Problems: {(admindata.easyprob)+(admindata.mediumprob)+(admindata.hardprob)}
            Submissions: {admindata.totalSubmissions}
            Joined Since: {admindata.adminSince}
            Problem Created by U: {admindata.admin_problems}
          </div>
        <div className="w-full flex justify-center items-center">
          <h1>Problem Distribution</h1>
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
    </>
    )
}

export default AdminStats