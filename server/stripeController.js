import { stripe } from "./server.js"
import fs from "fs"

export const createCustomer = async (name) => {    
    const newCustomer = await stripe.customers.create({
        name: name,
    });
    return newCustomer
} 

export const checkOut = async (req, res) => {
    let rawUsers = fs.readFileSync("users.json")
    let users = JSON.parse(rawUsers)
    let rawProd = fs.readFileSync("products.json")
    let products = JSON.parse(rawProd)

    const name = req.session.username
    const foundUser = users.find(user => user.name === name)

    if(foundUser) {
    const lineItems = foundUser.cart.map((product) => {
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
            quantity: product.quantity,     
        }
        return prod     
    })

    console.log("found ID: ", foundUser.customerId)
        const session = await stripe.checkout.sessions.create({
            customer: foundUser.customerId,
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:3001/${foundUser.name}/success/{CHECKOUT_SESSION_ID}`, /* Change to sucess/cancel site */
            cancel_url: "http://localhost:3001/"
        })     
        res.status(200).json({ id: session.id })
    }
    else {
        console.log( " in else ")
    }
}

export const verifySession = async (req, res) => {
    let rawOrders = fs.readFileSync("orders.json")
    let orders = JSON.parse(rawOrders)
    
    const sessionId = req.body.sessionId
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customerId = session.customer
    
    if(session.payment_status === "paid") {
        const foundSessionId = orders.find(order => order.session === sessionId)
        if(!foundSessionId) {

            const lineItems = await stripe.checkout.sessions.listLineItems(req.body.sessionId);
            const orderProducts = await Promise.all(lineItems.data.map( async (item) => {
            const product = await stripe.products.retrieve(item.price.product);
              const orderProduct = {  
                    name: product.name,
                    currency: item.currency,
                    quantity: item.quantity,
                    description: item.description,
                    unitPrice: item.price.unit_amount / 100
                }
                return orderProduct      
            }))
            const newOrder = {
                session: sessionId,
                customer: customerId, 
                products: orderProducts,
                amountTotal: session.amount_total / 100    
            }
            
            orders.push(newOrder)

            fs.writeFileSync("orders.json", JSON.stringify(orders))
            console.log("det gick")
            res.status(200).json("Ordern har lagts")
        }
        else {
            console.log("Finns redan")
            res.status(404).json("Ordern finns redan registrerad")
        }
    }
    
} 

export const getOrder = async (req, res) => {
    const id = req.body.sessionId
    let rawOrders = fs.readFileSync("orders.json")
    let orders = JSON.parse(rawOrders)

    const foundOrder = orders.find(order => order.session === id)
    console.log(foundOrder)

    res.status(200).json(foundOrder)
}
