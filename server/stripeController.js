import { stripe } from "./server.js"
import fs from "fs"

const findCart = (name) => {
    let rawUsers = fs.readFileSync("users.json")
    let users = JSON.parse(rawUsers)
    let rawProd = fs.readFileSync("products.json")
    let products = JSON.parse(rawProd)
    const user = users.find(user => user.name === name)
    const lineItems = user.cart.map((product) => {
        const foundProduct = products.find(p => p.id === product.id) 
        const prod = {
            description: foundProduct.info,
            price_data: {
                currency: "sek",
                product_data: {
                    name: foundProduct.name
                },
                unit_amount: parseInt(foundProduct.price) * 100
            },
            quantity: product.quantity     
        }
        return prod     
    })
    return lineItems
}

export const checkOut = async (req, res) => {
    const name = req.session.username
    if(name) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: findCart(name),
            mode: "payment",
            success_url: "http://localhost:3001/", /* Change to sucess/cancel site */
            cancel_url: "http://localhost:3001/"
        })
        /* console.log(session) */
        res.status(200).json({ id: session.id })
    }
    else {
        console.log( " in else ")
    }
}