import React, { CSSProperties } from 'react';

interface Props {
    name: string,
    price: string,
    info: string
    id: string
}


export default function Product(props: Props) {


    const addToCart = async () => {
        console.log(props.id)
        const product = {
            id: props.id,
        }
        const response = await fetch("http://localhost:3000/addToCart", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify(product)
        })
        console.log(response)
    }


    return (
        <div style={productStyle}>
            <h1>
                {props.name}
            </h1>
            <p>
                {props.price}
            </p>
            <p>
                {props.info}
            </p>
            <button onClick={() => addToCart()}>
                Lägg i kundvagn
            </button>
        </div>
                
    );
}

const productStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    margin: "10px",
    padding: "10px",
    borderRadius: "10px"    
}

