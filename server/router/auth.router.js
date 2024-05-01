import { Router } from "express";
import { Register } from "../controller/auth.controller.js";

const router = Router();

router.get("/register", Register);

export default router;
