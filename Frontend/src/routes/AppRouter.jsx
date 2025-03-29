import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Private Routes
import PrivateRoute from "../components/PrivateRoute.jsx";
import Profile from "../pages/User/Profile.jsx";

// Error
import NotFound from "../pages/Error/NotFound.jsx";

// Auth
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";

// Core
import App from "../App.jsx";
import Home from "../Home.jsx";

// Guards & Loader
import SessionGuard from "../components/SessionGuard.jsx";
import PageLoader from "../components/pageloader/PageLoader.jsx";

// Admin Pages
import AdminRoute from "../pages/Admin/AdminRoute.jsx";
import UserList from "../pages/Admin/UserList.jsx";
import CategoryList from "../pages/Admin/CategoryList.jsx";
import CreateProduct from "../pages/Admin/CreateProduct.jsx";
import ProductUpdate from "../pages/Admin/ProductUpdate.jsx";
import AllProducts from "../pages/Admin/AllProducts.jsx";

import ProductDetails from "../pages/Products/ProductDetails.jsx";
import Favorites from "../pages/Products/Favorites.jsx";

export const AppRoutes = () => {
  const routes = createRoutesFromElements(
    // Top-level layout: PageLoader (must render <Outlet />)
    <Route element={<PageLoader />}>
      {/* Main layout */}
      <Route path="/" element={<App />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* Protected Routes */}
        <Route element={<SessionGuard />}>
          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin Routes */}
          <Route path="admin" element={<AdminRoute />}>
            <Route path="userlist" element={<UserList />} />
            <Route path="categorylist" element={<CategoryList />} />
            <Route path="createproduct" element={<CreateProduct />} />
            <Route path="allproductslist" element={<AllProducts />} />
            <Route path="product/update/:_id" element={<ProductUpdate />} />
          </Route>
        </Route>
      </Route>
    </Route>
  );

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};
