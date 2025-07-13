import { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import { GoogleLogin } from "../../../Components/GoogleLogin/GoogleLogin";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";

export const Login = () => {
  const { signInUser } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    setLoginError(""); // reset previous error
    const email = data?.email;
    const password = data?.password;
    const userData = {
      email,
      name: data?.name,
      image: data?.photo,
      badge: "bronze",
    };

    signInUser(email, password)
      .then(async () => {
        const { data: user } = await axiosSecure.post("/user", userData);
        if (user?.insertedId) {
          console.log("login successful");
        }
        toast.success("Logged in successfully!");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        console.log(error);
        setLoginError(error.message || "Failed to login. Please try again.");
      });
  };

  return (
    <section className="pt-30 min-h-screen flex justify-center items-center bg-gray-50">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl rounded-lg">
        <div className="card-body">
          <h1 className="mb-10 text-3xl font-medium text-center">
            Welcome to Ziffy
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label font-medium">Email</label>
              <input
                type="email"
                className={`input input-bordered w-full ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label font-medium">Password</label>
              <input
                type="password"
                className={`input input-bordered w-full ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {loginError && (
              <p className="text-red-600 font-semibold text-center">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-neutral w-full mt-4 text-white bg-amber-400 hover:bg-amber-500"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center">
            Don't have an Account?{" "}
            <Link className="text-pink-600 font-semibold" to="/register">
              Register
            </Link>
          </p>

          <div className="mt-6 w-full">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </section>
  );
};
