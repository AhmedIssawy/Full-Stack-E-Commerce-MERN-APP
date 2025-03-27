import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./nprogress-custom.css"
import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";

// Customize NProgress (optional)
NProgress.configure({ showSpinner: false, trickleSpeed: 50, minimum: 0.1 });

const PageLoader = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 300); 
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location]);

  // Render the nested routes
  return <Outlet />;
};

export default PageLoader;
