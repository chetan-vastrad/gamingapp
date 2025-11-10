import express from "express";
import { declareOpenNumber, getOpenNumberHistory } from "../controllers/openNumberController.js";
const router = express.Router();
router.post("/declare", declareOpenNumber);
router.get("/history", getOpenNumberHistory);
export default router;