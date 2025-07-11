import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Fragment, use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";

export const CommentModal = ({ isOpen, setIsOpen ,postId , refetch }) => {
    const [comment , setComment] = useState("");
    const {user} = use(AuthContext);
    const axiosSecure = useAxiosSecure()
    const handleComment = async()=>{
        console.log(comment , user?.displayName , postId)
        const commentData = {
            userName:user?.displayName,
            userEmail:user?.email,
            userPhoto:user?.photoURL,
            comment,
            postId,
        }
        const {data} = await axiosSecure.post("/comment",commentData)
        if(data.insertedId){
            refetch();
            setComment("")
            setIsOpen(false)
        }
    }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          leave="ease-in duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            leave="ease-in duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-2xl transition-all">
              <DialogTitle className="text-lg font-bold text-gray-800">
                Share your comment here 
              </DialogTitle>

              <textarea value={comment} onChange={(e)=>setComment(e.target.value)} type="text" className="border border-gray-300 px-3 py-1 rounded w-full mt-10" />

              <div className="mt-6 flex justify-end gap-4">
                <button
                  className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Discard
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                  onClick={handleComment}
                >
                  Comment
                </button>
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
