import { useState } from "react";
import { CiWallet } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Menu from "./Menu";
const Header = ({title, leftcomponent}) => {
    const [isMenuOpen,setIsMenuOpen] = useState(false)
  return (
   <div className="mb-10 flex justify-center">
     <div className=" max-w-md mx-auto text-white text-center p-4 border-gray-600 fixed top-0 w-full flex items-center justify-between px-4 bg-[#1c1022]">
      <div>
       {leftcomponent? (leftcomponent): (<GiHamburgerMenu className="text-2xl" onClick={()=>setIsMenuOpen(!isMenuOpen)} />)}
      </div>
      <div>
        <h1 className="text-2xl font-bold text-game-color">{title}</h1>
      </div>
      <div>
        <Link to="/wallet">
         <CiWallet className="text-2xl" />
        </Link>
      </div>
    </div>
  <div
        className={`fixed  w-64  text-white p-4 transform transition-all duration-300 ${
          isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <Menu />
      </div>
   </div>
  );
};

export default Header;
