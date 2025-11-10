import React, { useState, useEffect } from "react";
import Sidebar from "../../component/Sidebar";
import AdminHeader from "../../component/AdminHeader";
import { getAllBets, declareOpenNumber } from "../../api/adminApi";

const OpenNumber = () => {
  const [betNumber, setBetNumber] = useState([]);
  const [opener, setOpener] = useState("");
  const [currentRound, setCurrentRound] = useState({});
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    document.title = "Open Number";
  }, []);

  const allBets = async () => {
    try {
      const res = await getAllBets();
      setBetNumber(res.bets);
      console.log(res.bets);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await declareOpenNumber({ number: opener });
      setOpener("");
      alert(`Open number declared: ${opener}`);
      allBets(); // Refresh bets after declaring
    } catch (error) {
      console.log(error);
    }
  };

  // Load bets on mount
  useEffect(() => {
    allBets();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <AdminHeader title={"Open Numbers"} />
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">
            Current Round: {currentRound?.id || "N/A"}
          </h2>
        </div>

        <div className="mt-3 flex justify-between flex-wrap">
          {numbers.map((num, index) => (
            <div
              className="bg-white shadow-md rounded-lg p-5 w-20 text-center"
              key={index}
            >
              <h2 className="text-2xl border-bt-2 p-2">{num}</h2>
              <h2 className="text-2xl border-t">
                {betNumber.reduce((total, item) => {
                  return item.number === num ? total + item.amount : total;
                }, 0)}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={opener}
              onChange={(e) => setOpener(e.target.value)}
              className="border border-blue-200 rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <br />
            <button
              className="mt-4 bg-green-200 p-3 rounded-xl text-lg hover:bg-green-400"
            >
              Submit Open Number
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OpenNumber;
