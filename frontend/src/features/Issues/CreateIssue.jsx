import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreateIssue = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    ``;
    setError(null);
    setSuccessMsg(null);
    if (!token) return;
    try {
      const response = await axios.post(
        "http://localhost:7878/issue/create",
        {
          title,
          description,
          repository: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMsg(response.data.message || "Issue created successfully!");
      setTitle("");
      setDescription("");
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      console.error("Error creating issue:", err);
      setError(err.response?.data?.message || "Failed to create issue.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Create a New Issue</h2>

        {error && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded">{error}</div>
        )}
        {successMsg && (
          <div className="bg-green-600 text-white p-2 mb-4 rounded">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title your issue clearly"
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white placeholder-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the issue with enough context and details"
              rows="6"
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white placeholder-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 rounded font-medium transition-colors duration-200 ${
              submitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {submitting ? "Creating Issue..." : "Create Issue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIssue;
