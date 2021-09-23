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
export const getCart = async (req, res) => {
    let rawUsers = fs.readFileSync("users.json")
    let users = JSON.parse(rawUsers)    
    let rawProd = fs.readFileSync("products.json")
    let products = JSON.parse(rawProd)

    const user = users.find(user => user.name === req.session.username)
    const cartItems = user.cart.map((product) => {
        const foundProduct = products.find(p => p.id === product.id) 
        const prod = {
            name: foundProduct.name,
            price: foundProduct.price,
            info: foundProduct.info,
            quantity: product.quantity,
            id: foundProduct.id
                
        }
        return prod     
    })
    return res.json(cartItems)
}

export const changeQuantity = async (req, res) => {
    let rawUsers = fs.readFileSync("users.json")
    let users = JSON.parse(rawUsers)    
    const user = users.find(user => user.name === req.session.username)
    const foundProduct = user.cart.find(product => product.id === req.body.id)
    if(req.body.addOrRemove === "+") {
        foundProduct.quantity++
    }
    else if(req.body.addOrRemove === "-") {
        foundProduct.quantity--
    }
    fs.writeFileSync('users.json', JSON.stringify(users))
    console.log(foundProduct)
    res.status(200).json("Changed quantity")
} 