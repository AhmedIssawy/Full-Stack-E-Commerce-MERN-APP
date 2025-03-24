import { useRef, useState } from "react";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineLogout,
} from "react-icons/ai";
import SideBarIcon from "../../components/SideBarIcon";
import { FaHeart } from "react-icons/fa";
import { TfiAlignJustify } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [clicked, setClicked] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setClicked((prev) => !prev);
    setShowSidebar((prev) => !prev);
  };
  // console.log(userInfo);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  const handleLogoutClick = async () => {
    try {
      dispatch(logout());
      await logoutApiCall().unwrap();
      navigate("/login");
      toast.success(`Logged out successfully👍`, {
        theme: "dark",
        pauseOnHover: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className={`fixed top-0 left-0 h-[100vh] bg-[#000] text-white p-5 flex-col justify-between
        ${showSidebar ? "w-[10%]" : "w-[4%]"}
        `}
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-2">
          <div
            className={`${
              clicked ? " text-blue-800 " : ""
            } hover:scale-105 hover:text-blue-800 cursor-pointer duration-300  `}
            onClick={toggleSidebar}
          >
            <TfiAlignJustify size={26} className="mr-2 mt-[2rem]" />
          </div>

          <SideBarIcon
            path={"/"}
            title={"Home"}
            icon={AiOutlineHome}
            showTitle={showSidebar}
          />
          <SideBarIcon
            path={"/shop"}
            title={"Shop"}
            icon={AiOutlineShoppingCart}
            showTitle={showSidebar}
          />
          <SideBarIcon
            path={"/cart"}
            title={"Cart"}
            icon={AiOutlineShopping}
            showTitle={showSidebar}
          />
          <SideBarIcon
            path={"/favorite"}
            title={"Favorite"}
            icon={FaHeart}
            rose={true}
            showTitle={showSidebar}
          />
        </div>

        {userInfo ? (
          <div className="absolute bottom-6 left-4">
            <span
              onClick={toggleDropdown}
              className="cursor-pointer hover:scale-105 hover:text-blue-800 duration-300 select-none"
            >
              {userInfo.username}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 `}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
                />
              </svg>
            </span>

            {dropdownOpen &&
              (userInfo.isAdmin ? (
                <ul className="absolute bottom-full left-0 mb-2 bg-white text-gray-800 shadow-lg rounded-lg py-2 w-40 border border-gray-300">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer select-none">
                    <Link onClick={toggleDropdown} to="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer select-none">
                    <Link onClick={toggleDropdown} to="/admin/productlist">Products</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer select-none">
                    <Link onClick={toggleDropdown} to="/admin/categorylist">Category</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer select-none">
                    <Link onClick={toggleDropdown} to="/admin/orderlist">Orders</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer select-none">
                    <Link onClick={toggleDropdown} to="/admin/userlist">Users</Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer select-none"
                    onClick={handleProfileClick}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer select-none"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </li>
                </ul>
              ) : (
                <ul className="absolute bottom-full left-0 mb-2 bg-white text-gray-800 shadow-lg rounded-lg py-2 w-40 border border-gray-300">
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer select-none"
                    onClick={handleProfileClick}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer select-none"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </li>
                </ul>
              ))}
          </div>
        ) : (
          <ul className="absolute bottom-6 left-4">
            <li>
              <SideBarIcon
                path={"/login"}
                title={"Login"}
                icon={AiOutlineLogin}
                showTitle={showSidebar}
              />
            </li>
            <li>
              <SideBarIcon
                path={"/register"}
                title={"Register"}
                icon={AiOutlineUserAdd}
                showTitle={showSidebar}
              />
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Navigation;
