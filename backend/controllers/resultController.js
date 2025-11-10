import Result from "../model/Result.js";
import Bet from "../model/Bet.js";
import Wallet from "../model/Wallet.js";

const declareResult = async (req, res) => {
  try {
    const { winningNumber, payoutMultiplier = 9 } = req.body;

    if (winningNumber < 0 || winningNumber > 9) {
      return res.status(400).json({ message: "Winning number must be between 0 and 9" });
    }

    // Generate a unique round ID using timestamp
    const roundId = `round_${Date.now()}`;

    // Fetch all placed bets (you can also filter by roundId if your Bet model supports it)
    const allBets = await Bet.find({ status: "placed" });

    if (allBets.length === 0) {
      const result = await Result.create({
        roundId,
        winningNumber,
        totalWinners: 0,
        totalAmountDistributed: 0,
      });
      return res.status(200).json({
        message: `Number ${winningNumber} declared. No bets placed this round.`,
        result,
      });
    }

    let totalDistributed = 0;
    let winnersCount = 0;

    for (const bet of allBets) {
      if (bet.number === winningNumber) {
        bet.status = "won";
        const winAmount = bet.amount * payoutMultiplier;

        const wallet = await Wallet.findOne({ userId: bet.userId });
        if (wallet) {
          wallet.balance += winAmount;
          wallet.transactions.push({
            type: "credit",
            amount: winAmount,
            description: `Won bet on number ${winningNumber}`,
          });
          await wallet.save();
        }

        totalDistributed += winAmount;
        winnersCount++;
      } else {
        bet.status = "lost";
      }

      await bet.save();
    }

    // Store the result for history
    const result = await Result.create({
      roundId,
      winningNumber,
      totalWinners: winnersCount,
      totalAmountDistributed: totalDistributed,
    });

    res.status(200).json({
      message: `✅ Winning number ${winningNumber} declared successfully!`,
      roundId,
      totalWinners: winnersCount,
      totalAmountDistributed: totalDistributed,
      result,
    });
  } catch (error) {
    console.error("Error declaring result:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "All game results fetched successfully",
      count: results.length,
      results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { declareResult, getAllResults };
