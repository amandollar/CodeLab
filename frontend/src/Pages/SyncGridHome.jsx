import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiClock, FiPlus, FiStar, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SyncGridHome = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [grids, setGrids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    const fetchGrids = async () => {
      if (!token) {
        console.error("No auth token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;

        const res = await axios.get(
          `http://localhost:7878/repo/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGrids(res.data.repositories || []);
      } catch (err) {
        console.error("Error fetching grids:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrids();
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:7878/user/getAll");
        setUserLists(res.data.users);
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading your grids...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grids Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Grids</h2>
            {grids.length === 0 ? (
              <></>
            ) : (
              <button
                onClick={() => navigate("/repo/new")}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all"
              >
                New Grid
              </button>
            )}
          </div>

          {grids.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grids.map((repo) => (
                <div
                  key={repo._id}
                  className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-colors cursor-pointer"
                  onClick={() => navigate(`/repo/${repo._id}`)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {repo.name}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-100">
                        {repo.visibility ? "Public" : "Private"}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      {repo.description || "No description provided."}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span className="flex items-center">
                        <FiStar className="mr-1" /> {repo.stars ?? 0}
                      </span>
                      <span className="flex items-center">
                        <FiClock className="mr-1" /> {repo.updatedAt || "-"}
                      </span>
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
          ) : (
            <>
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 px-6 py-10 flex flex-col items-center gap-2">
                <h3 className="text-lg font-semibold text-white">
                  Get started by creating your first repository
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Set up your first repository to start building and sharing
                  your code with the world.
                </p>{" "}
                <button
                  onClick={() => navigate(`/repo/new`)}
                  className="flex items-center px-5 py-2.5 border border-gray-700 hover:border-indigo-500 transition-colors cursor-pointer rounded text-white"
                >
                  <FiPlus className="mr-1" /> Create
                </button>
              </div>
            </>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FiClock className="mr-2 text-indigo-400" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              "Updated your profile details",
              "Became a member of SyncGrid",
              "Created a new User profile",
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
            {userLists.map((user) => (
              <div
                key={user._id}
                className="p-4 rounded-xl bg-gray-700 border border-gray-600 cursor-pointer"
                onClick={() => navigate(`/user/${user._id}`)}
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
