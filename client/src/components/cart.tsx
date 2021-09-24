import { useStripe } from '@stripe/react-stripe-js';
import React, { CSSProperties, useState } from 'react';
import InCartList from './inCartList';



export default function Cart() {

    const [session, setSession] = useState()

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
            console.log(id)
            console.log(stripe)
            setSession(id)
            stripe.redirectToCheckout({sessionId: id})
        }
        
    }

    async function testRetrieve() {
        if(session) {
            const response = await fetch('http://localhost:3000/session')
        }
    }


    return (
        <div style={cartStyle}>
            <InCartList />
            
            <button onClick={() => testPost()}>
                Testa köp
            </button>
            <p>cart</p>
        </div>
                
    );
}

const cartStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "orange",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
}

