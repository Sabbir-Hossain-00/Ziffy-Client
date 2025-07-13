import { use } from "react";
import { useRoleSecure } from "../../Hooks/useRoleSecure";
import { AuthContext } from "../../Context/AuthContext";
import { Loader } from "../../Pages/Loader/Loader";
import { Navigate } from "react-router";

export const AdminRoute = ({children}) => {
  const { userData, userLoading } = useRoleSecure();
  const {loading} = use(AuthContext);
  if(loading || userLoading) {
    return <Loader/>
  }
  if(userData?.role === "admin"){
    return children
  }
  return <Navigate to='/'/>
};
