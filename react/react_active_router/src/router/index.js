import React,{ useContext } from 'react';
import { glbContext } from '../store'
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import views from '../views';

function Router(){
    const [state] = useContext(glbContext)
    return (
        <BrowserRouter>
            <Switch>
                { state.routes.map((elem)=>{
                    return (
                        <Route key={ elem.name } path={elem.path} component={views[elem.component]} />
                    )
                }) }
            </Switch>  
        </BrowserRouter>
    )
}
export default Router;