import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//Private Routes

import PrivateRoute from "../components/PrivateRoute.jsx";
import Profile from "../pages/User/Profile.jsx";
//Error

import NotFound from "../pages/Error/NotFound.jsx";

// Auth
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";

import App from "../App.jsx";
import SessionGuard from "../components/SessionGuard.jsx";

// Admin pages
import AdminRoute from "../pages/Admin/AdminRoute.jsx";
import UserList from "../pages/Admin/UserList.jsx";

export const AppRoutes = () => {
  const routes = createRoutesFromElements(
    <Route path="/" element={<SessionGuard />}>
      <Route path="/" element={<App />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/*Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="userlist" element={<UserList />} />
        </Route>
      </Route>
    </Route>
  );
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};
