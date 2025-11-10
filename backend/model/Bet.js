import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  number: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "placed" },
  result: { type: String, default: null },
  // roundId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
    },
    {timestamps:true}
)
const Bet = mongoose.model("Bet", userSchema);
export default Bet;
