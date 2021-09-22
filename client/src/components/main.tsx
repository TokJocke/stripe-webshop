import { useStripe } from '@stripe/react-stripe-js';
import React, { CSSProperties } from 'react';
import ProductList from './productList';



export default function Main() {

/*     const stripe = useStripe()
    console.log(stripe)

    async function testPost() {
        if(stripe) {
        const response = await fetch("http://localhost:3000/session", {
            method: "POST",
            headers: {"content-type": "application/json"}
        })
        const { id } = await response.json()
            console.log(stripe)
            stripe.redirectToCheckout({sessionId: id})
        }

    } */


    return (
        <div style={mainStyle}>
            <ProductList />
            
 {/*            <button onClick={() => testPost()}>
                Testa köp
            </button> */}
        </div>
                
    );
}

const mainStyle: CSSProperties = {
    /* minHeight: "75%", */
    width: "100%",
    backgroundColor: "orange",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
}

