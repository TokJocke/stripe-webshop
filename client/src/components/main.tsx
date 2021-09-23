import { useStripe } from '@stripe/react-stripe-js';
import React, { CSSProperties } from 'react';
import ProductList from './productList';



export default function Main() {

    const stripe = useStripe()
    console.log(stripe)

    async function testPost() {
        if(stripe) {
        const response = await fetch("http://localhost:3000/session", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
        })
        const { id } = await response.json()
            console.log(stripe)
            stripe.redirectToCheckout({sessionId: id})
        }

    }


    return (
        <div className={"main"} style={mainStyle}>
            <ProductList />
            
            <button onClick={() => testPost()}>
                Testa köp
            </button>
            <p>main</p>
        </div>
                
    );
}

const mainStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "orange",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
}

