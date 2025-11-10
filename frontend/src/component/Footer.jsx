import { IoHomeOutline } from "react-icons/io5";
import { CiWallet } from "react-icons/ci";
import { FaHistory, FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation(); // get current path

  // helper function to check if route is active
  const isActive = (path) => location.pathname === path;

  const activeClass = "text-[#d6ae51]"; // color for active
  const inactiveClass = "text-white";   // color for inactive

  return (
    <div className="text-center p-4 z-10 border-t border-gray-600 fixed bottom-0 w-full rounded-t-lg bg-[#1c1022]">
      <div className="flex justify-between max-w-md mx-auto">
        
        <Link to="/">
          <div className="flex flex-col items-center">
            <IoHomeOutline className={`text-2xl ${isActive("/") ? activeClass : inactiveClass}`} />
            <span className={`text-sm mt-1 ${isActive("/") ? activeClass : inactiveClass}`}>Home</span>
          </div>
        </Link>

        <Link to="/wallet">
          <div className="flex flex-col items-center">
            <CiWallet className={`text-2xl ${isActive("/wallet") ? activeClass : inactiveClass}`} />
            <span className={`text-sm mt-1 ${isActive("/wallet") ? activeClass : inactiveClass}`}>Wallet</span>
          </div>
        </Link>

        <Link to="/history">
          <div className="flex flex-col items-center">
            <FaHistory className={`text-2xl ${isActive("/history") ? activeClass : inactiveClass}`} />
            <span className={`text-sm mt-1 ${isActive("/history") ? activeClass : inactiveClass}`}>History</span>
          </div>
        </Link>

        <Link to="/profile">
          <div className="flex flex-col items-center">
            <FaRegUser className={`text-2xl ${isActive("/profile") ? activeClass : inactiveClass}`} />
            <span className={`text-sm mt-1 ${isActive("/profile") ? activeClass : inactiveClass}`}>Profile</span>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Footer;
