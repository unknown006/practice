import Page404 from '../views/page404';
import Home from '../views/home';

let routes=[
    {
        path:'/home',
        component:Home,
    },
    {
        path:'/404',
        component:Page404,
    }
]
export default routes;