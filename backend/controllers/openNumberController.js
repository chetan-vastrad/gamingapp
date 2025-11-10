import OpenNumber from "../model/OpenNumber.js";
import Wallet from "../model/Wallet.js";
import Bet from "../model/Bet.js";

// Round Time
const ROUND_DURATION = 2*60*1000;
let currentRoundId = `round_${Date.now()}`;

const declareOpenNumber = async (req, res) => {
  try {
    const { number } = req.body;
    const roundId = `round_${Date.now()}`;
    const openNumber = await OpenNumber.create({ number, roundId });
    const bets = await Bet.find({ number, status: "placed" });
    let winners = [];
    for (let bet of bets) {
      if (bet.number === number) {
        bet.result = "win";
        // Credit user wallet (2x win, change formula as you wish)
        const wallet = await Wallet.findOne({ userId: bet.userId });
        wallet.balance += bet.betAmount * 2;
        await wallet.save();
        winners.push(bet.userId);
      } else {
        bet.result = "lose";
      }
      await bet.save();
    }
    res
      .status(200)
      .json({ message: "Open number declared", openNumber, winners });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const getOpenNumberHistory = async (req, res) => {
    try {
      const history = await OpenNumber.find()
        .populate("declaredBy", "name email")
        .sort({ declaredAt: -1 });

      res.status(200).json({
        message: "Open number history fetched successfully",
        count: history.length,
        history,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
export { declareOpenNumber, getOpenNumberHistory, };
