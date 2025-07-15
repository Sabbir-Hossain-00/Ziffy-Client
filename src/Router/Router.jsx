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
import { Membership } from "../Pages/Membership/Membership";
import { MyPost } from "../Pages/Dashboard/UserDashboard/MyPost/MyPost";
import { MyComment } from "../Pages/Dashboard/UserDashboard/Comment/MyComment";
import { Profile } from "../Pages/Dashboard/Profile/Profile";
import { ManageUsers } from "../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import { MakeAnnouncement } from "../Pages/Dashboard/AdminDashboard/MakeAnnouncement/MakeAnnouncement";
import { ReportedComments } from "../Pages/Dashboard/AdminDashboard/ReportedComments/ReportedComments";
import { AdminRoute } from "../Routes/AdminRoute/AdminRoute";
import { AuthLayout } from "../Layouts/AuthLayout/AuthLayout";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                index: true ,
                element:<Home/>
            },
            // {
            //     path:"/login",
            //     element:<Login/>
            // },
            // {
            //     path:"/register",
            //     element:<Register/>
            // },
            {
                path:"/forbidden",
                element:<Forbidden/>
            },
            {
                path:"/post-details/:id",
                element:<PostDetails/>
            },
            {
                path:"/membership",
                element:<PrivateRoute><Membership/></PrivateRoute>
            }
        ]
    },
    {
        path:"/",
        element:<AuthLayout/>,
        children:[
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            }
        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
        children: [
            {
                index: true ,
                element:<Profile/>
            },
            {
                path:"add-post",
                element:<AddPost/>
            },
            {
                path:"my-post",
                element:<MyPost/>
            },
            {
                path:"comments/:id",
                element:<MyComment/>
            },
            {
                path:"manage-user",
                element:<AdminRoute><ManageUsers/></AdminRoute>
            },
            {
                path:"make-announcement",
                element:<AdminRoute><MakeAnnouncement/></AdminRoute>
            },
            {
                path:"reported-comments",
                element:<AdminRoute><ReportedComments/></AdminRoute>
            }
        ]
    }
])