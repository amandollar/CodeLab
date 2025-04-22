import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { FiSearch, FiGrid, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const [Sidebarvisible, setSidebarVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const openSidebar = () => {
    setSidebarVisible(true);
  };
  useEffect(() => {
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id || decoded._id);
      setUsername(decoded.name || "You");

    } catch (e) {
      console.error("Token decoding failed", e);
    }
  }, [token]);

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <FiGrid className="h-6 w-6 text-indigo-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                SyncGrid
              </span>
            </a>
            <nav className="hidden md:ml-10 md:flex space-x-8">
              <Link
                to="/home"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to={userId ? `/user/${userId}` : "#"}
                className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/repos"
                className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Repositories
              </Link>
              <Link
                to="/codebot"
                className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                SyncBot
              </Link>


              <Link
                to="/compiler"
                className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                SyncPiler
              </Link>
              
            </nav>
          </div>

          {/* Right side - Search and Profile */}
          <div className="flex items-center gap-2">
            <div className="relative mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search grids..."
                className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              className="bg-gray-700 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              onClick={openSidebar}
            >
              <FiUser className="h-6 w-6" />
            </button>
          </div>
          <Sidebar
            visible={Sidebarvisible}
            onClose={() => setSidebarVisible(false)}
            userId={userId}
            name={username}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
