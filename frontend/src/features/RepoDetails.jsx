import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";

const RepoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await axios.get(`http://localhost:7878/repo/${id}`);
        setRepo(res.data.repository);
      } catch (error) {
        console.error("Error fetching repository:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!repo) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Repository not found.</p>
      </div>
    );
  }

  const extendedRepo = {
    name: repo.name,
    description: repo.description,
    owner: repo.owner,
    issues: repo.issues,
    visibility: repo.visibility,
    files: repo.files || [
      { name: "README.md", message: "Initial commit", updated: "6 months ago" },
      {
        name: "public",
        message: "Added project files",
        updated: "6 months ago",
      },
      { name: "src", message: "Refactor & cleanup", updated: "5 months ago" },
      {
        name: "package.json",
        message: "Added dependencies",
        updated: "5 months ago",
      },
    ],
    updatedAt: repo.updatedAt || "6 months ago",
    commits: repo.commits || 10,
    branches: repo.branches || 1,
    releases: repo.releases || 0,
    contributors: repo.contributors || 3,
    languages: repo.languages || [
      { name: "JavaScript", percentage: 80 },
      { name: "CSS", percentage: 20 },
    ],
  };

  const handleToggleVisibility = async () => {
    setUpdating(true);
    try {
      const res = await axios.patch(
        `http://localhost:7878/repo/toggle/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRepo((prev) => ({
        ...prev,
        visibility: res.data.repository.visibility,
      }));
      alert(res.data.message);
    } catch (err) {
      console.error("Error toggling repository visibility:", err);
      alert("Failed to toggle visibility.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteRepo = async () => {
    if (!window.confirm("Are you sure?")) return;
    setUpdating(true);
    try {
      const res = await axios.delete(
        `http://localhost:7878/repo/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message);
      navigate(-1);
    } catch (err) {
      console.error("Error deleting repository:", err);
      alert("Failed to delete repository.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <main className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:space-x-8">
        {/** Left Section */}
        <div className="flex-1">
          {/* Repository Title and Description */}
          <div className="py-4 border-b border-gray-700 mb-4">
            <div className="flex gap-4 items-center">
              <h1 className="text-3xl font-bold mb-2">{extendedRepo.name}</h1>
              <p className="py-1 px-3 rounded-full text-sm bg-gray-700">
                {extendedRepo.visibility ? "Public" : "Private"}
              </p>
            </div>
            <p className="text-gray-300">{extendedRepo.description}</p>
          </div>

          {/* Files / Folders List */}
          <div className="rounded border border-gray-700 mb-4 overflow-hidden">
            <div className="bg-gray-800 py-2 px-4 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {extendedRepo.files.length} files
              </span>
              <span className="text-sm text-gray-400">
                Latest commit {extendedRepo.updatedAt}
              </span>
            </div>
            <table className="w-full">
              <tbody className="divide-y divide-gray-700">
                {extendedRepo.files.map((file, idx) => (
                  <tr key={idx} className="hover:bg-gray-800">
                    <td className="py-2 px-4">
                      <span className="text-blue-400">{file.name}</span>
                    </td>
                    <td className="py-2 px-4 hidden sm:table-cell">
                      <span className="text-gray-400 text-sm">
                        {file.message}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-right text-gray-400 text-sm">
                      {file.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* README Section */}
          <div className="border border-gray-700 rounded p-4">
            <h2 className="text-xl font-semibold mb-2">Add a README</h2>
            <p className="text-gray-300">This is a project</p>
          </div>

          {/* Issues Section (displayed below the README) */}
          <div className="border border-gray-700 rounded p-4 mt-4">
            <h2 className="text-xl font-semibold mb-2">Issues</h2>
            {extendedRepo.issues && extendedRepo.issues.length > 0 ? (
              <ul className="list-disc list-inside">
                {extendedRepo.issues.map((issue, index) => (
                  <li key={index}>{issue.title}</li>
                ))}
              </ul>
            ) : (
              <p>No issues found.</p>
            )}
          </div>
        </div>

        {/** Right Sidebar */}
        <aside className="w-full md:w-64 mt-8 md:mt-0 space-y-4">
          {/* About Section */}
          <div className="border border-gray-700 rounded p-4">
            <h2 className="text-lg font-bold mb-2">About</h2>
            <p className="text-gray-300 mb-2">{extendedRepo.description}</p>
            {extendedRepo.owner && (
              <>
                <p className="text-gray-400 text-sm">
                  <strong>Owner:</strong> {extendedRepo.owner.firstName}{" "}
                  {extendedRepo.owner.lastName}
                </p>
                <p className="text-gray-400 text-sm">
                  <strong>Email:</strong> {extendedRepo.owner.email}
                </p>
              </>
            )}
          </div>

          {/* Releases */}
          <div className="border border-gray-700 rounded p-4">
            <h2 className="text-lg font-bold mb-2">Releases</h2>
            <p className="text-gray-300">{extendedRepo.releases} releases</p>
          </div>

          {/* Packages (dummy placeholder) */}
          <div className="border border-gray-700 rounded p-4">
            <h2 className="text-lg font-bold mb-2">Packages</h2>
            <p className="text-gray-300">No packages published</p>
          </div>

          {/* Languages */}
          <div className="border border-gray-700 rounded p-4">
            <h2 className="text-lg font-bold mb-2">Languages</h2>
            <div className="space-y-1">
              {extendedRepo.languages.map((lang, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between">
                    <span>{lang.name}</span>
                    <span>{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className={`h-2 rounded ${
                        lang.name === "JavaScript"
                          ? "bg-yellow-400"
                          : "bg-blue-400"
                      }`}
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/** Danger Zone Card */}
          <div className="border border-red-800 rounded p-4">
            <h2 className="text-lg font-bold mb-2 text-white">Danger Zone</h2>
            <div className="">
              <button
                onClick={handleToggleVisibility}
                disabled={updating}
                className="w-full text-red-400 hover:bg-red-500 hover:text-white py-2 rounded"
              >
                Change Visibility to{" "}
                <span className="font-semibold">
                  {extendedRepo.visibility ? "Private" : "Public"}
                </span>
              </button>
            </div>
            <div>
              <button
                onClick={handleDeleteRepo}
                disabled={updating}
                className="w-full text-red-400 hover:bg-red-500 hover:text-white py-2 rounded flex items-center gap-4 justify-center"
              >
                <FaRegTrashAlt />
                <span>Delete Repository</span>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default RepoDetails;
