import { FiSearch, FiGrid, FiSettings, FiClock, FiStar, FiUser } from 'react-icons/fi';

const SyncGridHome = () => {
  // Sample grid/repo data
  const grids = [
    { 
      name: 'web-dashboard', 
      description: 'React dashboard with real-time sync',
      lastUpdated: '2 hours ago',
      stars: 12,
      language: 'TypeScript'
    },
    { 
      name: 'api-service', 
      description: 'Node.js backend for data processing',
      lastUpdated: '1 day ago',
      stars: 8,
      language: 'JavaScript'
    },
    { 
      name: 'mobile-app', 
      description: 'React Native cross-platform app',
      lastUpdated: '3 days ago',
      stars: 15,
      language: 'JavaScript'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <FiGrid className="h-6 w-6 text-indigo-500" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  SyncGrid
                </span>
              </div>
              <nav className="hidden md:ml-10 md:flex space-x-8">
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Grids
                </a>
                <a href="#" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Activity
                </a>
                <a href="#" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Settings
                </a>
              </nav>
            </div>

            {/* Right side - Search and Profile */}
            <div className="flex items-center">
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
              <div className="ml-4 flex items-center">
                <button className="bg-gray-700 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                  <FiUser className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-colors">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      <a href="#" className="hover:text-indigo-400">{grid.name}</a>
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900 text-indigo-100">
                      {grid.language}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{grid.description}</p>
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

        {/* Recent Activity Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FiClock className="mr-2 text-indigo-400" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              "You synced changes to web-dashboard",
              "Team member pushed to api-service",
              "New grid mobile-app created"
            ].map((activity, i) => (
              <div key={i} className="text-gray-400 border-b border-gray-700 pb-3 last:border-0 last:pb-0">
                {activity}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SyncGridHome;