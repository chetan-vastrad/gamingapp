import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { TbGavel } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";

const Profile = () =>{
  const {logout} = useContext(AuthContext);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Title change 
  useEffect(()=>{
    document.title = "Profile"
  },[])
  const handleLogout  = () =>{
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div>
      <Header
        title={"Profile"}
        leftcomponent={
          <FaArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => window.history.back()}
          />
        }
      />
      <div className="pt-12 max-w-md mx-auto text-white">
        <h4 className="text-xl font-bold mb-4 mr-4 ml-4">User Profile Page</h4>
      </div>
      <div className="pt-12 max-w-md mx-auto">
        <form className="max-w-md mx-auto text-white mr-4 ml-4">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#d6ae51] bg-[rgba(214,174,81,0.2)] text-white"
              placeholder="Enter your username"
              disabled
            />
          </div>
        </form>
      </div>
      <div className="max-w-md mx-auto text-white">
        <h4 className="text-xl font-bold mb-4 mr-4 ml-4">App & Support</h4>
      </div>
    <div className=" max-w-md mx-auto">
        <div className="flex-col gap-4 mb-5 flex p-6 text-center  bg-[rgba(214,174,81,0.5)] rounded-lg mr-4 ml-4">
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-4">
            <IoMdHelpCircleOutline className="text-4xl text-white bg-[#d6ae5194] rounded-lg p-2" />
            <h2 className="text-white text-sm font-bold">Need Help?</h2>
          </div>
          <FaChevronRight className="text-white text-sm  cursor-pointer" />
        </div>
         <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-4">
            <MdOutlineSecurity className="text-4xl text-white bg-[#d6ae5194] rounded-lg p-2" />
            <h2 className="text-white text-sm font-bold">Security</h2>
          </div>
          <FaChevronRight className="text-white text-sm  cursor-pointer" />
        </div>
         <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-4">
            <TbGavel className="text-4xl text-white bg-[#d6ae5194] rounded-lg p-2" />
            <h2 className="text-white text-sm font-bold">Terms of Services</h2>
          </div>
          <FaChevronRight className="text-white text-sm  cursor-pointer" />
        </div>
      </div>
    </div>
     <div  className="max-w-md mx-auto">
       <div className="mr-4 ml-4" onClick={handleLogout}>
        <button className="w-full button-game-color text-white py-2 px-4 rounded-lg transition duration-300 mb-20 max-w-md mx-auto ">
        Logout
      </button>
      </div>
     </div>
      <Footer />
    </div>
  );
}
export default Profile;