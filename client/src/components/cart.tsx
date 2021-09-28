import { useStripe } from '@stripe/react-stripe-js';
import React, { CSSProperties, useState } from 'react';
import InCartList from './inCartList';



export default function Cart() {

    const [session, setSession] = useState()

    const stripe = useStripe()
    console.log(stripe)

    async function toCheckOut() {
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
            
            <button className="blueBtnEffect" style={checkoutBtnStyle} onClick={() => toCheckOut()}>
                Till Checkout
            </button>
        </div>
                
    );
}

const cartStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "rgb(230, 230, 230)",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center"
}

const checkoutBtnStyle: CSSProperties = {
    marginBottom: "20px",
    fontSize: "1.5em",
    padding: "15px",
    border: "none",
    backgroundColor: "rgb(85, 150, 245)",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer"
}