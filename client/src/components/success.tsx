import React, { CSSProperties, useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
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

    const history = useHistory()

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
        //let data = await response.json()
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
        if(response.status === 401) {
            history.push("/no-user/401")
        }
        else {
            setOrderInfo(data)
        }
    }

    const renderOrder = () => {
        return(
            <div className="sucess" style={successStyle}>
                {   
                    !ifOrderExist?
                    <p>Din order är redan lagd</p>
                    :
                    <React.Fragment>
                        <p>Din order har blivit godkänd, tack för ditt köp!</p>
                        <div style={orderWrapper}>
                            { 
                                orderInfo? 
                                orderInfo.products.map((product, i) => {
                                    return (
                                        <div key={i} style={productStyle}>
                                                
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
                    </React.Fragment>
                }  
            </div>
        )
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
        <div className="contentwrapp" style={contentWrapper}>
            {
            !verified?
            <div style={spinnerWrap}>
                <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
            </div>
            :
            renderOrder()
        }
       
            
            <Link to={`/${userName}`} >
                <button className="blueBtnEffect" style={btnStyle}>Tillbaka till start</button> 
            </Link>

            
        </div>
                
    );
}

const successStyle: CSSProperties = {
    width: "100%",
    //backgroundColor: "rgb(230, 230, 230)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    //flexGrow: 1,
    //justifyContent: "space-between"
}

export const contentWrapper: CSSProperties = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "70vh",
    backgroundColor: "rgb(230, 230, 230)",
    justifyContent: "space-between"
}

export const btnStyle: CSSProperties = {
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
    minWidth: "50%",
    borderRadius: "15px",
    
}

export const descriptionStyle: CSSProperties = {
    margin: 0,
    fontStyle: "italic",
}

export const textStyle: CSSProperties = {
    margin: 0
}

const spinnerWrap: CSSProperties = {
    marginTop: "10%"
}
