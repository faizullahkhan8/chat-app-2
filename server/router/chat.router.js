import { Router } from "express";
import { createChat } from "../controller/chat.controller.js";

const router = Router();

router.get("/", createChat);

export default router;
