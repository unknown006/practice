import React,{ Component } from 'react';
import { Route,Redirect,Switch } from 'react-router-dom'
// import BaseRoutes from './base_routes';
// import RouterRoutes from './router_routes';

import DashBoard from '../views/dashboard';
import Page404 from '../views/page404';

// import Page1 from '../views/page1';
// import Page2 from '../views/page2';

// function merge(...all){
//     return all.flat();
// }
class RouterComponent extends Component{
    constructor(props){
        super(props)
        this.state={};
    }
    render(){
        return (
            <Switch>
                <Route path="/" component={ DashBoard }></Route>
                <Route path="/404" component={ Page404 }></Route>
                <Redirect from="/*" to="/"></Redirect>  
            </Switch>                        
        )
    }
}

export default RouterComponent;