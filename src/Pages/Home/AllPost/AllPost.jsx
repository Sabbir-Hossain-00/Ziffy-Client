import { Post } from "./Post"

export const AllPost = ({posts})=>{
    return (
        <section className=" py-20">
           <div className="grid grid-cols-1 gap-4">
               {posts?.map((post)=>{
                return <Post key={post._id} post={post} />
               })}
           </div>
        </section>
    )
}