import { createBrowserRouter } from "react-router";
import { MainLayout } from "../Layouts/MainLayout/MainLayout";
import { Home } from "../Pages/Home/Home/Home";
import { Login } from "../Pages/Auth/Login/Login";
import { Register } from "../Pages/Auth/Register/Register";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                index: true ,
                element:<Home/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            }
        ]
    }
])