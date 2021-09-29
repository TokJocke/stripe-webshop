import React, { CSSProperties } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
    children?: any
    auth: () => Promise<void>
    
}

export default function Logout(props: Props) {
    const history = useHistory()

    const logout = async () => {
         
        await fetch("http://localhost:3000/logout", {
            method: "DELETE",
            headers: {"content-type": "application/json"},
            credentials: 'include',
        })
        history.replace("/")
        props.auth()
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


const btnStyle: CSSProperties = {
    cursor: "pointer",
    backgroundColor: "rgb(244, 113, 116)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.2em",
}