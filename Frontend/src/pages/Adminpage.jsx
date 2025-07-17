import {LayoutDashboard} from "lucide-react"
import { NavLink } from "react-router";
import AdminStats from "../components/admindashboard";

function Adminpage()
{
  return(
    <div className="min-h-screen w-full bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className=" mb-12">
          <div className="mb-4">
          <h1 className="flex items-center text-4xl font-bold text-base-content">
            <LayoutDashboard className="bg-red-800 text-white rounded-xl mr-3 p-1" height={50} width={50} />
              Dashboard
            </h1>
  <hr className="my-2 border-base-content" />
</div>
          
          <AdminStats/>
        </div>
      </div>
    </div>
  )
}
export default Adminpage