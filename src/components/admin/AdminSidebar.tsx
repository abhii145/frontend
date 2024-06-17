
import { Link, useLocation } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { AppsData, ChartsData, sidebarListData } from "../../constants";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <div className="flex flex-col items-center lg:items-start space-y-2 p-4 lg:space-y-6 lg:w-64 w-16 overflow-auto flex-grow">
        <div className="flex items-center justify-center lg:justify-start p-2 w-full mb-6">
          <FaReact className="text-4xl text-white" />
          <span className="ml-3 lg:ml-2 text-white text-2xl hidden lg:inline">
            Admin Panel
          </span>
        </div>
        {sidebarListData.map(({ url, text, Icon }) => (
          <Link
            key={url}
            to={url}
            className={`flex items-center p-2 rounded-lg w-full ${
              location.pathname === url
                ? "text-green-500"
                : "text-white hover:text-green-500"
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12 lg:w-auto lg:h-auto">
              <Icon className="text-2xl" />
            </div>
            <span className="ml-3 lg:ml-2 hidden lg:inline">{text}</span>
          </Link>
        ))}
        {ChartsData.map(({ url, text, Icon }) => (
          <Link
            key={url}
            to={url}
            className={`flex items-center p-2 rounded-lg w-full ${
              location.pathname === url
                ? "text-green-500"
                : "text-white hover:text-green-500"
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12 lg:w-auto lg:h-auto">
              <Icon className="text-2xl" />
            </div>
            <span className="ml-3 lg:ml-2 hidden lg:inline">{text}</span>
          </Link>
        ))}
        {AppsData.map(({ url, text, Icon }) => (
          <Link
            key={url}
            to={url}
            className={`flex items-center p-2 rounded-lg w-full ${
              location.pathname === url
                ? "text-green-500"
                : "text-white hover:text-green-500"
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12 lg:w-auto lg:h-auto">
              <Icon className="text-2xl" />
            </div>
            <span className="ml-3 lg:ml-2 hidden lg:inline">{text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
