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
            quantity: product.quantity,     
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
            success_url: `http://localhost:3001/${foundUser.name}/success/{CHECKOUT_SESSION_ID}`, /* Change to sucess/cancel site */
            cancel_url: "http://localhost:3001/"
        })
        //console.log(session)
        /* console.log(await showCustomers(), " customer list") */
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
            const order = {
                session: sessionId,
                customer: customerId,      
            }
            
            orders.push(order)
            fs.writeFileSync("orders.json", JSON.stringify(orders))
            console.log("det gick")
            res.status(200).json("Success")
        }
        else {
            console.log("Finns redan")
            res.status(404).json("Ordern finns redan registrerad")
        }
    }
    
} 

export const getOrder = async (req, res) => { //Funkar ej .. ... 
    // Vill ha desc, namn, unitPrice, currency, quantity, totalAmount order.
    const lineItems = await stripe.checkout.sessions.listLineItems(req.body.sessionId);
    console.log(lineItems, "in line items ")
    const newItems = lineItems.data.map(async (item) => {
      const orderProperties = {
            name: await getProductName(item.price.product),
            currency: item.currency,
            quantity: item.quantity,
            description: item.description,
            unitPrice: item.price.unit_amount
        }
        console.log(orderProperties, "in our object")
        return orderProperties
    })
    console.log( newItems, "outsideeee")
    return res.json(newItems)
}

const getProductName = async (param) => {
    const product = await stripe.products.retrieve(param);
      return product.name
}

/* const getLineItems = async (sessionId) => {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
        const newItems = lineItems.data.map((item) => {    
            const product = {
                id: item.id,
                unitPrice: item.amount_total,
                desc: item.description,
                quantity: item.quantity
            }
            console.log(product, "In products")
            return product
        })
        return newItems
} */