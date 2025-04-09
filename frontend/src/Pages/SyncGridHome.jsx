import axios from "axios";
import { useEffect, useState } from "react";
import { FiClock, FiStar, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SyncGridHome = () => {
  const [userLists, setUserLists] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const FetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:7878/user/getAll");
        setUserLists(res.data.users);
      } catch (e) {
        console.log("Error fetching users:", e);
      }
    };

    FetchAll();
  }, []);
  
  const grids = [
    {
      name: "web-dashboard",
      description: "React dashboard with real-time sync",
      lastUpdated: "2 hours ago",
      stars: 12,
      language: "TypeScript",
    },
    {
      name: "api-service",
      description: "Node.js backend for data processing",
      lastUpdated: "1 day ago",
      stars: 8,
      language: "JavaScript",
    },
    {
      name: "mobile-app",
      description: "React Native cross-platform app",
      lastUpdated: "3 days ago",
      stars: 15,
      language: "JavaScript",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grids Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Grids</h2>
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all">
              New Grid
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grids.map((grid, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-colors"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      <a href="#" className="hover:text-indigo-400">
                        {grid.name}
                      </a>
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900 text-indigo-100">
                      {grid.language}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {grid.description}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <FiStar className="mr-1" /> {grid.stars}
                    </span>
                    <span>Updated {grid.lastUpdated}</span>
                  </div>
                </div>
                <div className="bg-gray-700 px-6 py-3 border-t border-gray-600">
                  <button className="text-sm text-indigo-400 hover:text-indigo-300">
                    Sync Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FiClock className="mr-2 text-indigo-400" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              "You synced changes to web-dashboard",
              "Team member pushed to api-service",
              "New grid mobile-app created",
            ].map((activity, i) => (
              <div
                key={i}
                className="text-gray-400 border-b border-gray-700 pb-3 last:border-0 last:pb-0"
              >
                {activity}
              </div>
            ))}
          </div>
        </div>

        {/* Users List */}
        <br />
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FiUser className="mr-2 text-indigo-400" />
            Users Lists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userLists?.map((user) => (
              <div
                key={user._id}
                className="p-4 rounded-xl bg-gray-700 border border-gray-600 cursor-pointer"
                onClick={()=> navigate(`/user/${user._id}`)}
              >
                <h3 className="text-lg font-semibold">
                  {user.firstName || user.username}
                </h3>
                <p className="text-sm text-gray-300">{user.email}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SyncGridHome;
