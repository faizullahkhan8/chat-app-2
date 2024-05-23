import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getUser } from "../controller/user.controller.js";

const router = Router();

router.get("/:userId", protectedRoute, getUser);
router.get("/search", protectedRoute);

export default router;
