import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Wallet from "../model/Wallet.js";
// Register User
const registerUser = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;
    console.log(phone);
    // Check User Is Alredy Exist
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: " User is Alredy Exist !" });
    }
    // Hash The Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Creat User
    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      role,
    });
    await Wallet.create({
      userId: user._id,
      balance: 0,
      transactions: [],
    });
    // Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
    return res
      .status(200)
      .json({ message: " User is Created Sucefully !", token });
  } catch (error) {
    return res
      .status(401)
      .json({ message: " User Not Created !", error: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const userExist = await User.findOne({ phone });
    // Check the user
    if (!userExist) {
      return res
        .status(401)
        .json({ message: "User Does Not Exist Please Register !" });
    }
    // Check Password
    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email And Password !" });
    }

    // Generate Token
    const token = jwt.sign(
      { id: userExist._id, role: userExist.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
    
    let wallet = await Wallet.findOne({ userId: userExist._id });
    if (!wallet) {
      return res.status(200).json({
        message: "Wallet created",
        token,
        user: {
          _id: userExist._id,
          name: userExist.name,
          phone: userExist.phone,
          walletBalance: 0,
          wallet: { balance: 0, transactions: [] },
        },
      });
    }
    res
      .status(200)
      .json({
        success:true,
        message: "User Loged in !",
        token,
        user: {
          _id: userExist._id,
          name: userExist.name,
          phone: userExist.phone,
          role: userExist.role,
          walletBalance: wallet.balance,
          wallet: wallet,
        },
      });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export { registerUser, loginUser };
