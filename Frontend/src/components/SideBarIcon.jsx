import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const SideBarIcon = React.memo(
  ({ path, title, icon: Icon = AiOutlineHome, rose = false, showTitle }) => {
    const navigate = useNavigate();
    return (
      <div>
        <Link
          className={`duration-300 hover:scale-105 ${
            !rose ? "hover:text-blue-800" : "hover:text-red-800"
          }`}
          to={path}
        >
          <div onClick={() => navigate(title)} className="whitespace-nowrap">
            <Icon title={title} size={26} className="mr-2 mt-[2rem]" />
            {showTitle ? (
              <span
                onClick={() => navigate(title)}
                className="select-none  align-middle mt-[2rem]"
              >
                {title}
              </span>
            ) : (
              ""
            )}
          </div>
        </Link>
      </div>
    );
  }
);

export default SideBarIcon;
