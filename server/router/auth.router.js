import { Router } from "express";
import { Login, Logout, Register } from "../controller/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", protectedRoute, Logout);

export default router;
