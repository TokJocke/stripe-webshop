import React, { CSSProperties, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LogicalOperator, TypeOperatorNode } from 'typescript';
import Product from './product';


interface Iproduct {
    name: string,
    price: string,
    info: string,
    quantity: string,
    id: string
}

export default function InCartList() {

    const [cartProducts, setCartProducts] = useState<Iproduct[]>()
    const history = useHistory()

    const getCartProducts = async () => {
        const response = await fetch("http://localhost:3000/getCartProducts", {
            method: "GET",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            
        })
        let data = await response.json()
        if(response.status === 401) { //lägg ut på flera ställen
            history.push("/no-user/401")
        }
        else {
            setCartProducts(data)
        }
    }

    const changeQuantity = async (id: string, addOrRemove: string) => {
        const response = await fetch("http://localhost:3000/changeQuantity", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({id, addOrRemove})
            
        })
        getCartProducts()
    }

/*     useEffect(() => {
        getCartProducts()
    },[]) */

    useEffect(() => {
        getCartProducts()
    }, [])

    return (
        <div style={productListStyle}>
            
            { 
                cartProducts?
                cartProducts.map((product) => {
                    return(
                        <Product> 
                            <h1>{product.name}</h1>
                            <p>{product.price}</p>
                            <p>{product.info}</p>
                            <div style={quantityDiv}>
                                <button className="redBtnEffect" style={{...quantityBtnStyle, backgroundColor: "rgb(244, 113, 116)"}} onClick={() => changeQuantity(product.id, "-")}>
                                    -
                                </button>
                                <p>{product.quantity}</p>
                                <button className="greenBtnEffect" style={{...quantityBtnStyle, backgroundColor: "RGB(111, 194, 118)"}} onClick={() => changeQuantity(product.id, "+")}>
                                    +
                                </button>
                            </div>
                            <button className="blueBtnEffect" style={removeBtnStyle} onClick={() => changeQuantity(product.id, "delete")}>
                                Ta bort
                            </button>
                        </Product>
                    )
                })
                :
                "Finns inga produkter"
            } 
        </div>
                
    );
}

const productListStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center"
}

const quantityDiv: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
}

const quantityBtnStyle: CSSProperties = {
    borderRadius: "5px",
    height: "50%",
    border: "none",
    fontSize: "1.2em",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
}

const removeBtnStyle: CSSProperties = {
    borderRadius: "5px",
    width: "100%",
    fontSize: "1.2em",
    border: "none",
    backgroundColor: "rgb(85, 150, 245)",
    color: "white",
    cursor: "pointer",
    padding: "5px"

}