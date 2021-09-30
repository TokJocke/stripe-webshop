import React, { CSSProperties, useEffect, useState } from 'react';
import Order from './order';
import { descriptionStyle, prodPropDiv, textStyle, totalAmountStyle } from './success';
import { useHistory } from 'react-router-dom';



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
    const history = useHistory()

    async function getAllOrders() {
        const response = await fetch("http://localhost:3000/getAllOrders", {
            method: "GET",
            headers: {"content-type": "application/json"},
            credentials: 'include',
        })
        let data = await response.json()
        if(response.status === 401) {
            history.push("/no-user/401")
        }
        else {
            setOrderInfo(data)
        }
    }
    

    useEffect(() => {
        getAllOrders()
    }, [])

    useEffect(() => {
        console.log(orderInfo)
    }, [orderInfo])

    return (
       <div className="noScrollBar" style={wrapper}>
            {
                orderInfo? 
                    orderInfo.map((order, i) => {
                        return (
                            <Order key={i} date={order.orderDate}>         
                                {
                                    order.products.map((product, i) => {
                                        return (
                                                <div key={i} style={productRow}>
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
    flexGrow: 1,
    height: "100%",
    overflow: "auto",
}

const productRow: CSSProperties = {
    display: "flex",
    backgroundColor: "white",
    color: "black",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "10px",
    borderRadius: "5px",
    padding: "5px",
}

