import { useState, useContext, useEffect } from "react";
import Footer from "../../component/Footer";
import Header from "../../component/Header";
import Model from "../../component/Model";
import { placeBet } from "../../api/userApi";
import { AuthContext } from "../../context/AuthContext";
import { getOpenNumberHistory } from "../../api/adminApi";
import RoundedLogo from "../../assets/rounded.png";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [winningNumber, setWinningNumber] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [amount, setAmount] = useState("");
  const [selectedCounts, setSelectedCounts] = useState({}); // 👈 new state
  const [currentTime, setCurrentTime] = useState(new Date());


  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  // Fetch last declared number on mount
  useEffect(() => {
    const openNumber = async () => {
      try {
        const res = await getOpenNumberHistory();
        const latest = res.history[0];
        setWinningNumber(latest?.number);
      } catch (error) {
        console.log(error);
      }
    };
    openNumber();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Place Bet
  const bet = async () => {
    if (amount > user.walletBalance) {
      return alert("Please check your balance");
    }
    try {
      const res = await placeBet(user._id, selectedNumber, amount);
      console.log("Bet placed:", res);
    } catch (error) {
      console.log("Error placing bet:", error);
    }
  };

  const handleConfirm = () => {
    bet();

    // 👇 increment the count for the selected number
    setSelectedCounts((prev) => ({
      ...prev,
      [selectedNumber]: (prev[selectedNumber] || 0) + 1,
    }));

    setAmount("");
    setSelectedNumber(null);
    setIsModelOpen(false);
  };

  const handleClickNumber = (num) => {
    setSelectedNumber(num);
    setIsModelOpen(true);
  };

  return (
    <div>
      <Header title={"Lucky Number"} />

      <div className="pt-12 max-w-md mx-auto">
  <div className="p-6 text-center bg-[rgba(214,174,81,0.5)] rounded-lg mr-4 ml-4">
    <span className="text-white text-sm">Result Will Be Declare 8:00pm</span><br/>
    {/* <img src={RoundedLogo} alt="Logo" className="w-40 h-40 mx-auto mt-10 rotate-logo" /> */}
    <h2
  className={`text-white text-6xl font-bold mb-2 transition-all duration-500 bg-image ${
    winningNumber === null ? "opacity-50" : "opacity-100"
  }`}
>
  {winningNumber ?? "?"}
</h2>


    {/* 🕒 Live Time Display */}
    <p className="text-white text-lg mb-2">
      Current Time: {currentTime.toLocaleTimeString()}
    </p>

    <div className="bg-[#d6ae5194] rounded-lg mr-4 ml-4 p-2">
      <span className="text-white text-sm">Please Play Now</span>
    </div>
  </div>
</div>


      {/* Number Grid */}
      <div className="max-w-md mx-auto text-center mb-20">
        <h3 className="mt-3 text-3xl text-white mb-3">Predict Your Number</h3>
        <ul className="flex flex-wrap justify-center">
          {number.map((num) => (
            <li
              key={num}
              onClick={() => handleClickNumber(num)}
              className={`relative text-white text-2xl font-bold m-1 p-6 rounded-lg w-20 text-center cursor-pointer transition-all duration-300 
                ${
                  selectedCounts[num]
                    ? "bg-[#d6ae51] ring-2 ring-white scale-105"
                    : "bg-[rgba(214,174,81,0.5)] hover:bg-[rgba(214,174,81,0.8)]"
                }`}
            >
              {num}
             {selectedCounts[num] && (
  <span className="absolute -top-2 -right-2 text-lg font-extrabold text-black bg-yellow-400 border-2 border-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
    {selectedCounts[num]}
  </span>
)}

            </li>
          ))}
        </ul>
      </div>

      {/* Model */}
      <Model
        isopen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        title={"Your Predicted Number"}
        predictedNumber={selectedNumber}
        onConfirm={handleConfirm}
      >
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[rgba(214,174,81,0.2)] text-white mb-2 focus:outline-none"
          placeholder="Enter Amount"
        />
        {amount && (
          <p className="text-center">
            You Will Get{" "}
            <span className="text-2xl font-bold text-[#dda218]">{`${amount * 9}`}</span>
          </p>
        )}
      </Model>

      <Footer />
    </div>
  );
};

export default Home;
