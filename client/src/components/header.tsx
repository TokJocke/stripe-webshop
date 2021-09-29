import React, { CSSProperties, useEffect, useState } from 'react';
import Login from './login';
import Logout from './logout';
import { Link, RouteComponentProps, useParams, useRouteMatch } from 'react-router-dom';




export default function Header() {

    const [isAuth, setIsAuth] = useState(false)

    let match = useRouteMatch("/:username");
    let username = match?.url.substr(1)
    console.log(username, "this is the user")
    
    const auth = async () => {
        const response = await fetch("http://localhost:3000/auth", {
            method: "GET",
            headers: {"content-type": "application/json"},
            credentials: 'include',
        })
        if(response.status === 401) {
            setIsAuth(false)
        }
        else {
            setIsAuth(true)
        }
    }

    useEffect(() => {
        auth()
    }, [])

    return (
        <div style={headerStyle}>
            {
                isAuth?
                    <React.Fragment>
                        <Link style={titleStyle} to={`${match?.url}`}>
                            <h1>Fläktar Gött, ej AB</h1>
                        </Link>
                       
                        <Logout auth={auth}>
                            <div style={btnWrap}>
                                <Link to={`${match?.url}/kundvagn`}>
                                    <button className="blueBtnEffect" style={btnStyle}>
                                        Kundvagn
                                    </button>
                                </Link>
                                <Link to={`${match?.url}/gamla-ordrar`}>
                                    <button className="blueBtnEffect" style={btnStyle}>
                                        Gamla ordrar
                                    </button>
                                </Link>
                            </div>
                        </Logout> 
                    </React.Fragment> 
                    : 
                    <React.Fragment>
                        <Link style={titleStyle} to={"/"}>
                            <h1>Fläktar Gött, ej AB</h1>
                        </Link>
                        <Login auth={auth}/> 
                    </React.Fragment>
            }
            
        </div>
    );
}

const headerStyle: CSSProperties = {
    height: "20%",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "rgb(33, 33, 33)",
    color: "rgb(230, 230, 230)",
    paddingTop: "10px",
    paddingBottom: "10px"
}

const btnStyle: CSSProperties = {
    width: "100%",
    cursor: "pointer",
    fontSize: "1.2em",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "rgb(85, 150, 245)",
    color: "white",
    marginBottom: "5px"
}

const btnWrap: CSSProperties = {
    display: "flex",
    flexDirection: "column"
}

const titleStyle: CSSProperties = {
    alignSelf: "center",
    marginLeft: "10px"
}