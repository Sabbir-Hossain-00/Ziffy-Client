import { createBrowserRouter } from "react-router";
import { MainLayout } from "../Layouts/MainLayout/MainLayout";
import { Home } from "../Pages/Home/Home/Home";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                index: true ,
                element:<Home/>
            }
        ]
    }
])