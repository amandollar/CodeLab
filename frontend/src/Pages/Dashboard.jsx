import { FiSearch, FiUser, FiMail, FiLock, FiUsers, FiStar, FiGitBranch, FiClock } from 'react-icons/fi';

const Dashboard = () => {
  // Sample user data
  const user = {
    name: "Alex Johnson",
    username: "alexjohnson",
    email: "alex@example.com",
    avatar: "https://marketplace.canva.com/EAFewoMXU-4/1/0/1600w/canva-purple-pink-gradient-man-3d-avatar-0o0qE2T_kr8.jpg",
    bio: "Full-stack developer building awesome things with SyncGrid",
    following: 24,
    followers: 18,
    grids: 12,
    stars: 47
  };

  // Sample activity
  const activity = [
    { type: "sync", grid: "web-dashboard", time: "2 hours ago" },
    { type: "create", grid: "mobile-app", time: "1 day ago" },
    { type: "star", grid: "api-service", time: "3 days ago" }
  ];

  // Heatmap data - last 6 months of activity
  const heatmapData = generateHeatmapData();

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
          // Random activity level (0-4)
          week.push(Math.floor(Math.random() * 5));
        }
        month.push(week);
      }
      data.push(month);
    }
    return data;
  }

  const getHeatmapColor = (level) => {
    const colors = [
      'bg-gray-700', 
      'bg-indigo-900', 
      'bg-indigo-700', 
      'bg-indigo-500', 
      'bg-indigo-300'
    ];
    return colors[level] || colors[0];
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <FiGitBranch className="h-6 w-6 text-indigo-500" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  SyncGrid
                </span>
              </div>
              <nav className="hidden md:ml-10 md:flex space-x-8">
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Overview
                </a>
                <a href="#" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Grids
                </a>
                <a href="#" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Activity
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <div className="relative mx-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search SyncGrid..."
                  className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="w-full md:w-1/3">
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gray-700 p-6 text-center">
                <div className="flex justify-center mb-4">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-24 w-24 rounded-full border-2 border-indigo-500"
                  />
                </div>
                <h1 className="text-xl font-bold">{user.name}</h1>
                <p className="text-gray-400">@{user.username}</p>
                <p className="text-gray-300 mt-2">{user.bio}</p>
              </div>

              {/* Profile Details */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiMail className="text-gray-400 mr-3" />
                    <span className="text-gray-300">{user.email}</span>
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
                    <div className="text-2xl font-bold">{user.grids}</div>
                    <div className="text-gray-400 text-sm">Grids</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.stars}</div>
                    <div className="text-gray-400 text-sm">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.following}</div>
                    <div className="text-gray-400 text-sm">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.followers}</div>
                    <div className="text-gray-400 text-sm">Followers</div>
                  </div>
                </div>

                {/* Heatmap Section */}
                <div className="border-t border-gray-700 mt-6 pt-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">Sync Activity</h3>
                  <div className="flex items-end justify-between mb-2">
                    {monthNames.map((month, i) => (
                      <span key={i} className="text-xs text-gray-500">{month}</span>
                    ))}
                  </div>
                  <div className="grid grid-flow-col grid-rows-7 gap-1">
                    {heatmapData.flatMap((month, monthIndex) => 
                      month.flatMap((week, weekIndex) => 
                        week.map((day, dayIndex) => (
                          <div 
                            key={`${monthIndex}-${weekIndex}-${dayIndex}`}
                            className={`w-3 h-3 rounded-sm ${getHeatmapColor(day)}`}
                            title={`${day} syncs on day ${dayIndex + 1} of week ${weekIndex + 1}`}
                          />
                        ))
                      )
                    )}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">Less</span>
                    <div className="flex space-x-1">
                      {[0, 1, 2, 3, 4].map((level) => (
                        <div 
                          key={level}
                          className={`w-3 h-3 rounded-sm ${getHeatmapColor(level)}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Activity */}
          <div className="w-full md:w-2/3">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
                <div className="text-indigo-400 flex justify-center mb-2">
                  <FiGitBranch className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold">12</div>
                <div className="text-gray-400 text-sm">Active Syncs</div>
              </div>
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
                <div className="text-indigo-400 flex justify-center mb-2">
                  <FiUsers className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold">8</div>
                <div className="text-gray-400 text-sm">Collaborators</div>
              </div>
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
                <div className="text-indigo-400 flex justify-center mb-2">
                  <FiStar className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold">24</div>
                <div className="text-gray-400 text-sm">Starred</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="border-b border-gray-700 px-6 py-4">
                <h2 className="text-lg font-bold flex items-center">
                  <FiClock className="mr-2 text-indigo-400" />
                  Recent Activity
                </h2>
              </div>
              <div className="divide-y divide-gray-700">
                {activity.map((item, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mr-4 ${
                        item.type === 'sync' ? 'bg-indigo-900 text-indigo-400' : 
                        item.type === 'create' ? 'bg-purple-900 text-purple-400' : 
                        'bg-yellow-900 text-yellow-400'
                      }`}>
                        {item.type === 'sync' ? <FiGitBranch /> : 
                         item.type === 'create' ? <FiUser /> : <FiStar />}
                      </div>
                      <div>
                        <p className="font-medium">
                          {item.type === 'sync' ? 'Synced changes to' : 
                           item.type === 'create' ? 'Created new grid' : 
                           'Starred'} <span className="text-indigo-400">{item.grid}</span>
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