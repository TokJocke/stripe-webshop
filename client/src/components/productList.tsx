import React, { CSSProperties, useEffect, useState } from 'react';
import Product from './product';


interface Iproduct {
    name: string,
    price: string,
    info: string,
    id: string
}

export default function ProductList() {

    const [products, setProducts] = useState<Iproduct[]>()

    const getProducts = async () => {
        const response = await fetch("http://localhost:3000/getProducts", {
            method: "GET",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            
        })
        let data = await response.json()
        setProducts(data)
    }

    const addToCart = async (id: string) => {
        const response = await fetch("http://localhost:3000/addToCart", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify( {id: id})
        })
        console.log(response)
    }

    useEffect(() => {
        getProducts()
    },[])


    return (
        <div style={productListStyle}>
            
            { 
                products?
                products.map((product) => {
                    return(
                        <Product> 
                            <h1>{product.name}</h1>
                            <p>{product.price}</p>
                            <p>{product.info}</p>
                            <button className="blueBtnEffect" style={btnStyle} onClick={() => addToCart(product.id)}>
                                Lägg i kundvagn
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
    justifyContent: "center",
    flexWrap: "wrap"
}

const btnStyle: CSSProperties = {
    backgroundColor: "rgb(85, 150, 245)",
    color: "white",
    fontSize: "1.2em",
    border: "none",
    borderRadius: "5px",
    padding: "5px",
    cursor: "pointer",
    
}