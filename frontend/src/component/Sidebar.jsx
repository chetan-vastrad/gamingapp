import { FaUsers, FaReceipt, FaFantasyFlightGames,FaSignOutAlt } from "react-icons/fa";
import { RiNumbersLine } from "react-icons/ri";
import { IoGrid } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import {AuthContext} from  "../context/AuthContext";
import { useContext } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const {logout} =useContext(AuthContext)
const handleLogout = () =>{
  logout();
  localStorage.removeItem("user")
  navigate("/login")
}
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 text-2xl font-bold border-b">Admin Panel</div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
          <IoGrid /> Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/allusers"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
          <FaUsers /> All Users
        </NavLink>

        <NavLink
          to="/dashboard/recharge"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
          <FaReceipt /> All Recharge Request
        </NavLink>

        <NavLink
          to="/dashboard/declared-number"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
          <RiNumbersLine />Open Numbers
        </NavLink>
      </nav>
       <div className="p-4 border-t">
        <button
        onClick={handleLogout}
          className="flex items-center gap-3 w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
