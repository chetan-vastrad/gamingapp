import { useState, useContext, useEffect } from "react";
import Footer from "../../component/Footer";
import Header from "../../component/Header";
import Model from "../../component/Model";
import { placeBet } from "../../api/userApi";
import { AuthContext } from "../../context/AuthContext";
import { getOpenNumberHistory } from "../../api/adminApi";

const ROUND_DURATION = 120; // 2 minutes

const Home = () => {
  const { user } = useContext(AuthContext);
  const [winningNumber, setWinningNumber] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [amount, setAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION);
  const [roundId, setRoundId] = useState("");

  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  // Fetch last declared number on mount
  useEffect(() => {
    const openNumber = async () => {
      try {
        const res = await getOpenNumberHistory();
        console.log(res.history);
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
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

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
    setAmount("");
    setSelectedNumber("");
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
          <span className="text-white text-sm">Result Will Be Declare 8:00pm</span>
          <h2
            className={`text-white text-6xl font-bold mb-2 transition-all duration-500 ${
              winningNumber === null ? "opacity-50" : "opacity-100"
            }`}
          >
            {winningNumber ?? "?"}
          </h2>
          <div className="bg-[#d6ae5194] rounded-lg mr-4 ml-4 p-2">
            <span className="text-white text-sm">NEXT DRAW IN</span>
            <h3 className="text-white text-2xl font-semibold">{formatTime(timeLeft)}</h3>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto text-center mb-20">
        <h3 className="mt-3 text-3xl text-white mb-3">Predict Your Number</h3>
        <ul className="flex flex-wrap justify-center">
          {number.map((num) => (
            <li
              key={num}
              onClick={() => handleClickNumber(num)}
              className="bg-[rgba(214,174,81,0.5)] text-white text-2xl font-bold m-1 p-6 rounded-lg w-20 text-center cursor-pointer hover:bg-[rgba(214,174,81,0.8)]"
            >
              {num}
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
