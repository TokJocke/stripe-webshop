import React, { CSSProperties } from 'react';
import Login from './login';




export default function Header() {




    return (
        <div style={headerStyle}>
            header
            <Login />
        </div>
    );
}

const headerStyle: CSSProperties = {
    height: "20%",
    width: "100%",
    backgroundColor: "blue",    
    display: "flex",
    justifyContent: "space-between"
}