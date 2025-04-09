import React from "react";
import {
  FiUser,
  FiX,
  FiSettings,
  FiBook,
  FiGlobe,
  FiPlus,
  FiLogOut,
  FiTrash,
} from "react-icons/fi";
import { FaStar, FaBuilding, FaUserFriends, FaHeart } from "react-icons/fa";
import { BsPeople, BsBoxSeam, BsRobot, BsClipboardCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = ({ visible = false, onClose , userId}) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-neutral-900/50 transition-opacity duration-300 ${
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`h-full w-[320px] bg-gray-800 py-6 px-8 text-white overflow-y-auto absolute right-0 top-0 transform transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex justify-between items-center border-b border-neutral-600 pb-6 mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-4">
            <FiUser
              size="30"
              className="text-white bg-gray-800 p-1.5 rounded-full"
            />
            Rishu Kumar
          </h2>
          <FiX
            size="25"
            className="text-white cursor-pointer"
            onClick={onClose}
          />
        </nav>

        <ul className="space-y-4 text-sm">
          <li>
            <Link
              to={userId ? `/user/${userId}` : "#"}
              onClick={onClose}
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <FiUser /> Your profile
            </Link>
          </li>
          <li>
            <Link
              to="/repositories"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <BsBoxSeam /> Your repositories
            </Link>
          </li>
          <li>
            <Link
              to="/copilot"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <BsRobot /> Your Copilot
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <BsClipboardCheck /> Your projects
            </Link>
          </li>
          <li>
            <Link
              to="/stars"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <FaStar /> Your stars
            </Link>
          </li>
          <li>
            <Link
              to="/organizations"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <FaBuilding /> Your organizations
            </Link>
          </li>
          <li>
            <Link
              to="/enterprises"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <FiGlobe /> Your enterprises
            </Link>
          </li>
          <li>
            <Link
              to="/sponsors"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <FaHeart /> Your sponsors
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <FiSettings /> Settings
            </Link>
          </li>
        </ul>

        <hr className="my-6 border-neutral-600" />

        <ul className="space-y-4 text-sm">
          <li>
            <Link
              to="/addSync"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <FiPlus /> Create new
            </Link>
          </li>
        </ul>

        <hr className="my-6 border-neutral-600" />

        <ul className="space-y-4 text-sm">
          <li>
            <a
              href="https://docs.SyncGrid.com"
              className="flex items-center gap-3 hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiBook /> SyncGrid Docs
            </a>
          </li>
          <li>
            <a
              href="https://support.SyncGrid.com"
              className="flex items-center gap-3 hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsPeople /> SyncGrid Support
            </a>
          </li>
          <li>
            <a
              href="https://SyncGrid.community"
              className="flex items-center gap-3 hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaUserFriends /> SyncGrid Community
            </a>
          </li>
        </ul>

        <hr className="my-6 border-neutral-600" />

        <ul className="space-y-4 text-sm">
          <li>
            <Link
              to="/logout"
              className="flex items-center gap-3 text-red-400 hover:text-red-300 cursor-pointer"
            >
              <FiLogOut /> Sign out
            </Link>
          </li>
          <li>
            <Link
              to="/delete_account"
              className="flex items-center gap-3 text-red-400 hover:text-red-300 cursor-pointer"
            >
              <FiTrash /> Delete account
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
