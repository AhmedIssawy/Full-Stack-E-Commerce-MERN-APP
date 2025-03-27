import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";

const SessionGuard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkExpiration = () => {
      const expirationTime = localStorage.getItem("expirationTime");

      if (expirationTime && new Date().getTime() > expirationTime) {
        dispatch(logout());
        toast.error("Session expired. Please log in again.", {
          theme: "dark",
          pauseOnHover: false,
        });

        navigate("/login");
      }
    };

    checkExpiration();
    const interval = setInterval(checkExpiration, 10000);
    return () => clearInterval(interval)
  }, [dispatch, navigate]);

  return <Outlet />;
};

export default SessionGuard;
