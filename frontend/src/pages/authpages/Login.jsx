import { useState, useContext, useEffect } from "react";
import RoundedLogo from "../../assets/rounded.png";
import { loginUser } from "../../api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
    useEffect(()=>{
        document.title="Login"
    },[])
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: "", password: "" });
  const handleChange = (e) =>{
    setForm({...form, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
       const res =  await loginUser(form);
       console.log(res);
       
       if(res.success){
         login(res)
         if(res.user.role === "admin"){
          navigate("/dashboard")
         }else{
          navigate("/")
         }
       }
    } catch (error) {
        console.log(error);  
    }
  }
  return (
    <div>
      <div>
        <img src={RoundedLogo} alt="Logo" className="w-40 h-40 mx-auto mt-10" />
        <h2 className="text-3xl font-semibold text-center mt-4 text-game-color">
          Welcome Back!
        </h2>
        <form className="max-w-md mx-auto mt-6 p-6 " onSubmit={handleSubmit}> 
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2 text-game-color"
              htmlFor="email"
            >
              Phone
            </label>
            <input
              type="number"
              id="number"
              name="phone"
              value={form.phone}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none placeholder:text-white focus:border-[#d6ae51] button-game-color-input text-[#d6ae51]"
              placeholder="Enter your phone number"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-game-color text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none placeholder:text-white focus:border-[#d6ae51] button-game-color-input text-[#d6ae51]"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full button-game-color text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4 mb-10">
          <p className="text-white">
            Don't have an account? <Link to="/register" className="text-[#d6ae51] font-semibold ">
            
              Register Here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
