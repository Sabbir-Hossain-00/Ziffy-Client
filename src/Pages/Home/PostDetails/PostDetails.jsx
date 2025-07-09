import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";

export const PostDetails = ()=>{
    const {id} = useParams();
    const axiosSecure = useAxiosSecure()
    const {data:postDetails , isPending } = useQuery({
        queryKey: ["postDetials", id],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/post-details/${id}`)
            return data
        }
    })
    if(isPending){

    }
    return(
        <>
         <div>
             <div className="flex items-center gap-3">
                  <img className="w-10 h-10  rounded-full" src={postDetails?.authorImage} alt="" />
                  <div>
                     <h1 className="font-medium text">{postDetails?.authorName}</h1>
                     <p className="text-xs"> jul 8</p>
                  </div>
              </div>
              <div className="ml-11 mb-10">
                <h1 className="text-4xl font-medium">{postDetails?.title}</h1>
                <p>{postDetails?.description}</p>
              </div>
              <hr/>
              <div className="mt-10">
                <input type="text" name="" id="" className="border w-1/2 p-2 rounded" placeholder="Your comment" />
              </div>
         </div>
        </>
    )
}