import { v4 as uuidv4} from "uuid"
import fs from "fs"
import cookieSession from "cookie-session"
import bcryptjs from "bcryptjs"



export const createUser = async (req, res) => {
 
    let rawUsers = fs.readFileSync("users.json")
    let users = JSON.parse(rawUsers)

    if(users.find(user => user.name === req.body.name)) {
        return res.status(409).send("Användarnamn är upptaget")
    }

    const hashedPw = await bcryptjs.hash(req.body.pw, 10)
    users.push({name: req.body.name, pw: hashedPw, cart: []})

    fs.writeFileSync("users.json", JSON.stringify(users))
    res.status(201).send("User created")
}

export const login = async (req, res) => {

    let rawUsers = fs.readFileSync("users.json")
    let users = JSON.parse(rawUsers)
    const user = users.find(user => user.name === req.body.name)
    
    if(!user || !await bcryptjs.compare(req.body.pw, user.pw)) {
        return res.status(401).send({message: 'No blah Found'}) /* Cant get message on clientside */
    }
    if(req.session.id) {
        return res.send("Du är redan inloggad")
    }

    req.session.id = uuidv4()
    req.session.username = user.name
    req.session.loginDate = new Date()
    res.send("Du har loggat in")
}

export const logout = (req, res) => {
    if(!req.session.id) {
        return res.status(404).send("Kan inte logga ut när du inte är inloggad")
    }
    req.session = null
    res.send("Du är utloggad")
}