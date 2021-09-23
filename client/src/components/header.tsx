import React, { CSSProperties } from 'react';
import Login from './login';
import Logout from './logout';
import { Link, RouteComponentProps, useParams, useRouteMatch } from 'react-router-dom';




export default function Header() {

    
    let match = useRouteMatch("/:username");
    let username = match?.url.substr(1)
    console.log(username, "this is the user")
    


    return (
        <div style={headerStyle}>
            Fläktar AB
            {
                username?
                <React.Fragment>
                    <Link to={`${match?.url}/kundvagn`}>
                        <button>
                            Till kundvagn
                        </button>
                    </Link>
                    
                    <Logout /> 
                </React.Fragment> 
                    : 
                    <Login /> 
            }
            
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