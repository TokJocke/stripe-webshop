import { stripe } from "./server.js"

export const checkOut = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                description: "Blåser bra som fan, håll i hatten!",
                price_data: {
                    currency: "sek",
                    product_data: {
                        name: "bordsfläkt"
                    },
                    unit_amount: 20000
                },
                quantity: 1
            
            },
            {
                description: "Står på pinne och skapar storm!",
                price_data: {
                    currency: "sek",
                    product_data: {
                        name: "golvfläkt"
                    },
                    unit_amount: 60000
                },
                quantity: 1
            
            },
     
        ],
        mode: "payment",
        success_url: "http://localhost:3001/", /* Change to sucess/cancel site */
        cancel_url: "http://localhost:3001/"
    })
    console.log(session)
    res.status(200).json({ id: session.id })
}