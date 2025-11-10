import express from "express";
import { createRechargeRequest, getAllRecharge, updateRechargeStatus, getUserRecharge} from "../controllers/rechargeController.js";

const router= express.Router();
router.post("/request",createRechargeRequest);
router.get("/user/:userId",getUserRecharge);
router.get("/all",getAllRecharge);
router.put("/update/:rechargeId",updateRechargeStatus);
export default router;
