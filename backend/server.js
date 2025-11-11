import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import rechargeRoutes from "./routes/rechargeRoutes.js";
import betRoutes from "./routes/betRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import openNumberRoutes from "./routes/openNumberRoutes.js";
import cors from "cors";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Connect MongoDB
connectToDb();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://luckynumber-0sd9.onrender.com"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/recharge", rechargeRoutes);
app.use("/api/bet", betRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/open-number", openNumberRoutes);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
