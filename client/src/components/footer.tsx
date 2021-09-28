import React, { CSSProperties } from 'react';




export default function Footer() {




    return (
        <div style={footWrapp}>
            <div style={footer}>
                <h4>Skapad av: Jocke & Sebbe</h4>
            </div>
        </div>
    );
}

const footWrapp: CSSProperties = {
    height: "10%",
    width: "100%",
    backgroundColor: "rgb(230, 230, 230)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    
}

const footer: CSSProperties = {
    borderTop: "2px solid rgb(85, 150, 245)",
    width: "98%",
    height: "100%",
    display: 'flex',
    justifyContent: "center",
    alignItems: "center"
}