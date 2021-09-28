import React, { CSSProperties, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
    children?: any
}

export default function Logout(props: Props) {
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
            {props.children}
            <button className="redBtnEffect" style={btnStyle} onClick={() => logout()}>Logga ut</button>
        </div>
    );
}

const loginStyle: CSSProperties = {
    height: "100%",
    width: "15%",
    backgroundColor: "rgb(230, 230, 230)",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
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

const btnStyle: CSSProperties = {
    cursor: "pointer",
    backgroundColor: "rgb(244, 113, 116)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.2em",
}