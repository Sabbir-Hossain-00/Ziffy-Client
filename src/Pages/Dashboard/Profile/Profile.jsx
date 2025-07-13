import { useRoleSecure } from "../../../Hooks/useRoleSecure"
import { Loader } from "../../Loader/Loader";
import { AdminProfile } from "../AdminDashboard/AdminProfile/AdminProfile"
import { UserProfile } from "../UserDashboard/UserProfile/UserProfile"

export const Profile = ()=>{
    const {userData , userLoading} = useRoleSecure();
    if(userLoading){
        return <Loader/>
    }
    return(
        <>
         {userData?.role === "user" && <UserProfile/>}
         {userData?.role === "admin" && <AdminProfile/>}
        </>
    )
}