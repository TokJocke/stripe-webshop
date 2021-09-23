import React, { CSSProperties, useEffect, useState } from 'react';
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

    const getCartProducts = async () => {
        const response = await fetch("http://localhost:3000/getCartProducts", {
            method: "GET",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            
        })
        let data = await response.json()
        setCartProducts(data)
    }

    const changeQuantity = async (id: string, addOrRemove: string) => {
        const response = await fetch("http://localhost:3000/changeQuantity", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({id, addOrRemove})
            
        })
    }

/*     useEffect(() => {
        getCartProducts()
    },[]) */

    useEffect(() => {
        getCartProducts()
    }, [cartProducts])

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
                                <button onClick={() => changeQuantity(product.id, "-")}>
                                    -
                                </button>
                                <p>{product.quantity}</p>
                                <button onClick={() => changeQuantity(product.id, "+")}>
                                    +
                                </button>
                            </div>
                            <button onClick={() => changeQuantity(product.id, "delete")}>
                                ta bort
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

const productListStyle = {
    display: "flex",
}

const quantityDiv: CSSProperties = {
    display: "flex",
    justifyContent: "space-between"
}