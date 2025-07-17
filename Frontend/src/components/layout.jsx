import { Outlet } from 'react-router';
import Sidebar from './sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="bg-base-100 overflow-auto">{children}</div>
      <Outlet/>
    </div>
  );
};

export default Layout;
