import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { Link, redirect } from "react-router-dom";
import { useRegisterMutation } from "../../app/api/userApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredientials } from "../../app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Register = () => {
  const [fullInformation, setFullInformation] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setconfirmPassowrd] = useState("");

  const [registerUser, { data, isLoading, isError }] = useRegisterMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleInputChange = (e) => {
    setFullInformation((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handlePasswordConfirmation = () => {
    if (fullInformation.password != confirmPassword) {
      toast.error("Password and confirm password do not match", {
        theme: "dark",
        pauseOnHover: false,
      });
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handlePasswordConfirmation()) return;
    try {
      const res = await registerUser(fullInformation).unwrap();
      if (res?.error?.status === 409) {
        toast.error(res.error.data.message, {
          theme: "dark",
          pauseOnHover: false,
        });
        console.log(res);

        setFullInformation((prev) => ({ ...prev, email: "" })); //UX thing
        return;
      }
      dispatch(setCredientials({ ...res }));
      navigate("/home");
      toast.success("You have Regestered successfully! 👌", {
        theme: "dark",
        pauseOnHover: false,
      });
    } catch (error) {
      toast.error(error?.data?.message || error.data.error),
        {
          theme: "dark",
          pauseOnHover: false,
        };
      console.error(error);
    }
  };
  useEffect(() => {
      document.title = "Register";
    }, []);

  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem] ">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form className="container w-[40rem]" onSubmit={handleSubmit}>
          <div className="my-[2rem]">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-black"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              id="username"
              placeholder="Username"
              className="peer mt-1 p-2 border w-3xs rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 
                 invalid:border-red-500 invalid:ring-red-500"
              onChange={handleInputChange}
              value={fullInformation.username || ""}
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              id="email"
              className="peer mt-1 p-2 border w-3xs rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 
                 invalid:border-red-500 invalid:ring-red-500"
              onChange={handleInputChange}
              value={fullInformation.email || ""}
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
              className="peer mt-1 p-2 border w-3xs rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 
                 invalid:border-red-500 invalid:ring-red-500"
              placeholder="Password"
              onChange={handleInputChange}
              value={fullInformation.password || ""}
            />
            <button
              type="button"
              className="relative left-2 top-2 cursor-pointer "
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
            </button>
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-medium text-black"
            >
              confirm password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmpassword"
              required
              id="confirm password"
              placeholder="Confirm Password"
              className="peer mt-1 p-2 border w-3xs rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 
                 invalid:border-red-500 invalid:ring-red-500"
              value={confirmPassword}
              onChange={(e) => setconfirmPassowrd(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin w-12 h-6 " />
            ) : (
              "Register"
            )}
          </button>
          <label
              htmlFor="rememberme"
              className="inline-flex items-center mt-2 select-none cursor-pointer"
            >
              <input
                type="checkbox"
                name="rememberme"
                id="rememberme"
                className="form-checkbox cursor-pointer ml-5 h-5 w-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
        </form>

        <div className="mt-4">
          <p className="text-black">
            Already have account?
            <Link className="underline text-blue-700" to={`/login`}>
              <span> </span> Login
            </Link>
          </p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt="Beutiful image"
        className="h-[100vh] w-[59%] xl:block md:hidden sm:hidden"
        loading="lazy"
        draggable="false"
      />
    </section>
  );
};

export default Register;
