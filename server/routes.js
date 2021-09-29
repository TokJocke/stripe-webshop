import express from "express"
import { createUser, login, logout } from "./userController.js";
import { addToCart, getCart, getProducts, changeQuantity } from "./productController.js"
import { checkOut, getOrder, verifySession, getAllOrders } from "./stripeController.js"
import { auth } from "./auth.js";
const routes = express.Router();


/* USERS */
routes.post("/createUser", createUser)
routes.post("/login", login)
routes.delete("/logout", logout)
/* PRODUCTS */
routes.post("/addToCart", auth, addToCart)
routes.get("/getProducts", getProducts)
routes.get("/getCartProducts", auth, getCart)
routes.post("/changeQuantity", auth, changeQuantity)
/* STRIPE */
routes.post("/session", auth, checkOut)
routes.post("/verifySession", auth, verifySession)
routes.post("/getOrder", auth, getOrder)
routes.get("/getAllOrders", auth, getAllOrders)

/* ÖVRIGT */
routes.get("/auth", auth)
export default routes