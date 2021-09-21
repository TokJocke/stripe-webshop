import env from "dotenv"
import cors from "cors"
import express from "express"
import routes from "./routes.js"
import cookieSession from "cookie-session"
import Stripe from "stripe"

env.config(".env")

export const secretKey = process.env.STRIPE_SECRET_KEY
export const stripe = Stripe(secretKey)
const server = express()
const port = 3000

server.use(cors());
server.use(express.json())
server.use(cookieSession({
    secret: "s3cretc00kie",
    maxAge: 1000 * 10/* 1000 * 60 * 60 * 24 */,
    sameSite: "strict",
    httpOnly: true,
    secure: false
}))

server.use("/", routes)


server.listen(port, () => console.log("Servern körs, bra jobbat!")) 