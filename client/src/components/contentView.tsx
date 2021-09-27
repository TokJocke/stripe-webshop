import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import Cart from './cart';
import Main from './main';
import Success from './success';




export default function ContentView() {

    


    return (
        
            <Switch>
                <Route exact path={"/:username/success/:id"} component={Success} />
                <Route exact path={"/:username?"} component={Main} />                  
                <Route exact path={"/:username/kundvagn"} component={Cart} />
            </Switch>                
    
    )
}

