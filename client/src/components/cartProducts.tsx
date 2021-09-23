import React, { useEffect, useState } from 'react';
import Product from './product';


interface Iproduct {
    name: string,
    price: string,
    info: string,
    quantity: string,
    id: string
}

export default function CartProducts() {

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

    useEffect(() => {
        getCartProducts()
    },[])

    useEffect(() => {
        console.log(cartProducts)
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
                            <button>
                                +
                            </button>
                            <button>
                                -
                            </button>
                            <button>
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

