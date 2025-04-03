import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../app/features/auth/authSlice";
import { useLogoutMutation } from "../app/api/userApiSlice";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";

const SessionGuard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clearCookies] = useLogoutMutation();

  useEffect(() => {
    const checkExpiration = () => {
      const expirationTime = localStorage.getItem("expirationTime");
      const userInfo = localStorage.getItem("userInfo");

      if (!userInfo) {
        dispatch(logout());
        clearCookies();
        navigate("/register");
        return;
      }
      // console.log("Date now", Date.now())
      if (expirationTime && Date.now() > expirationTime) {
        dispatch(logout());
        clearCookies();
        toast.error("Session expired. Please log in again.", {
          theme: "dark",
          pauseOnHover: false,
        });
        navigate("/login");
      }
    };

    checkExpiration();
  }, [dispatch, navigate]);

  return <Outlet />;
};

export default SessionGuard;
