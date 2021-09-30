import React, { CSSProperties, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
    auth: () => Promise<void>
}


export default function Login(props: Props) {
    const history = useHistory()
    const [pw, setPw] = useState(undefined)
    const [name, setName] = useState(undefined)
    const [errMsg, setErrMsg] = useState("")

    const updatePw = (event: any) => {
        event? setPw(event.target.value) : setPw(undefined)     
    }
    const updateName = (event: any) => {
        event? setName(event.target.value) : setName(undefined)     
    }
    const login = async () => {

        if(!name) {
            setErrMsg("Du behöver fylla i ett användarnamn")
            return 
        } else if(!pw) {
            setErrMsg("Du behöver fylla i ett lösenord")
            return 
        }

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({name: name, pw: pw})
        })
        if(response.status === 401) {
            setErrMsg("Fel användarnamn eller lösenord")

        }
        else {
            history.push(`/${name}`)
            props.auth()
            setErrMsg("")
        }
 
    }

    const createUser = async () => {

        if(!name) {
            setErrMsg("Du behöver fylla i ett användarnamn")
            return 
        } else if(!pw) {
            setErrMsg("Du behöver fylla i ett lösenord")
            return 
        }

        const response = await fetch("http://localhost:3000/createUser", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({name: name, pw: pw})
        })
        if(response.status === 409) {
            setErrMsg("Användarnamn upptaget")
        }
        else {
            login()
        }
 
    }

    return (
        <div className="loginDiv" style={loginStyle}>
            <div>
                <input 
                    onChange={(event) => updateName(event)} 
                    placeholder={"Skriv ditt namn"} 
                    style={inputStyle}
                />
                <input 
                    onChange={(event) => updatePw(event)} 
                    placeholder={"Skriv ditt lösenord"} 
                    style={inputStyle}
                    type={'password'}
                    />
                { 
                    errMsg.length > 1 ?
                        <p style={errorMsg}>{errMsg}</p>
                        :
                        null
                }
            </div>
            <div style={btnWrapp}>
                <button className={"blueBtnEffect"} style={btnStyle} onClick={() => login()}>Logga in</button>
                <button className={"blueBtnEffect"} style={btnStyle} onClick={() => createUser()}>Skapa användare</button>
            </div>
        </div>
    );
}

const loginStyle: CSSProperties = {
    height: "100%",
    width: "100%",
    backgroundColor: "rgb(230, 230, 230)",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    justifyContent: "space-evenly",
    borderBottomLeftRadius: "15px",
}

const inputStyle: CSSProperties = {
    fontSize: "1.1em",
    width: "100%",
    borderRadius: "5px",
    border: "none",
    marginBottom: "5px",
    padding: "5px"
}

const btnStyle: CSSProperties = {
    backgroundColor: "rgb(85, 150, 245)",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.2em",
    cursor: "pointer",
    marginBottom: "5px",
    padding: "5px",
    color: "rgb(230, 230, 230)"
}

const btnWrapp: CSSProperties = {
    display: "flex",
    flexDirection: "column",
}

const errorMsg: CSSProperties = {
    color: "red"
}