import { createBrowserRouter } from "react-router";
import { MainLayout } from "../Layouts/MainLayout/MainLayout";
import { Home } from "../Pages/Home/Home/Home";
import { Login } from "../Pages/Auth/Login/Login";
import { Register } from "../Pages/Auth/Register/Register";
import { Forbidden } from "../Pages/Errors/Forbidden";
import { DashboardLayout } from "../Layouts/DashboardLayout/DashboardLayout";
import { PrivateRoute } from "../Routes/PrivateRoute/PrivateRoute";
import { AddPost } from "../Pages/Dashboard/UserDashboard/AddPost/AddPost";
import { PostDetails } from "../Pages/Home/PostDetails/PostDetails";

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
            },
            {
                path:"/forbidden",
                element:<Forbidden/>
            },
            {
                path:"/post-details/:id",
                element:<PostDetails/>
            }
        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
        children: [
            {
                index: true ,
                element:<Home/>
            },
            {
                path:"add-post",
                element:<AddPost/>
            }
        ]
    }
])