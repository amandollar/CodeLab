import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiLock,
  FiUsers,
  FiStar,
  FiGitBranch,
  FiClock,
  FiPlus,
  FiSearch,
} from "react-icons/fi";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [repos, setRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !userId) return;
      try {
        const res = await axios.get(
          `http://localhost:7878/user/getProfile/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserDetails(res.data.user);
      } catch (e) {
        console.error("Failed to fetch user:", e);
      }
    };
    fetchUser();
  }, [token, userId]);

  // Fetch user repositories
  useEffect(() => {
    const fetchRepos = async () => {
      if (!token || !userId) return;
      try {
        const res = await axios.get(
          `http://localhost:7878/repo/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRepos(res.data.repositories);
      } catch (e) {
        console.error("Failed to fetch repos:", e);
      }
    };
    fetchRepos();
  }, [token, userId]);

  // Filter repos by search term
  const filteredRepos = repos.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sample activity data
  const activity = [
    { type: "sync", grid: "web-dashboard", time: "2 hours ago" },
    { type: "create", grid: "mobile-app", time: "1 day ago" },
    { type: "star", grid: "api-service", time: "3 days ago" },
  ];

  // Generate heatmap data
  function generateHeatmapData() {
    const months = 6;
    const daysInWeek = 7;
    const weeksInMonth = 4;
    const data = [];
    for (let m = 0; m < months; m++) {
      const month = [];
      for (let w = 0; w < weeksInMonth; w++) {
        const week = [];
        for (let d = 0; d < daysInWeek; d++) {
          week.push(Math.floor(Math.random() * 5));
        }
        month.push(week);
      }
      data.push(month);
    }
    return data;
  }
  const heatmapData = generateHeatmapData();

  const getHeatmapColor = (level) => {
    const colors = [
      "bg-gray-700",
      "bg-indigo-900",
      "bg-indigo-700",
      "bg-indigo-500",
      "bg-indigo-300",
    ];
    return colors[level] || colors[0];
  };

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-400">
          Loading user data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar: Profile + Heatmap */}
          <div className="w-full md:w-1/3 space-y-8">
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="bg-gray-700 p-6 text-center">
                <img
                  src={userDetails.avatar}
                  alt={`${userDetails.firstName} ${userDetails.lastName}`}
                  className="h-24 w-24 rounded-full border-2 border-indigo-500 mx-auto mb-4"
                />
                <h1 className="text-xl font-bold">
                  {userDetails.firstName} {userDetails.lastName}
                </h1>
                <p className="text-gray-400">@{userDetails._id}</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiMail className="text-gray-400 mr-3" />
                    <span className="text-gray-300">{userDetails.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FiLock className="text-gray-400 mr-3" />
                    <span className="text-gray-300">••••••••</span>
                    <button className="ml-auto text-sm text-indigo-400 hover:text-indigo-300">
                      Change
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-700 mt-6 pt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {userDetails.grids}
                    </div>
                    <div className="text-gray-400 text-sm">Grids</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {userDetails.starRepos}
                    </div>
                    <div className="text-gray-400 text-sm">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {userDetails.followedUsers}
                    </div>
                    <div className="text-gray-400 text-sm">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {userDetails.followers}
                    </div>
                    <div className="text-gray-400 text-sm">Followers</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">
                Sync Activity
              </h3>
              <div className="flex items-end justify-between mb-2">
                {monthNames.map((month, i) => (
                  <span key={i} className="text-xs text-gray-500">
                    {month}
                  </span>
                ))}
              </div>
              <div className="grid grid-flow-col grid-rows-7 gap-1">
                {heatmapData.flatMap((month, mi) =>
                  month.flatMap((week, wi) =>
                    week.map((day, di) => (
                      <div
                        key={`${mi}-${wi}-${di}`}
                        className={`w-3 h-3 rounded-sm ${getHeatmapColor(day)}`}
                        title={`${day} syncs on day ${di + 1} of week ${
                          wi + 1
                        }`}
                      />
                    ))
                  )
                )}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">Less</span>
                <div className="flex space-x-1">
                  {[0, 1, 2, 3, 4].map((l) => (
                    <div
                      key={l}
                      className={`w-3 h-3 rounded-sm ${getHeatmapColor(l)}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">More</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
                <FiGitBranch
                  className="mx-auto text-indigo-400 mb-2"
                  size={24}
                />
                <div className="text-xl font-bold">0{repos.length}</div>
                <div className="text-gray-400 text-sm">Active Syncs</div>
              </div>
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
                <FiUsers className="mx-auto text-indigo-400 mb-2" size={24} />
                <div className="text-xl font-bold">08</div>
                <div className="text-gray-400 text-sm">Collaborators</div>
              </div>
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
                <FiStar className="mx-auto text-indigo-400 mb-2" size={24} />
                <div className="text-xl font-bold">00</div>
                <div className="text-gray-400 text-sm">Starred</div>
              </div>
            </div>

            {/* Repositories Section */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <div className="relative">
                  <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search repositories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-900 rounded border border-gray-700 focus:outline-none focus:border-indigo-500 text-gray-100"
                  />
                </div>
                <button
                  onClick={() => navigate(`/repo/new`)}
                  className="flex items-center px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-white"
                >
                  <FiPlus className="mr-1" /> New
                </button>
              </div>
              <div className="divide-y divide-gray-700 overflow-y-auto">
                {filteredRepos.length ? (
                  filteredRepos.map((repo) => (
                    <div
                      key={repo._id}
                      className="px-6 py-4 hover:bg-gray-700 cursor-pointer"
                      onClick={() => navigate(`/repo/${repo._id}`)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center mb-2">
                          <h1 className="font-semibold text-indigo-400 text-xl ">
                            {repo.name}
                          </h1>
                          <p className="py-0.5 px-2 rounded-full text-xs bg-gray-700">
                            {repo.visibility ? "Public" : "Private"}
                          </p>
                        </div>
                        <div className="flex space-x-4 text-gray-400">
                          <div className="flex items-center">
                            <FiStar className="mr-1" /> {repo.stars}
                          </div>
                          <div className="flex items-center">
                            <FiGitBranch className="mr-1" /> {repo.forks}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {repo.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="px-6 py-4 text-gray-500">
                    No repositories found.
                  </p>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="border-b border-gray-700 px-6 py-4">
                <h2 className="text-lg font-bold flex items-center">
                  <FiClock className="mr-2 text-indigo-400" /> Recent Activity
                </h2>
              </div>
              <div className="divide-y divide-gray-700">
                {activity.map((item, idx) => (
                  <div key={idx} className="p-6">
                    <div className="flex items-start">
                      <div
                        className={`p-2 rounded-full mr-4 ${
                          item.type === "sync"
                            ? "bg-indigo-900 text-indigo-400"
                            : item.type === "create"
                            ? "bg-purple-900 text-purple-400"
                            : "bg-yellow-900 text-yellow-400"
                        }`}
                      >
                        {item.type === "sync" ? (
                          <FiGitBranch />
                        ) : item.type === "create" ? (
                          <FiUser />
                        ) : (
                          <FiStar />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {item.type === "sync"
                            ? "Synced changes to"
                            : item.type === "create"
                            ? "Created new grid"
                            : "Starred"}{" "}
                          <span className="text-indigo-400">{item.grid}</span>
                        </p>
                        <p className="text-gray-400 text-sm">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
