import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure"
import { Loader } from "../../Loader/Loader";
import { AllPost } from "../AllPost/AllPost";

export const Home = ()=>{
    const axiosSecure = useAxiosSecure();
    const {data:posts , isPending , refetch} = useQuery({
        queryKey: ["posts"],
        queryFn: async()=>{
            const {data} = await axiosSecure.get("/all-post")
            return data
        }
    })
    if(isPending){
        return <Loader/>
    }
    console.log(posts)
    return(
        <>
         <AllPost posts={posts}/>
        </>
    )
}