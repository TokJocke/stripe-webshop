import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from './cart';
import Main from './main';




export default function ContentView() {




    return (
        
            <Switch>
                <Route exact path={"/"} component={Main} />       {/* trying to add dynamic region to url */}                    
                <Route path={"/kundvagn"} component={Cart} />
            </Switch>                
    
    )
}

