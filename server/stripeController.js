import { stripe } from "./server.js"
import fs from "fs"

export const createCustomer = async (name) => {    
    const newCustomer = await stripe.customers.create({
        name: name,
    });
    return newCustomer
} 

const showCustomers = async () => { /* Only for testing */
    const customers = await stripe.customers.list({
        limit: 3,
      });
    
    return customers
}



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
    let rawUsers = fs.readFileSync("users.json")
    let users = JSON.parse(rawUsers)

    const name = req.session.username
    const foundUser = users.find(user => user.name === name)

    console.log("found ID: ", foundUser.customerId)
    if(foundUser) {
        const session = await stripe.checkout.sessions.create({
            customer: foundUser.customerId,
            payment_method_types: ["card"],
            line_items: findCart(name),
            mode: "payment",
            success_url: "http://localhost:3001/", /* Change to sucess/cancel site */
            cancel_url: "http://localhost:3001/"
        })
        //console.log(session)
        console.log(await showCustomers(), " customer list")
        res.status(200).json({ id: session.id })
    }
    else {
        console.log( " in else ")
    }
}