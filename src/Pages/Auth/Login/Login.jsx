import { Link } from "react-router";

export const Login = () => {
  return (

        <div className="card bg-base-100 w-full mx-auto mt-30 max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="mb-10 text-3xl font-medium text-center">Welcome to Ziffy</h1>
            <form className="fieldset">

              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />

              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />
              
        
              <button className="btn btn-neutral mt-4">Login</button>
            </form>
            <p>Don't have an Account ? <Link className="text-pink-600" to="/register">Register</Link> </p>
          </div>
        </div>
  );
};
