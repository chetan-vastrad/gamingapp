import express from "express";
import { declareResult, getAllResults } from "../controllers/resultController.js";
const router = express.Router();
router.post("/declare",declareResult);
router.get("/all",getAllResults);
export default router;
