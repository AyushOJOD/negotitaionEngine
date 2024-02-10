import express from "express";
import {
  addMessage,
  getConvergence,
  getMessagebyId,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/addMessage/:sender/:reciever", addMessage);
router.get("/getMessagebyId/:sender/:reciever", getMessagebyId);
router.get("/getConvergence/:sender/:reciever", getConvergence);

export default router;
