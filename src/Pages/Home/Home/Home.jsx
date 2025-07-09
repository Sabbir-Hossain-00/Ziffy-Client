import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure"
import { Loader } from "../../Loader/Loader";
import { AllPost } from "../AllPost/AllPost";
import { Banner } from "../../../Components/Banner/Banner";
import { useEffect, useState } from "react";

export const Home = ()=>{
    const axiosSecure = useAxiosSecure();
    const [searchResult , setSearchResult] = useState("");
    const [posts , setPosts] = useState([])
    const {data:post , isPending , refetch} = useQuery({
        queryKey: ["posts"],
        queryFn: async()=>{
            const {data} = await axiosSecure.get("/all-post")
            return data
        }
    })
    useEffect(()=>{
        setPosts(post)
    },[post])
    const handleSearch = async(e)=>{
        e.preventDefault()
        const {data} = await axiosSecure.get(`/search-post?tag=${searchResult}`)
        setPosts(data)
    }



    if(isPending){
        return <Loader/>
    }
    console.log(posts)
    return(
        <>
         <Banner handleSearch={handleSearch} searchResult={searchResult} setSearchResult={setSearchResult}  />
         <AllPost posts={posts}/>
        </>
    )
}