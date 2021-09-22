import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        getProducts()
    },[])


    return (
        <div style={productListStyle}>
            
            { 
                products?
                products.map((product) => {
                    return(
                        <Product name={product.name} price={product.price} info={product.info} id={product.id} />
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

