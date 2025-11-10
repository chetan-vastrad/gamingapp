import { IoMdArrowRoundBack } from "react-icons/io";
import Swal from "sweetalert2";
import Header from "../../component/Header.jsx";
import Footer from "../../component/Footer.jsx";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext, useEffect, useState } from "react";
import { getUserWallet, createRechargeRequest , getUserRecharges} from "../../api/userApi";
import Model from "../../component/Model.jsx";
import { PiHandDepositBold } from "react-icons/pi";

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(null); // Initial state should be null (since you don't have data yet)
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [depositRequest, setDepositRequest] = useState([])
  const { user } = useContext(AuthContext);
console.log(user._id,"User");

  // Update the document title when the component mounts
  useEffect(() => {
    document.title = "Wallet";
  }, []);

  // Ftech All recharges 
  const getAllRecharges = async () =>{
   try {
    const res = await getUserRecharges(user._id);
    setDepositRequest(res.recharges);
   } catch (error) {
    console.log(error);
    setError(true)
   }finally{
    setLoading(false)
   }
  }
  // Fetch the wallet when Component load
   const fetchWallet = async() =>{
      try {
        const res = await getUserWallet(user._id);
        setWalletBalance(res.wallet.balance)
        setError(false)
      } catch (error) {
        // console.log(error);
        setError(true)
      }finally{
        setLoading(false)
      }
    }
  useEffect(()=>{
    fetchWallet()
    getAllRecharges()
  },[user])

//   Model Handle
  const handleOpenModel = () =>{
    setIsModelOpen(true)
  }
  const handleConfirm = async () =>{
    if(!amount || amount<=10){
      Swal.fire({
      title: "Please Enter Amount More Than ₹10 !",
      icon: "warning",
      timer:1500,
      showConfirmButton: false,
    });
    }
    try {
      const res = await createRechargeRequest(user._id,amount)
      console.log(res);
      Swal.fire({
      title: "Amount Deposited Wait For Conformation",
      icon: "success",
      timer:1500,
      showConfirmButton: false,
    });
    setAmount("")
   setIsModelOpen(false)
    fetchWallet()
    } catch (error) {
      console.log(error);
      
    }
  }
  console.log(depositRequest);
  
  return (
    <div>
      <Header
        title={"Wallet"}
        leftcomponent={
          <FaArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => window.history.back()}
          />
        }
      />
      {loading ? (
        <p className="mt-20 text-green-500 text-center font-bold">Loading...</p>
      ) : error ? (
        <p className="mt-20 text-red-500 text-center">
          Please Chek Your Network Connection...
        </p>
      ) : (
        <div className="pt-10 max-w-md mx-auto">
          <div className="p-6 mb-5 bg-[rgba(214,174,81,0.5)] rounded-lg mr-4 ml-4">
            <span className="text-white text-sm">Current Balance</span>
            <h2 className="text-white text-6xl font-bold mb-2">
              ₹{walletBalance}
            </h2>
          </div>
          <div className="flex test max-w-md justify-between">
            <button
              onClick={() => handleOpenModel()}
              className="flex items-center bg-green-700 text-white p-4 rounded-lg ml-4"
            >
              <FaPlus className="text-2xl mr-2" />
              Deposit
            </button>
            <button className="flex items-center bg-red-700 text-white p-4 rounded-lg mr-4">
              <FaMinus className="text-2xl mr-2" />
              Withdraw
            </button>
          </div>
          <div className="mt-4 max-w-md mx-auto ml-4 mb-20">
            <h3 className="text-white text-2xl font-bold mb-4">
              Recent Activity
            </h3>
            {depositRequest
              .slice()
              .reverse()
              .map((item) => {
                return (
                  <ul
                    key={item._id}
                    className="flex justify-between bg-white p-2 rounded-xl text-xl m-2 items-center"
                  >
                    <li className="flex gap-4 items-center">
                      <PiHandDepositBold className="bg-green-400 text-white rounded-xl p-2 text-4xl" />
                      {item.amount}
                    </li>
                    <li
                      className={`${
                        item.status === "pending"
                          ? "bg-red-500 rounded-xl p-2 text-white capitalize"
                          : item.status === "completed"
                          ? "bg-green-500 text-white p-2 rounded capitalize"
                          : "bg-gray-500"
                      }`}
                    >
                      {item.status}
                    </li>
                    <li>
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </li>
                  </ul>
                );
              })}
          </div>
          {/* This depostis Model */}
          <Model
            isopen={isModelOpen}
            onClose={() => setIsModelOpen(false)}
            title={"Enter Amount To Deposit"}
            onConfirm={handleConfirm}
          >
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[rgba(214,174,81,0.2)] text-white mb-2 focus:outline-none"
              placeholder="Enter Amount"
            />
          </Model>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Wallet;
