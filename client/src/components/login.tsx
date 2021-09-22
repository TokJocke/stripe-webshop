import React, { CSSProperties, useEffect, useState } from 'react';




export default function Login() {

    const [pw, setPw] = useState(undefined)
    const [name, setName] = useState(undefined)

    const updatePw = (event: any) => {
        event? setPw(event.target.value) : setPw(undefined)     
    }
    const updateName = (event: any) => {
        event? setName(event.target.value) : setName(undefined)     
    }
    const login = async () => {
        const user = {
            name: name,
            pw: pw
        }
        
        console.log(user)
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify(user)
        })
        console.log(response)
        
    }

    return (
        <div style={loginStyle}>
            <div>
                <p style={textStyle}>namn:</p>
                <input 
                    onChange={(event) => updateName(event)} 
                    placeholder={"Skriv ditt namn"} 
                    style={inputStyle}
                />
                <p style={textStyle}>lösenord:</p>
                <input 
                    onChange={(event) => updatePw(event)} 
                    placeholder={"Skriv ditt lösenord"} 
                    style={inputStyle}
                    type={'password'}
                    />
            </div>
            <button onClick={() => login()}>Logga in</button>
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