import mongoose from "mongoose";

const openNumberSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true, min: 0, max: 9 },
    declaredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // adminId
    declaredAt: { type: Date, default: Date.now },
    roundId: { type: String, required: true, unique: true }, // You can use date/time-based round ID
  },
  { timestamps: true }
);

const OpenNumber = mongoose.model("OpenNumber", openNumberSchema);
export default OpenNumber;