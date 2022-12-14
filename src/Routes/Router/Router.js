import PrivetRoutes from "../../Contexts/PrivetRoutes";
import Main from "../../Layout/Main";
import Checkout from "../../Pages/Checkout/Checkout";
import Home from "../../Pages/Home/Home/Home";
import LognIn from "../../Pages/LognIn/LognIn";
import Orders from "../../Pages/Orders/Orders";
import SignUp from "../../Pages/SignUp/SignUp";

const { createBrowserRouter } = require("react-router-dom");
 
export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/lognin',
                element:<LognIn></LognIn>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/checkout/:id',
                element:<PrivetRoutes><Checkout></Checkout></PrivetRoutes>,
                loader: ({params})=>fetch(`https://genius-car-server-three-tau.vercel.app/services/${params.id}`)
            },
            {
                path:'/orders',
                element:<PrivetRoutes><Orders></Orders></PrivetRoutes>
            }
            
        ]
    }
])