import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    roundId: { type: String },
  winningNumber: { type: Number, required: true },
  totalWinners: { type: Number, default: 0 },
  totalAmountDistributed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);
export default Result;
