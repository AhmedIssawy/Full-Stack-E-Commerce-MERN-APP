import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { useEffect } from "react";
import AdminMenu from "./pages/Admin/AdminMenu";
import { useSelector } from "react-redux";

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);

  useEffect(() => {
    document.title = "Vibe: Buy Online";
  }, []);
  return (
    <>
      <ToastContainer />
      <Navigation />
      {userInfo?.isAdmin && <AdminMenu />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
