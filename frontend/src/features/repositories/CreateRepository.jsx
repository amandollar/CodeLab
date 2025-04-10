// src/pages/CreateRepository.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const GITIGNORE_TEMPLATES = [
//   "Node",
//   "React",
//   "Java",
//   "Python",
//   "C++",
//   "VisualStudio",
// ];

// const LICENSE_TEMPLATES = [
//   "MIT License",
//   "Apache License 2.0",
//   "GNU GPLv3",
//   "ISC License",
// ];

const CreateRepository = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);
  //   const [initReadme, setInitReadme] = useState(true);
  //   const [gitignore, setGitignore] = useState("");
  //   const [license, setLicense] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Repository name is required.");
      return;
    }
    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        visibility,
        // initReadme,
        // gitignoreTemplate: gitignore || null,
        // licenseTemplate: license || null,
      };
      const res = await axios.post(
        "http://localhost:7878/repo/createRepo",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/repo/${res.data.repository._id}`);
    } catch (e) {
      console.error("Failed to create repo:", e);
      setError(e.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex justify-center items-start py-12">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg border border-gray-700 p-8">
        <h1 className="text-2xl font-bold mb-6">Create a new repository</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-700 text-red-100 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Repo Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Repository name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. my-awesome-repo"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description of your repository"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-indigo-500"
              rows={3}
            />
          </div>

          {/* Visibility */}
          <div>
            <span className="block text-sm font-medium mb-2">Visibility</span>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === true}
                  onChange={() => setVisibility(true)}
                  className="mr-2"
                />
                <span>Public</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === false}
                  onChange={() => setVisibility(false)}
                  className="mr-2"
                />
                <span>Private</span>
              </label>
            </div>
          </div>

          {/* Initialize README */}
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              checked={initReadme}
              onChange={(e) => setInitReadme(e.target.checked)}
              className="mr-2"
            />
            <label>
              Create initial&nbsp;
              <span className="font-medium">README.md</span>
            </label>
          </div> */}

          {/* .gitignore Template */}
          {/* <div>
            <label className="block text-sm font-medium mb-1">
              .gitignore template
            </label>
            <select
              value={gitignore}
              onChange={(e) => setGitignore(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-indigo-500"
            >
              <option value="">None</option>
              {GITIGNORE_TEMPLATES.map((tpl) => (
                <option key={tpl} value={tpl}>
                  {tpl}
                </option>
              ))}
            </select>
          </div> */}

          {/* License Template */}
          {/* <div>
            <label className="block text-sm font-medium mb-1">
              License template
            </label>
            <select
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-indigo-500"
            >
              <option value="">None</option>
              {LICENSE_TEMPLATES.map((tpl) => (
                <option key={tpl} value={tpl}>
                  {tpl}
                </option>
              ))}
            </select>
          </div> */}

          {/* Submit */}
          <div className="pt-4 border-t border-gray-700">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-medium"
            >
              Create repository
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRepository;
