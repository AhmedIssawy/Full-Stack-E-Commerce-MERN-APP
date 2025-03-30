import React from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[#1e314b] p-2 fixed cursor-pointer transform duration-300 rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-white my-1"></div>
            <div className="w-6 h-0.5 bg-white my-1"></div>
            <div className="w-6 h-0.5 bg-white my-1"></div>
          </>
        )}
      </button>
      <section
        className={`p-4 fixed z-50 right-7 top-5 transform transition-all duration-300 ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <ul className="list-none mt-2 bg-[#1e314b] rounded-lg p-2">
          <li>
            <NavLink
              to={"/admin/dashboard"}
              style={({ isActive }) => ({
                border: isActive ? "#fff" : "#000",
              })}
              onClick={() => setIsMenuOpen(false)}
              className={
                "list-item text-white  font-semibold py-2 px-3 bg-[#1e314b]  mb-5 hover:bg-[#2E2D2D] rounded-sm"
              }
            >
              Admin Dashboad
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/categorylist"}
              style={({ isActive }) => ({
                border: isActive ? "#fff" : "#000",
              })}
              onClick={() => setIsMenuOpen(false)}
              className={
                "list-item text-white font-semibold py-2 px-3 bg-[#1e314b]  mb-5 hover:bg-[#2E2D2D] rounded-sm"
              }
            >
              Create Category
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/CreateProduct"}
              style={({ isActive }) => ({
                border: isActive ? "#fff" : "#000",
              })}
              onClick={() => setIsMenuOpen(false)}
              className={
                "list-item text-white font-semibold py-2 px-3 bg-[#1e314b]  mb-5 hover:bg-[#2E2D2D] rounded-sm"
              }
            >
              Create Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/allproductslist"}
              style={({ isActive }) => ({
                border: isActive ? "#fff" : "#000",
              })}
              onClick={() => setIsMenuOpen(false)}
              className={
                "list-item text-white font-semibold py-2 px-3 bg-[#1e314b]  mb-5 hover:bg-[#2E2D2D] rounded-sm"
              }
            >
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/userlist"}
              style={({ isActive }) => ({
                border: isActive ? "#fff" : "#000",
              })}
              onClick={() => setIsMenuOpen(false)}
              className={
                "list-item text-white font-semibold py-2 px-3 bg-[#1e314b]  mb-5 hover:bg-[#2E2D2D] rounded-sm"
              }
            >
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/orderlist"}
              style={({ isActive }) => ({
                border: isActive ? "#fff" : "#000",
              })}
              onClick={() => setIsMenuOpen(false)}
              className={
                "list-item text-white font-semibold py-2 px-3 bg-[#1e314b]  mb-5 hover:bg-[#2E2D2D] rounded-sm"
              }
            >
              Manage Orders
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
};

export default AdminMenu;
