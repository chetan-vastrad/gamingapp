import Bet from "../model/Bet.js";
import Wallet from "../model/Wallet.js";

const placeBet = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { number, amount} = req.body;
        let wallet = await Wallet.findOne({ userId });
        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        wallet.balance -= amount;
        wallet.transactions.push({ type: "debit", amount: amount, description:" Bet Placed"});
        await wallet.save();
        const bet = new Bet({ userId, number, amount, status: "placed" });
        await bet.save();
        res.status(201).json({ message: "Bet placed successfully", bet, wallet });
    } catch (error) {
        res.status(500).json({ message: "Server Error ThisIs test",error:error.message });
    }
}

const getUserBets = async (req, res) => {
    try {
        const {userId} = req.params;
        const bets = await Bet.find({userId});
        if(!bets || bets.length === 0){
            return res.status(404).json({message:"No Bets Found"});
        }
        res.status(200).json({message:"User Bets Fetched", bets});
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}
const getAllBets = async (req, res) => {
    try {
        const bets = await Bet.find().populate("userId","name");
        res.status(200).json({message:"All Bets Fetched", bets});
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}
export { placeBet , getUserBets, getAllBets };