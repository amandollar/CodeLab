import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Repositories = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get(`http://localhost:7878/repo/all`);
        setRepos(res.data.repositories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Repositories</h2>

        {repos.length === 0 ? (
          <p>Loading repositories...</p>
        ) : (
          <div className="space-y-4">
            {repos.map((repo) => (
              <div
                key={repo._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md nb"
              >
                <Link to={`/repo/${repo._id}`} >
                  <h3 className="text-xl font-semibold">{repo.name}</h3>
                  <p className="text-gray-400">{repo.description}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    <p>
                      <strong>Owner:</strong> {repo.owner?.firstName}{" "}
                      {repo.owner?.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {repo.owner?.email}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Repositories;
