
import fs from "fs"



export const auth = (req, res, next) => {
    try {
        let rawUsers = fs.readFileSync("users.json")
        let users = JSON.parse(rawUsers)
        const name = req.session.username
        const user = users.find(user => user.name === name)
        console.log(user, " in auth ")
        if(!user) {
            throw "Inte inloggad"
        } else {
            next()
        }

    }catch {
        res.status(401).json({
            error: new Error("Ogiltlig förfrågan..")
        })
    }
}