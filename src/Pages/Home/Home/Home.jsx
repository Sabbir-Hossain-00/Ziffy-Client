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
    const {data:postsData , isPending , refetch} = useQuery({
        queryKey: ["posts"],
        queryFn: async()=>{
            const {data} = await axiosSecure.get("/all-post")
            return data
        }
    })
    const {data:tags , isPending:isLoading} = useQuery({
        queryKey:["tags"],
        queryFn: async()=>{
            const {data} = await axiosSecure.get("/all-tags")
            return data ;
        }
    })
    useEffect(()=>{
        setPosts(postsData)
    },[postsData])
    const handleSearch = async(e)=>{
        e.preventDefault()
        const {data} = await axiosSecure.get(`/search-post?tag=${searchResult}`)
        setPosts(data)
    }
    


    if(isPending){
        return <Loader/>
    }
    if(isLoading){
        return <Loader/>
    }
    
    return(
        <>
         <Banner handleSearch={handleSearch} searchResult={searchResult} setSearchResult={setSearchResult} postsData={postsData} tags={tags} setPosts={setPosts} />
         <AllPost posts={posts}/>
        </>
    )
}