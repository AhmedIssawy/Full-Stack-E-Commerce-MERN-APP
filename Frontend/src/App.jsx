import { Navigate, Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const App = () => {
  
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
