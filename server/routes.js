import express from "express"
import { createUser, login, logout } from "./userController.js";
import { checkOut } from "./stripeController.js"
const routes = express.Router();

/* USERS */
routes.post("/createUser", createUser)
routes.post("/login", login)
routes.delete("/logout", logout)

/* STRIPE */
routes.post("/session", checkOut)
export default routes