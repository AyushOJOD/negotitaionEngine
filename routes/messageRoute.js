import express from "express";
import { addMessage } from "../controllers/messageController";

const router = express.Router();

router.post("/addMessage", addMessage);

export default router;
