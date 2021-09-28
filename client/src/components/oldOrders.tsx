import { CssFontSource } from '@stripe/stripe-js';
import React, { CSSProperties, useEffect, useState } from 'react';
import Order from './order';
import { descriptionStyle, prodPropDiv, textStyle, totalAmountStyle } from './success';


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



export default function OldOrders() {

    const [orderInfo, setOrderInfo] = useState<orderInterface[]>()


    async function getAllOrders() {
        const response = await fetch("http://localhost:3000/getAllOrders", {
            method: "GET",
            headers: {"content-type": "application/json"},
            credentials: 'include',
        })
        let data = await response.json()
        setOrderInfo(data)
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    useEffect(() => {
        console.log(orderInfo)
    }, [orderInfo])

    return (
       <div className="wrapper" style={wrapper}>
            {
                orderInfo? 
                    orderInfo.map((order) => {
                        return (
                            <Order date={order.orderDate}>         
                                {
                                    order.products.map((product) => {
                                        return (
                                                <div style={productRow}>
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
                                    
                                }                                     
                                    <p style={totalAmountStyle}>{"Total belopp: " + order.amountTotal}</p>
                            </Order>

                      



                        )
                    })
                :
                null
           }
       </div>
          
    
    )
}

const wrapper: CSSProperties = {
    width: "100%",
    backgroundColor: "rgb(230, 230, 230)",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
}

const productRow: CSSProperties = {
    display: "flex",
    backgroundColor: "white",
    color: "black",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "10px",
    borderRadius: "5px",
    padding: "5px"
}

