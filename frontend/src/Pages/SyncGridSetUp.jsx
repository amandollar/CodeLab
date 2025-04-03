import { FiCopy, FiTerminal, FiUpload, FiFile, FiDownload } from 'react-icons/fi';

const SyncGridSetup = () => {
  const repoUrl = "https://syncgrid.com/yourusername/example-grid.git";
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Would add toast notification in real app
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Quick setup</h1>
          <p className="text-gray-400">
            Get started with your new grid — if you've done this kind of thing before
          </p>
        </div>

        {/* Setup Options */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button className="px-4 py-3 text-sm font-medium border-b-2 border-indigo-500 text-white">
              Sync Methods
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                <h3 className="font-medium mb-3 flex items-center">
                  <FiDownload className="mr-2 text-indigo-400" />
                  Set up in Desktop
                </h3>
                <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">
                  Download SyncGrid Desktop
                </button>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                <h3 className="font-medium mb-3">Sync Protocol</h3>
                <div className="flex space-x-2 mb-3">
                  <button className="px-3 py-1 bg-indigo-900 text-indigo-100 rounded-md text-sm">
                    HTTPS
                  </button>
                  <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm hover:bg-gray-600">
                    SSH
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={repoUrl}
                    readOnly
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 pl-3 pr-10 text-sm"
                  />
                  <button 
                    onClick={() => copyToClipboard(repoUrl)}
                    className="absolute right-2 top-2 text-gray-400 hover:text-white"
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-gray-300 mb-3">
                  Get started by creating a new file or uploading an existing file. 
                  We recommend every grid include a <span className="font-mono text-indigo-300">README</span>, 
                  <span className="font-mono text-indigo-300"> LICENSE</span>, and 
                  <span className="font-mono text-indigo-300"> .syncignore</span>.
                </p>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm font-medium hover:bg-gray-600 flex items-center">
                    <FiFile className="mr-2" /> New file
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm font-medium hover:bg-gray-600 flex items-center">
                    <FiUpload className="mr-2" /> Upload files
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-medium mb-3 flex items-center">
                  <FiTerminal className="mr-2 text-indigo-400" />
                  ...or create a new grid from the command line
                </h3>
                <div className="bg-gray-900 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <div className="mb-2">
                    <span className="text-purple-400">echo</span> <span className="text-green-400">"# Example-Grid"</span> <span className="text-purple-400"></span> README.md
                  </div>
                  <div className="mb-2">
                    <span className="text-purple-400">syncgrid</span> init
                  </div>
                  <div className="mb-2">
                    <span className="text-purple-400">syncgrid</span> add README.md
                  </div>
                  <div className="mb-2">
                    <span className="text-purple-400">syncgrid</span> commit <span className="text-yellow-400">-m</span> <span className="text-green-400">"first sync"</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-purple-400">syncgrid</span> branch <span className="text-yellow-400">-M</span> main
                  </div>
                  <div className="mb-2">
                    <span className="text-purple-400">syncgrid</span> remote add origin {repoUrl}
                  </div>
                  <div>
                    <span className="text-purple-400">syncgrid</span> push <span className="text-yellow-400">-u</span> origin main
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-medium mb-3 flex items-center">
                  <FiTerminal className="mr-2 text-indigo-400" />
                  ...or sync an existing grid from the command line
                </h3>
                <div className="bg-gray-900 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <div className="mb-2">
                    <span className="text-purple-400">syncgrid</span> remote add origin {repoUrl}
                  </div>
                  <div className="mb-2">
                    <span className="text-purple-400">syncgrid</span> branch <span className="text-yellow-400">-M</span> main
                  </div>
                  <div>
                    <span className="text-purple-400">syncgrid</span> push <span className="text-yellow-400">-u</span> origin main
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncGridSetup;