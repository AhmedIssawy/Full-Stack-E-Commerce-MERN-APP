import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeartIcon from "./HeartIcon";
const Product = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="w-[25rem] ml-[2rem] p-3 relative cursor-pointer"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[25rem] h-[20rem] rounded"
        />
        <div className="z-50">
          <HeartIcon product={product} />
        </div>
      </div>
      <div className="p-4">
        <h2 className="flex justify-between items-center">
          <div className="text-lg">{product.name}</div>
          <span className="bg-ping-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            ${product.price}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Product;
