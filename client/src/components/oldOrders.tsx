import { CssFontSource } from '@stripe/stripe-js';
import React, { CSSProperties, useEffect, useState } from 'react';
import Order from './order';


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
       <div style={wrapper}>
            {
                orderInfo? 
                    orderInfo.map((order) => {
                        return (
                            <Order date={order.orderDate}>         
                                {
                                    order.products.map((product) => {
                                        return (
                                                <div style={productRow}>
                                                    <p>{product.quantity + "x" + " " + product.name }</p>
                                                    <p>{product.unitPrice * product.quantity}</p> {/* Tog x quantity här, kanske snyggt? */}
                                                    <p>{product.currency}</p>
                                                </div>                                                      
                                        )           
                                    })
                                    
                                }                                     
                                    <p>{"Total belopp: " + order.amountTotal}</p>
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
    display: "flex"
}

