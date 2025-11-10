import User from "../model/User.js";
import Wallet from "../model/Wallet.js"

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users || users.length === 0){
            return res.status(401).json({message:"User Not Found !"})
        }
         for (let user of users) {
      const wallet = await Wallet.findOne({ userId: user._id });
      user.walletBalance = wallet ? wallet.balance : 0;
    }
        res.status(200).json({message:"Get all Users",users})
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Get Single User
const getUserProfile = async (req, res) => {
    try {
        const {name, phone} = req.body;
        const userId = req.params.id;
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
        const user = await User.findById(userId).select("-password");
        res.status(200).json({ message: "User profile fetched successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
const updateUserProfile = async (req, res) => {
    try {
        const {name , phone} = req.body;
        const userId = req.user._id;
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
        const updatedData = {};
        if(name) updatedData.name = name;
        const updatedUser = await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password");
        res.status(200).json({ message: "User profile updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({message:"User Not Updated", error: error.message})
    }
}
export { getAllUsers, getUserProfile, updateUserProfile };
