import { Router } from "express";
import {
    sendMessage,
    getMessages,
    getMessageById,
    markMessageAsRead,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Create message
router.post("/", verifyJWT, sendMessage);

// Get all messages
router.get("/", verifyJWT, getMessages);

// Get message by ID
router.get("/:id", verifyJWT, getMessageById);

// Mark message as read
router.patch("/:id", verifyJWT, markMessageAsRead);

export default router;
