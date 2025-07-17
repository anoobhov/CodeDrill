import { Link, useLocation } from 'react-router';

const Sidebar = () => {
  const { pathname } = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Create Problem', path: '/admin/create' },
    { name: 'Update Problem', path: '/admin/update' },
    { name: 'Delete Problem', path: '/admin/delete' },
    { name: 'Create POTD', path: '/admin/potd' },
  ];

  return (
    <div className="w-64 bg-base-100 shadow-md border-r p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                pathname === item.path ? 'bg-blue-500 text-white' : 'text-gray-400'
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
