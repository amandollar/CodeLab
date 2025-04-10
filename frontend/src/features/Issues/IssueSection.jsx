import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IssueSection({ id }) {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get(`http://localhost:7878/issue/all/${id}`);
        setIssues(res.data || []);
      } catch (e) {
        console.error("Failed to fetch issues:", e);
        setIssues([]);
      }
    };

    if (id) fetchIssues();
  }, [id]);

  if (!id) {
    return (
      <div className="text-red-500 p-4 bg-gray-800 rounded">
        Error: Repository ID not provided.
      </div>
    );
  }

  return (
    <div className="border border-gray-700 rounded-lg mt-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-4 border-b border-gray-700 rounded-t-lg">
        <h2 className="text-white text-lg font-semibold">Issues</h2>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(`/repo/${id}/issue/new`)}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            New issue
          </button>
          <span className="text-sm text-gray-400">
            {issues.length} issue{issues.length !== 1 && "s"}
          </span>
        </div>
      </div>

      {/* Issues List */}
      <div className="max-h-80 overflow-y-auto p-4 bg-gray-900 rounded-b-lg">
        {issues.length > 0 ? (
          <ul className="space-y-3">
            {issues.map((issue) => (
              <li
                key={issue._id}
                className="flex items-start space-x-3 hover:bg-gray-800 p-2 rounded cursor-pointer"
                onClick={() => navigate(`/repo/${id}/issue/${issue._id}`)}
              >
                <span className="flex-shrink-0 mt-1">
                  {issue.state === "open" ? (
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9h4v2H8V9z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9h6v2H7V9z" />
                    </svg>
                  )}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white">
                    {issue.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    #{issue.number} opened by {issue.user?.login || "unknown"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No issues found.</p>
        )}
      </div>
    </div>
  );
}
