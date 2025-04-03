import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../../app/api/userApiSlice";
import { toast } from "react-toastify";
import { setCredientials } from "../../app/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
const Profile = () => {
  const [fullInformation, setFullInformation] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    if (!userInfo) {
      dispatch("/login");
    }
  }, []);

  console.log(userInfo);

  const dispatch = useDispatch();

  function handleInputChange(e) {
    console.log(fullInformation);
    setFullInformation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const updatedFields = {};

  if (fullInformation?.username !== userInfo.username)
    updatedFields.username = fullInformation.username;
  if (fullInformation?.email !== userInfo.email)
    updatedFields.email = fullInformation.email;
  if (fullInformation?.password)
    updatedFields.password = fullInformation.password;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (fullInformation.password != confirmPassword) {
      toast.error("Password and confirm password do not match!", {
        theme: "dark",
      });
      return;
    } else {
      try {
        if (
          !updatedFields.username &&
          !updatedFields.email &&
          !updatedFields.password
        ) {
          toast.info("No changes detected", {
            theme: "dark",
          });
          return;
        }
        const res = await updateProfile({
          _id: userInfo._id,
          ...updatedFields,
        }).unwrap();
        dispatch(setCredientials({ ...res }));
        toast.success("Profile updated  successfully!", {
          theme: "dark",
        });
      } catch (error) {
        toast.error(error.data.message || error.data.error || "IDK", {
          theme: "dark",
        });
      }
    }
  };

  useEffect(() => {
      document.title = "Profile";
    }, []);

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-black mb-2">Name</label>
              <input
                type="text"
                name="username"
                id="username"
                className="from-input p-4 rounded-sm w-full border"
                value={fullInformation.username || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="from-input p-4 rounded-sm w-full border"
                value={fullInformation.email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Passowrd</label>
              <input
                type="password"
                name="password"
                id="password"
                className="from-input p-4 rounded-sm w-full border"
                value={fullInformation.password || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Passowrd</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="from-input p-4 rounded-sm w-full border"
                value={confirmPassword || ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="py-3 px-6 cursor-pointer rounded-2xl border border-blue-500 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : "Update"}
              </button>
              <Link
                to={"/user-order"}
                className="py-3 px-6 cursor-pointer rounded-2xl border border-blue-500 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
