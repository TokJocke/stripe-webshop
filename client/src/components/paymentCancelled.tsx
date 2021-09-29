import { useStripe } from '@stripe/react-stripe-js';
import { CSSProperties, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { btnStyle, contentWrapper } from './success';

interface MatchParams {
    username: string
}

export default function PaymentCancelled() {

    let match = useRouteMatch<MatchParams>({
        path: "/:username/payment-cancelled"
    });

    const stripe = useStripe()
    const history = useHistory()
    const userName = match?.params.username



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
           // setSession(id)
            stripe.redirectToCheckout({sessionId: id})
        }
        
    }

    const auth = async () => {
        const response = await fetch("http://localhost:3000/auth", {
            method: "GET",
            headers: {"content-type": "application/json"},
            credentials: 'include',
        })
        if(response.status === 401) {
            history.push("/no-user/401")
        }
    }

    useEffect(() => {
        auth()
    }, [])

    return (
        <div className="contentwrapp" style={contentWrapper}>
            <p>Din betalning blev avbruten</p>
            <div style={btnWrapp}>
                <Link to={`/${userName}`} >
                    <button style={btnStyle} className="blueBtnEffect">Tillbaka till start</button> 
                </Link>
                <button style={btnStyle} className="blueBtnEffect" onClick={() => toCheckOut()}>Försök igen</button>

            </div>
         
            
        </div>
                
    );
}


const btnWrapp: CSSProperties = {
    width: "30%",
    display: "flex",
    justifyContent: "space-between"
}