import { AdminProfile } from "../AdminDashboard/AdminProfile/AdminProfile"
import { UserProfile } from "../UserDashboard/UserProfile/UserProfile"

export const Profile = ()=>{
    return(
        <>
         <UserProfile/>
         <AdminProfile/>
        </>
    )
}