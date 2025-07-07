import { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import { GoogleLogin } from "../../../Components/GoogleLogin/GoogleLogin";

export const Login = () => {
    const {signInUser} = use(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const {register , handleSubmit} = useForm()
    const onSubmit = (data)=>{
        const email = data?.email ;
        const password = data?.password ;
        signInUser(email , password).then(()=>{
            console.log("login successful")
            navigate(location.state || "/")
        }).catch((error)=>{
            console.log(error)
        })
    }
  return (

        <div className="card bg-base-100 w-full mx-auto mt-30 max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="mb-10 text-3xl font-medium text-center">Welcome to Ziffy</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">

              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" {...register("email" , {required : true})} />

              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" {...register("password" , {required : true})} />
              
        
              <button className="btn btn-neutral mt-4">Login</button>
            </form>
            <p>Don't have an Account ? <Link className="text-pink-600" to="/register">Register</Link> </p>
            <GoogleLogin/>
          </div>
        </div>
  );
};
