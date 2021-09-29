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
/*     const [isAuth, setIsAuth] = useState(false)

    const auth = async () => {
        const response = await fetch("http://localhost:3000/auth", {
            method: "GET",
            headers: {"content-type": "application/json"},
            credentials: 'include',
        })
        if(response.status === 401) {
            setIsAuth(false)
        }
        else {
            setIsAuth(true)
        }
    }

    useEffect(() => {
        auth()
    }, []) */


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
        if(response.status === 401) {
            alert("logga in för att lägga till varor i kundvagnen")
        }
    } 

    useEffect(() => {
        getProducts()
    },[])


    return (
        <div style={productListStyle}>
            
            { 
                products?
                products.map((product, i) => {
                    return(
                        <Product key={i}> 
                            <h1>{product.name}</h1>
                            <p>{product.price}</p>
                            <p>{product.info}</p>
                            <button /* disabled={isAuth? false : true} */ className="blueBtnEffect" style={btnStyle} onClick={() => addToCart(product.id)}>
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