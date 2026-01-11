import { Hono } from "hono";
import registerUser from "../controllers/user.controller.js";

const router = new Hono();

router.post("/register", registerUser);

export default router;
