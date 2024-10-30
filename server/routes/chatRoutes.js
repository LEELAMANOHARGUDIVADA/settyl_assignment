import { Router } from "express"
import { chatHistory } from "../controllers/chatController.js";

const router = Router();

router.get('/:userId/:receiverId', chatHistory);

export default router;