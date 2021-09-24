import { useStripe } from '@stripe/react-stripe-js';
import React, { CSSProperties, useState } from 'react';
import InCartList from './inCartList';
import { Link, RouteComponentProps, useParams, useRouteMatch } from 'react-router-dom';

interface MatchParams {
    id: string;
  }

export default function Success() {

    const stripe = useStripe()

    let match = useRouteMatch<MatchParams>({
        path: "/:username/success/:id"
    });

    const sessionId = match?.params.id
    console.log(sessionId, "look in here")

    async function verifySession() {
        const response = await fetch("http://localhost:3000/verifySession", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({sessionId})
        })
    }

    async function getSession() {
        const response = await fetch("http://localhost:3000/getOrder", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({sessionId})
        })
        let data = await response.json()
        console.log(data, "in order")
    }
   

    return (
        <div style={successStyle}>
         <p>Payment success</p>
         <button onClick={() => verifySession()}>Verify</button>
         <button onClick={() => getSession()}>Hämta order</button>
        </div>
                
    );
}

const successStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "orange",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
}