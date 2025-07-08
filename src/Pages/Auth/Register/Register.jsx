import axios from "axios";
import { useForm } from "react-hook-form"
import { Form, Link, useLocation, useNavigate } from "react-router"
import { imageUpload } from "../../../Api/Utils";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { GoogleLogin } from "../../../Components/GoogleLogin/GoogleLogin";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";

export const Register = ()=>{
    const {signUpUser , updateUser} = use(AuthContext)
    const { register , handleSubmit} = useForm();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const location = useLocation()
    const onSubmit = async(data)=>{
        const imgURL = await imageUpload(data?.photo[0])
        const email = data?.email ;
        const name = data?.name ;
        const password = data?.password;
        const userData = {
          email,
          name,
          image: imgURL,
        }
        signUpUser(email , password).then((res)=>{
            updateUser(name , imgURL).then(async(res)=>{
                const {data:user} =await axiosSecure.post("/user",userData)
                if(user?.insertedId){
                    console.log("register successfull")
                     navigate(location.state || "/")
                }
            }).catch((error)=>{
                console.log(error)
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <>
        <div className="card bg-base-100 w-full mx-auto mt-30 max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="mb-10 text-3xl font-medium text-center">Create an Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                

              <label className="label">Name</label>
              <input type="name" className="input" placeholder="Your Name" {...register("name", {required : true})} /> 

              <label className="label">Photo</label>
              <input type="file" className="input" placeholder="Your Photo" {...register("photo", {required : true})} />

              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" {...register("email" , {required : true})} />

              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" {...register("password" , {required : true})} />
              
        
              <button className="btn btn-neutral mt-4">Register</button>
            </form>
            <p>Don't have an Account ? <Link className="text-pink-600" to="/login">Login</Link> </p>
            <GoogleLogin/>
          </div>
        </div>
        </>
    )
}