import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Private Routes
import PrivateRoute from "../components/PrivateRoute.jsx";
import Profile from "../pages/User/Profile.jsx";
import Shipping from "../pages/Orders/Shipping.jsx";
import PlaceOrder from "../pages/Orders/PlaceOrder.jsx";
import Order from "../pages/Orders/Order.jsx";
import UserOrders from "../pages/User/UserOrders.jsx";

// Error
import NotFound from "../pages/Error/NotFound.jsx";

// Auth
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";

// Core
import App from "../App.jsx";

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
import OrderList from "../pages/Admin/OrderList.jsx";
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";

// Public Pages
import ProductDetails from "../pages/Products/ProductDetails.jsx";
import Favorites from "../pages/Products/Favorites.jsx";
import Home from "../pages/Home.jsx";
import Cart from "../pages/Cart.jsx";
import Shop from "../pages/Shop.jsx";

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />

        {/* Protected Routes */}
        <Route element={<SessionGuard />}>
          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="place-order" element={<PlaceOrder />} />
            <Route path="order/:id" element={<Order />} />
            <Route path="user-order" element={<UserOrders />} />
          </Route>

          {/* Admin Routes */}
          <Route path="admin" element={<AdminRoute />}>
            <Route path="userlist" element={<UserList />} />
            <Route path="categorylist" element={<CategoryList />} />
            <Route path="createproduct" element={<CreateProduct />} />
            <Route path="allproductslist" element={<AllProducts />} />
            <Route path="orderlist" element={<OrderList />} />
            <Route path="product/update/:_id" element={<ProductUpdate />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Route>
    </Route>
  );

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};
