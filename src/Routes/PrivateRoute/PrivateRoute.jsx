import { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Loader } from "../../Pages/Loader/Loader";
import { Navigate, useLocation } from "react-router";

export const PrivateRoute = ({children})=>{
    const {user , loading} = use(AuthContext)
    const location = useLocation();
    if(loading){
        return <Loader/>
    }
    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children ;
}