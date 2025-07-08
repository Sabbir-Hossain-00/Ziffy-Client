import { Link } from "react-router";

export const Post = ({post})=>{
    const {_id ,authorName , authorEmail , authorImage , title , description , tag , upVote , downVote , created_at} = post ;
    return (
        <Link to={`/post-details/${_id}`}>
          <div className="bg-white shadow-2xl p-10 rounded-2xl">
              <div className="flex items-center gap-3">
                  <img className="w-10 h-10  rounded-full" src={authorImage} alt="" />
                  <div>
                     <h1 className="font-medium text">{authorName}</h1>
                     <p className="text-xs"> jul 8</p>
                  </div>
              </div>
              <div className="ml-11">
                <h1 className="text-2xl font-medium">{title}</h1>
              </div>
              <div className="ml-11">
                <p>#{tag}</p>
              </div>
              <div>
                 <div>

                 </div>
                 <div>

                 </div>
              </div>
          </div>
        </Link>
    )
}