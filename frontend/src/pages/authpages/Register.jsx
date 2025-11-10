import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SqureLogo from "../../assets/square.png";
import { FaMobileAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import {createUser} from "../../api/userApi";

const Register = () => {
    useEffect(()=>{
        document.title="Register"
    },[])
    const navigate = useNavigate();
    const [form, setForm] = useState({name:"", phone:"",password:"",confirmpassword:""});

    const handleChnage = (e) =>{
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(form.password !== form.confirmpassword){
            alert("need to chcek password");
            return;
        }
        try {
             const res = await createUser(form);
            console.log("logedIn" , res);
            navigate("/login")
        } catch (error) {
            console.log(error, "In the cathch Block");
            
        }

    }
  return (
    <div>
      <div>
        <img src={SqureLogo} alt="Logo" className="w-100 mx-auto mt-10" />
        <h2 className="text-3xl font-semibold text-center mt-4 text-game-color">
          Create Your Account
        </h2>
        <p className="text-center text-game-color">
          Join the game and start winnig
        </p>
        <form className="max-w-md mx-auto mt-6 p-6" onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label
              className="block text-white text-sm font-bold mb-2 text-game-color"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-7 py-2 border rounded-lg focus:outline-none placeholder:text-white focus:border-[#d6ae51] button-game-color-input text-[#d6ae51]"
              placeholder="Enter your Name"
              value={form.name}
              onChange={handleChnage}
            />
            <FaRegUser className="absolute top-10 left-2 text-white"/>
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-white text-sm font-bold mb-2 text-game-color"
              htmlFor="phone"
            >
              Phone
            </label>
            <FaMobileAlt  className="absolute top-10 left-2 text-white"/>
            <input
              type="number"
              id="number"
              name="phone"
              className="w-full px-7 py-2 border rounded-lg focus:outline-none placeholder:text-white focus:border-[#d6ae51] button-game-color-input text-[#d6ae51]"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChnage}
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-white text-sm font-bold mb-2 text-game-color"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-7 py-2 border rounded-lg focus:outline-none placeholder:text-white focus:border-[#d6ae51] button-game-color-input text-[#d6ae51]"
              placeholder="Create password"
              value={form.password}
              onChange={handleChnage}
            />
            <TbLockPassword className="absolute top-10 left-2 text-white"/>
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-game-color text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmpassword"
              className="w-full px-7 py-2 border rounded-lg focus:outline-none placeholder:text-white focus:border-[#d6ae51] button-game-color-input text-[#d6ae51]"
              placeholder="Confirm your password"
              value={form.confirmpassword}
              onChange={handleChnage}
            />
            <TbLockPassword className="absolute top-10 left-2 text-white"/>
          </div>
          <button
            type="submit"
            className="w-full button-game-color text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4 mb-10">
          <p className="text-white">
           Already have an account? 
           <Link to="/login" className="text-[#d6ae51] font-semibold ">
                Login Here!
           </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
