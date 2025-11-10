import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        type: { type: String, enum: ['credit', 'debit'], required: true },
        amount: { type: Number, required: true },
        description: { type: String },
        date: { type: Date, default: Date.now },
    }
)
const WllaetSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        balance: { type: Number, default: 0 },
        transactions: [transactionSchema],
    }
)
const Wallet = mongoose.model("Wallet", WllaetSchema);
export default Wallet;