import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getMessages, sendMessage } from "../controller/message.controller.js";

const router = Router();

router.post("/", protectedRoute, sendMessage);
router.get("/:chatId", protectedRoute, getMessages);

export default router;
