import fs from "fs"



export const addToCart = async (req, res) => {
    let rawUsers = fs.readFileSync("users.json")
    let users = JSON.parse(rawUsers)
    const user = users.find(user => user.name === req.session.username)   
    if(!user) {
        return res.status(404).send("Logga in för att lägga till i kundvagn")
    }
    let foundProduct = user.cart.find(product => product.id === req.body.id)
    if(!foundProduct) {
        const product = {
            id: req.body.id, 
            quantity: 1
        }
        user.cart.push(product)
    } else {
        foundProduct = {
            id: req.body.id,
            quantity: foundProduct.quantity++
        }
    }  
    fs.writeFileSync('users.json', JSON.stringify(users))
    res.status(200).send("Produkt tillagd i kundvagn")
}

export const getProducts = async (req, res) => {
    let rawProd = fs.readFileSync("products.json")
    let productList = JSON.parse(rawProd)
    res.json(productList)
}

export const findCart = async (name, req, res) => {
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
    if(res) {
        return res.json(lineItems)       
    }

    return lineItems
}