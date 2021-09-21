import React from 'react';
import ProductList from './productList';




export default function Main() {




    return (
        <div style={mainStyle}>
            <ProductList />
        </div>
                
    );
}

const mainStyle = {
    height: "75%",
    width: "100%",
    backgroundColor: "orange"
}

