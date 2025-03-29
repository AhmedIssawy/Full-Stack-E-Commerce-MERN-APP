import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const SideBarIcon = React.memo(
  ({ path, title, icon: Icon = AiOutlineHome, rose = false, showTitle, favCount }) => {
    return (
      <div className="relative">
        <Link
          className={`duration-300 hover:scale-105 ${
            !rose ? "hover:text-blue-800" : "hover:text-red-800"
          }`}
          to={path}
        >
          <div className="whitespace-nowrap flex items-center">
            <Icon title={title} size={26} className="mr-2 mt-8" />
            {showTitle && (
              <span className="select-none align-middle mt-8">{title}</span>
            )}
          </div>
        </Link>

        {/* Badge for Favorites Count */}
        {favCount > 0 && (
          <div className="absolute left-4 top-2">
            <span className="px-2 py-1 text-sm text-white bg-pink-500 rounded-full">
              {favCount}
            </span>
          </div>
        )}
      </div>
    );
  }
);

export default SideBarIcon;
