import { useStripe } from '@stripe/react-stripe-js';
import React, { CSSProperties, useEffect, useState } from 'react';
import InCartList from './inCartList';
import { Link, RouteComponentProps, useParams, useRouteMatch } from 'react-router-dom';
import Loader from 'react-loader-spinner';

interface MatchParams {
    id: string;
    username: string
  }

  interface productInterface {
      currency: string
      description: string
      name: string
      quantity: number
      unitPrice: number
  }
interface orderInterface {
    amountTotal: number
    customer: string
    products: productInterface[]
    session: string
    orderDate: string
}

export default function Success() {

    const stripe = useStripe()
    const [orderInfo, setOrderInfo] = useState<orderInterface>()
    const [verified, setVerified] = useState(false)
    const [ifOrderExist, setIfOrderExist] = useState(false)

    let match = useRouteMatch<MatchParams>({
        path: "/:username/success/:id"
    });

    const sessionId = match?.params.id
    const userName = match?.params.username

    async function verifySession() {
        const response = await fetch("http://localhost:3000/verifySession", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({sessionId})
        })
        let data = await response.json()
        setVerified(true)
        if(response.status === 404) {
            setIfOrderExist(false)
        }
        else {
            setIfOrderExist(true)
        }
    }

    async function getOrder() {
        const response = await fetch("http://localhost:3000/getOrder", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({sessionId})
        })
        let data = await response.json()
        setOrderInfo(data)
    }

    const renderOrder = () => {
    
    }

   
    useEffect( () => {
        verifySession()
    }, [])

    useEffect(() => {
        if(verified) {
            getOrder()
        }   
    }, [verified])

    useEffect(() => {
       console.log(orderInfo)
    }, [orderInfo])

    return (
        <div style={successStyle}>
       {/*      {
            ifOrderExist?
        } */}
       {/*      <p>Din order har blivit godkänd, tack för ditt köp!</p>
            { 
                !verified?
                <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
                :
                <div style={orderWrapper}>
                    { 
                        orderInfo? 
                            orderInfo.products.map((product) => {
                                return (
                                    <div style={productStyle}>
                                       
                                        <div style={prodPropDiv}>
                                            <p style={textStyle}>{product.quantity + "x" + " " + product.name }</p> 
                                        </div>
                                        <div>
                                            <p style={descriptionStyle}>Beskrivning:</p>
                                            <p style={descriptionStyle}>{product.description}</p>
                                        </div>
                                        <div style={prodPropDiv}>
                                            <p style={textStyle}>{product.unitPrice}</p>
                                            <p style={textStyle}>{product.currency}</p>
                                        </div>
                            
                                    </div>
                                )
                            })
                        : null
                    }
                    {
                        orderInfo? 
                            <p style={totalAmountStyle}>{"Total belopp: " + orderInfo.amountTotal}</p>
                        :
                            null
                    }
                </div>
            } */}
            
            <Link to={`/${userName}`} >
                <button className="blueBtnEffect" style={btnStyle}>Tillbaka till start</button> 
            </Link>

            
        </div>
                
    );
}

const successStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "rgb(230, 230, 230)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
}

const btnStyle: CSSProperties = {
    marginBottom: "20px",
    fontSize: "1.5em",
    padding: "15px",
    border: "none",
    backgroundColor: "rgb(85, 150, 245)",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer"
}

const productStyle: CSSProperties = {
    display: "flex",
    //flexDirection: "column",
    backgroundColor: "white",
    marginBottom: "10px",
    padding: "5px",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: "5px"    
}

export const prodPropDiv: CSSProperties = {
    display: "flex",
    alignItems: "center"
}

export const totalAmountStyle: CSSProperties = {
    fontSize: "1.5em",
    color: "rgb(230, 230, 230)",
    textAlign: "center"
}

const orderWrapper: CSSProperties = {
    padding: "20px",
    backgroundColor: "rgb(30, 30, 30)",
    width: "50%",
    borderRadius: "15px",
    
}

export const descriptionStyle: CSSProperties = {
    margin: 0,
    fontStyle: "italic",
}

export const textStyle: CSSProperties = {
    margin: 0
}
