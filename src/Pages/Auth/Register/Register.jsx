import { useForm } from "react-hook-form"
import { Link } from "react-router"

export const Register = ()=>{
    const { register , handleSubmit} = useForm();
    const onSubmit = (data)=>{
        console.log(data)
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
          </div>
        </div>
        </>
    )
}