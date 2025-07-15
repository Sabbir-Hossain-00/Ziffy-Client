import { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { imageUpload } from "../../../Api/Utils";
import { AuthContext } from "../../../Context/AuthContext";
import { GoogleLogin } from "../../../Components/GoogleLogin/GoogleLogin";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";

export const Register = () => {
  const { signUpUser, updateUser } = use(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const [registerError, setRegisterError] = useState("");

  const onSubmit = async (data) => {
    setRegisterError(""); // reset error
    try {
      const imgURL = await imageUpload(data.photo[0]);
      const email = data.email;
      const name = data.name;
      const password = data.password;

      const userData = {
        email,
        name,
        image: imgURL,
        badge: "bronze",
      };

      await signUpUser(email, password);
      await updateUser(name, imgURL);
      const { data: user } = await axiosSecure.post("/user", userData);

      if (user?.insertedId) {
        toast.success("Registration successful!");
        reset();
        navigate(location.state?.from || "/");
      }
    } catch (error) {
      console.error(error);
      setRegisterError(
        error.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <section className="min-h-screen flex flex-col-reverse md:flex-row justify-between items-center">
      <div className=" w-full lg:h-screen h-fit flex items-center justify-center">
        <div className="card bg-base-100 w-full max-w-sm  rounded-lg">
          <div className="card-body">
            <h1 className="mb-10 text-3xl font-medium text-center">
              Create an Account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label font-medium">Name</label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label font-medium">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className={`input input-bordered w-full ${
                    errors.photo ? "border-red-500" : ""
                  }`}
                  {...register("photo", { required: "Photo is required" })}
                />
                {errors.photo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.photo.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label font-medium">Email</label>
                <input
                  type="email"
                  className={`input input-bordered w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                      message:
                        "Password must contain at least 1 uppercase and 1 lowercase letter",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {registerError && (
                <p className="text-red-600 font-semibold text-center">
                  {registerError}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-neutral w-full mt-4 text-white bg-rose-500 border-none hover:bg-rose-600"
              >
                Sign Up
              </button>
            </form>
            <div className=" w-3/4 mx-auto">
              <div className="divider divider-error">OR</div>
            </div>

            <div className="mt-6">
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-rose-500 w-full md:h-screen h-fit py-10 flex flex-col justify-center items-center">
        <div className="text-white flex flex-col items-center gap-2">
          <h1 className=" text-5xl  font-semibold text-center">
            Welcome Back !
          </h1>
          <p className="text-lg font-medium text-center">
            To keep connected with us please <br /> login with your peesonal
            info
          </p>
          <Link className="btn btn-outline rounded-full" to="/login">
            Sign In
          </Link>
        </div>
        <img
          className="w-1/2"
          src="https://i.ibb.co/8Lcr0MwH/Mobile-login-bro.png"
          alt=""
        />
      </div>
    </section>
  );
};
