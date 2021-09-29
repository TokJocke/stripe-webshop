import React, { CSSProperties } from 'react';
import ProductList from './productList';



export default function Main() {


    return (
        <div className={"main"} style={mainStyle}>
            <ProductList />
            

        </div>
                
    );
}

const mainStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "rgb(230, 230, 230)",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
}

