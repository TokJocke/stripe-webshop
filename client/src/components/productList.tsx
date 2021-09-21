import React from 'react';
import Product from './product';




export default function ProductList() {

    const products = [
        {
            name: "bordsfläkt",
            price: "200kr",
            info: "Blåser bra som fan, håll i hatten!"
        },
        {
            name: "golvfläkt",
            price: "600kr",
            info: "Står på pinne och skapar storm!"
        },
        {
            name: "takfläkt",
            price: "1000kr",
            info: "toppnotch!"
        }
    ]


    return (
        <div style={productListStyle}>
            {products.map((product) => {
                return(
                    <Product name={product.name} price={product.price} info={product.info} />
                )
            })}
        </div>
                
    );
}

const productListStyle = {

}

