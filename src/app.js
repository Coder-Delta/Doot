import { Hono } from "hono";
import { cors } from "hono/cors";
import { Cookie } from "bun";

const app = new Hono()

app.use(cors({
    origin: process.env.CORS_ORIGIN || process.env.CROS_ORIGIN, // both supported
    credentials: true, // cookies, sessions allow
}))