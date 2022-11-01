import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import LognIn from "../../Pages/LognIn/LognIn";
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
            }
            
        ]
    }
])