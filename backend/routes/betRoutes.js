import express from "express";
import { placeBet , getUserBets, getAllBets } from "../controllers/betController.js";

const router = express.Router();
router.post("/place/:userId",placeBet);
router.get("/user/:userId",getUserBets);
router.get("/all",getAllBets);
export default router;