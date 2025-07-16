import moment from "moment";
import { LuDot } from "react-icons/lu";

export const Comment = ({ comment }) => {
  // console.log(comment);
  const date = moment(comment?.created_at).fromNow();
  return (
    <section>
      <div>
        <div className="flex  items-center gap-2">
          <img
            className="w-8 h-8 rounded-full"
            src={comment?.userPhoto}
            alt=""
          />
          <div className="flex items-center gap-2">
            <h1 className="font-medium">{comment?.userName}</h1>
            <LuDot />
            <p>{date}</p>
          </div>
        </div>
        <div className="ml-10">
           <p>{comment?.comment}</p>
        </div>
      </div>
    </section>
  );
};
