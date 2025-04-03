import { useEffect, useState } from "react";
import { useLoginMutation } from "../../app/api/userApiSlice";
import { setCredientials } from "../../app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);
  const sibmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      // console.log(res);
      dispatch(setCredientials({ ...res }));
      toast.success("Logged in successfully 👍", {
        theme: "dark",
        pauseOnHover: false,
      });
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <form onSubmit={sibmitHandler} className="container w-[40rem]">
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
                id="email"
                className="mt-1 p-2 border rounded  w-3xs "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem] ">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 p-2 border rounded  w-3xs "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin w-12 h-6 " />
              ) : (
                "Sign in"
              )}
            </button>

            <label
              htmlFor="rememberme"
              className="inline-flex items-center select-none mt-2 cursor-pointer"
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
              New Customer?
              <Link className="underline text-blue-700" to={`/register`}>
                <span> </span> Register
              </Link>
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="h-[100vh] w-[59%] xl:block md:hidden sm:hidden "
          draggable="false"
          loading="lazy"
        />
      </section>
    </div>
  );
};

export default Login;
