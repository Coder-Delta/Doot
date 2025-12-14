import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// ---------------------- CORS ----------------------
app.use(cors({
    origin: process.env.CORS_ORIGIN || process.env.CROS_ORIGIN,
    credentials: true,
}))


// ---------------------- Middlewares ----------------------

app.use(express.json({ limit: "16kb" }))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(express.static("public"))

app.use(cookieParser())

// ---------------------- Routes Import ----------------------

import userRouter from "./routes/user.route.js"

// ---------------------- Routes Declaration ----------------------

app.use("/api/v1/users", userRouter)


// ---------------------- Export ----------------------
export { app }
