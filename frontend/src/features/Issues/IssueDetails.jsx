import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  GitBranch,
  Hash,
  Tag,
  Clock,
  User,
  GitMerge,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`http://localhost:7878/issue/${id}`);
        setIssue(res.data.issue[0]);
      } catch (err) {
        console.error("Failed to fetch issue:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  const deleteIssue = async () => {
    try {
      const res = await axios.delete(`http://localhost:7878/issue/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res)
    } catch (err) {
      console.error("Failed to fetch issue:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 text-gray-300">
        <Loader2 className="animate-spin mr-2" />
        Loading issue...
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="flex justify-center items-center mt-20 text-red-500">
        <AlertCircle className="mr-2" />
        Issue not found or an error occurred.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="pt-8">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-300 hover:text-gray-100"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl sm:text-2xl font-semibold flex items-center text-gray-100">
              <span className="mr-2">#{issue._id.slice(-4)}</span>
              {issue.title}
              <span
                className={`ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  issue.status === "open"
                    ? "bg-green-700 text-green-200"
                    : "bg-red-700 text-red-200"
                }`}
              >
                {issue.status}
              </span>
            </h1>
          </div>
          <button
            className="hidden sm:inline text-sm font-medium text-red-400 hover:text-red-500"
            onClick={deleteIssue}
          >
            Delete issue
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap gap-6">
        {/* Main Content */}
        <main className="w-full lg:flex-1 bg-gray-800 border border-gray-700 rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <div className="text-gray-300 whitespace-pre-wrap">
            {issue.description?.trim() || "_No description provided._"}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 space-y-6">
          {/* About Box */}
          <div className="bg-gray-800 border border-gray-700 rounded-md p-4 space-y-3">
            <h2 className="text-sm font-semibold text-gray-400 uppercase">
              About
            </h2>
            <div className="flex items-center text-sm text-gray-300">
              <User className="mr-2" size={16} />
              <span>Author:</span>
              <span className="ml-auto">{issue.user?.login || "Unknown"}</span>
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <Clock className="mr-2" size={16} />
              <span>Created:</span>
              <span className="ml-auto">
                {issue.created_at
                  ? new Date(issue.created_at).toLocaleString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <GitBranch className="mr-2" size={16} />
              <span>Repository:</span>
              <Link
                to={`/repo/${issue.repository}`}
                className="ml-auto text-blue-400 hover:underline text-right truncate max-w-[60%]"
              >
                {issue.repository}
              </Link>
            </div>
            <div className="flex items-start text-sm text-gray-300">
              <Tag className="mr-2 mt-1" size={16} />
              <span>Labels:</span>
              <div className="ml-auto flex flex-wrap gap-1">
                {/* Placeholder */}
                <span className="bg-gray-700 text-gray-200 text-xs px-2 py-0.5 rounded">
                  bug
                </span>
              </div>
            </div>
          </div>

          {/* Other Info Box */}
          <div className="bg-gray-800 border border-gray-700 rounded-md p-4 space-y-2">
            <h2 className="text-sm font-semibold text-gray-400 uppercase">
              Other Info
            </h2>
            <div className="flex items-center text-sm text-gray-300">
              <Hash className="mr-2" size={16} />
              <span>Version:</span>
              <span className="ml-auto">{issue.__v}</span>
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <GitMerge className="mr-2" size={16} />
              <span>Linked PRs:</span>
              <span className="ml-auto text-gray-500">—</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
