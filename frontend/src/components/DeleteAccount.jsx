import { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id || decoded._id);
    } catch (e) {
      console.error("Token decoding failed", e);
    }
  }, [token]);

  const handleDelete = () => {
    if (!token || !userId) return;
    try {
      const res = Axios.delete(`http://localhost:7878/user/deleteProfile/${userId}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    alert("Your account has been deleted.");
    navigate("/");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 ">Delete Account</h2>
        <p className="mb-6 text-gray-300">
          This action cannot be undone. Are you sure you want to delete your
          account?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
