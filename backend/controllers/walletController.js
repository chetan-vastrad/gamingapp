import Wallet from "../model/Wallet.js";

// Wallet getting
const getWallet = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const wallet = await Wallet.findOne({ userId });
    return res.status(200).json({ wallet });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// Credit and Debit
const addTransaction = async (req, res) => {
  try {
    const { amount, discription, userId, type } = req.body;
    console.log(amount);
    let wallet = await Wallet.findOne({ userId });
    // if wallet not exist create new wallet
    if (!wallet) {
      wallet = new Wallet({ userId, balance: 0, transactions: [] });
    }
    if (type === "credit") {
      wallet.balance += amount;
    }
    // if debit check for sufficient balance
    else if (type === "debit") {
      if (wallet.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
    }
    wallet.transactions.push({ type, amount: amount, description: discription });
    await wallet.save();
    return res.status(200).json({ message: "Transacetion Added", wallet });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
export { getWallet, addTransaction };
