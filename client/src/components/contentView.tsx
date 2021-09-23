import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import Cart from './cart';
import Main from './main';




export default function ContentView() {

    


    return (
        
            <Switch>
                <Route exact path={"/:username?"} component={Main}></Route>                  
                <Route exact path={"/:username/kundvagn"} component={Cart} />
            </Switch>                
    
    )
}

