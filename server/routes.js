import express from "express"
import { createUser, login, logout } from "./userController.js";
import { addToCart, findCart, getProducts } from "./productController.js"
import { checkOut } from "./stripeController.js"
const routes = express.Router();

/* USERS */
routes.post("/createUser", createUser)
routes.post("/login", login)
routes.delete("/logout", logout)
/* PRODUCTS */
routes.post("/addToCart", addToCart)
routes.get("/getProducts", getProducts)
routes.get("/getCartProducts", findCart)
/* STRIPE */
routes.post("/session", checkOut)
export default routes