import { Link, useLocation } from 'react-router';
import {Plus,Edit,Trash2, Video,CalendarDays, ArrowUpNarrowWide,LayoutDashboard} from "lucide-react"
const Sidebar = () => {
  const { pathname } = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/admin',icon: ArrowUpNarrowWide },
    { name: 'Create Problem', path: '/admin/create',icon:Plus },
    { name: 'Update Problem', path: '/admin/update' ,icon: Edit },
    { name: 'Delete Problem', path: '/admin/delete',icon: Trash2  },
    { name: 'Create POTD', path: '/admin/potd' ,icon: CalendarDays },
  ];

  return (
    <div className="w-64 bg-base-100 shadow-md border-r p-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-base-content"><LayoutDashboard/>Admin Panel</h2>
      <ul className="space-y-4">
        {menu.map((item) => {
  const Icon = item.icon;
  return (
    <li key={item.path}>
      <Link
        to={item.path}
        className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 ${
          pathname === item.path ? 'bg-blue-500 text-white' : 'text-gray-400'
        }`}
      >
        {Icon && <Icon className="w-5 h-5" />}
        {item.name}
      </Link>
    </li>
  );
})}
      </ul>
    </div>
  );
};

export default Sidebar;
