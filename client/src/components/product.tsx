import React, { CSSProperties } from 'react';

interface Props {
    children: any
}


export default function Product(props: Props) {




    return (
        <div style={productStyle}>
            {props.children}
        </div>
                
    );
}

const productStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    margin: "10px",
    padding: "10px",
    borderRadius: "10px",
    border: "4px solid rgb(85, 150, 245)",
    alignItems: "center"
}

