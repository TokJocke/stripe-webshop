import React, { CSSProperties, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';



export default function Logout() {
    const history = useHistory()

    const logout = async () => {
         
        const response = await fetch("http://localhost:3000/logout", {
            method: "DELETE",
            headers: {"content-type": "application/json"},
            credentials: 'include',
        })
        console.log(response)
        history.replace("/")
    }

    return (
        <div style={loginStyle}>

            <button onClick={() => logout()}>Logga ut</button>
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