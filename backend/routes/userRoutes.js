import  express  from "express";
import { getAllUsers, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect,authorizeRole } from "../middlewares/authMiddlewares.js";

const router = express.Router();
router.get("/profile/:id",getUserProfile);
router.put("/profile",protect,authorizeRole,updateUserProfile);
router.get("/users",getAllUsers)
export default router;

