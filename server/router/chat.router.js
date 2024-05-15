import { Router } from "express";

// [CONTROLLER IMPORTS]
import {
    createChat,
    findChat,
    userChats,
} from "../controller/chat.controller.js";

// [MIDDLEWARE IMPORTS]
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protectedRoute, createChat);
router.get("/", protectedRoute, userChats);
router.get("/find/:receiverId", protectedRoute, findChat);

export default router;
