import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Landing from "./Pages/Landing";
import SyncGridHome from "./Pages/SyncGridHome";
import Dashboard from "./Pages/Dashboard";
import SyncGridSetup from "./Pages/SyncGridSetUp";
import Codebot from "./Pages/Codebot.jsx";
import Compiler from "./Pages/Compiler.jsx";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { AuthProvider } from "./auth/authContext.jsx";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./Components/NavBar.jsx";
import Logout from "./components/Logout.jsx";
import DeleteAccount from "./auth/DeleteAccount.jsx";
import Repositories from "./Pages/Repositories.jsx";
import RepoDetails from "./features/repositories/RepoDetails.jsx";
import CreateRepository from "./features/repositories/CreateRepository.jsx";
import CreateIssue from "./features/Issues/CreateIssue.jsx";
import IssueDetails from "./features/Issues/IssueDetails.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // <- make sure this is here

function PrivateLayout() {
  return (
    <PrivateRoute>
      <NavBar />
      <Outlet />
    </PrivateRoute>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* ✅ Add ToastContainer here so it works globally */}
        <ToastContainer position="top-center" theme="dark" />
        
        <Routes>
          <Route>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateLayout />}>
            <Route path="/home" element={<SyncGridHome />} />
            <Route path="/codebot" element={<Codebot />} />
            <Route path="/compiler" element={<Compiler />} />
            <Route path="/user/:id" element={<Dashboard />} />
            <Route path="/addSync" element={<SyncGridSetup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/repos" element={<Repositories />} />
            <Route path="/repo/:id" element={<RepoDetails />} />
            <Route path="/repo/:id/issue/new" element={<CreateIssue />} />
            <Route path="/repo/:id/issue/:id" element={<IssueDetails />} />
            <Route path="/repo/new" element={<CreateRepository />} />
            <Route path="/delete_account" element={<DeleteAccount />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
