//Pacakges
import express from "express"
import path from "path"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import cors from "cors"
// import csurf from "csurf"
import ratelimit, { rateLimit } from "express-rate-limit"

//Utils
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
connectDB()
const port = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(csurf({ cookie: true }));
app.use(helmet())
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use(limiter)  ///////   uncomment in production

app.use("/api/users", userRoutes)

app.listen(port, () => console.log(`Server is running on http://localhost:${port}/`))
