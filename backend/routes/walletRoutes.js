import express from "express";
import { getWallet, addTransaction } from "../controllers/walletController.js";

const router = express.Router();
router.get("/:userId", getWallet);
router.post("/transaction", addTransaction);
export default router;
