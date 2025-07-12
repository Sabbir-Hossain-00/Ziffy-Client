import { Post } from "./Post"


export const AllPost = ({posts , handldeSort})=>{
    return (
        <section className=" py-20">
            <div className="flex items-center gap-2 mb-6">
                <p>Short by</p>
                <button onClick={handldeSort} className="btn">Popularity</button>
            </div>
           <div className="grid grid-cols-1 gap-4">
               {posts?.map((post)=>{
                return <Post key={post._id} post={post} />
               })}
           </div>
        </section>
    )
}