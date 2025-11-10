import Recharge from "../model/Recharge.js";
import Wallet from "../model/Wallet.js";

// get single user recharge requests
const getUserRecharge = async (req, res) => {
    try {
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
        const recharges = await Recharge.find({userId})
        res.status(200).json({ message: "User recharges fetched", recharges });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}
// Create Recharge Request
const createRechargeRequest = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        if(!userId || !amount){
            return res.status(400).json({message:"User ID and Amount are required"});
        }
        const recharge = new Recharge({ userId, amount });
        await recharge.save();
        res.status(201).json({ message: "Recharge request created", recharge });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Get All Recharge Requests by User
const getAllRecharge = async (req, res) => {
    try {
        const recharges = await Recharge.find().populate("userId","name");
        res.status(200).json({ message: "User recharges fetched", recharges });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });   
    }
}

// admin approve or reject recharge
const updateRechargeStatus = async (req, res) => {
    try {
        const {rechargeId} = req.params;
        console.log(rechargeId);
        const {status} = req.body;
        if(!rechargeId || !status){
            return res.status(400).json({message:"Recharge ID and Status are required"});
        }
        const recharge = await Recharge.findById(rechargeId);
        if(!recharge){
            return res.status(404).json({message:"Recharge Request not found"});
        }
        recharge.status = status;
        recharge.updatedAt = new Date();
        await recharge.save();

        // if recharge is approved credit the amount to user's wallet
        if(status === "completed"){
            let wallet = await Wallet.findOne({ userId: recharge.userId });
            if(!wallet){
                wallet = new Wallet({ userId: recharge.userId, balance: 0, transactions: [] });
            }
            wallet.balance += recharge.amount;
            wallet.transactions.push({ type: "credit", amount: recharge.amount, description: "Recharge Approved" });
            await wallet.save();
            return res.status(200).json({success:"ok", message: "Recharge approved and wallet updated", recharge, wallet });
        }
    } catch (error) {
        return res.status(500).json({ message: "Serve12r Error", error: error.message });
    }
}
export { createRechargeRequest, getAllRecharge, updateRechargeStatus,getUserRecharge };