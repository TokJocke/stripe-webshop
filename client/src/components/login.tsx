import React, { CSSProperties } from 'react';




export default function Login() {




    return (
        <div style={loginStyle}>
            <div>
                <p style={textStyle}>namn:</p>
                <input style={inputStyle}/>
                <p style={textStyle}>lösenord:</p>
                <input style={inputStyle}/>
            </div>
            <button>Logga in</button>
        </div>
    );
}

const loginStyle: CSSProperties = {
    height: "100%",
    width: "15%",
    backgroundColor: "green",
    display: "flex",
    flexDirection: "column",
    padding: "5px",
    justifyContent: "space-between"
}

const inputStyle: CSSProperties = {
    fontSize: "1.1em",
    width: "100%"
}

const textStyle = {
    margin: 0,
    fontSize: "1.1em"
}