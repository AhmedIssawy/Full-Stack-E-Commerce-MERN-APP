import React from "react";
import { useGetTopProductsQuery } from "../../app/api/productApiSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Message from "../Admin/Message";
import { useNavigate } from "react-router-dom";
import { MdReviews } from "react-icons/md";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="p-4">
      {isLoading ? null : error ? (
        <Message variant="danger">{error?.data?.error || "Error"}</Message>
      ) : (
        <Slider {...settings} className=" h-full w-[44rem] shadow-2xl">
          {products.products.map((product) => (
            <div
              key={product._id}
              className="p-6 bg-white shadow-md rounded-lg"
            >
              {/* Image Section */}
              <div className="w-[45rem] h-90 flex justify-center items-center overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className=" object-fill"
                />
              </div>
              {/* Product Details */}
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl  font-bold text-gray-800">
                    {product.name}
                  </h2>
                </div>
                <p className="text-xl text-green-600 font-semibold mt-1">
                  ${product.price}
                </p>
                <p className="text-gray-600 mt-2">
                  {product.description.substring(0, 100)}...
                </p>
              </div>
              {/* Meta Data */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center">
                  <FaStore className="mr-2" />
                  <span>Brand: {product.brand}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>Added: {moment(product.createdAt).fromNow()}</span>
                </div>
                <div className="flex items-center">
                  <MdReviews className="mr-2" />
                  <span>Reviews: {product.numReviews}</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-2" />
                  <span>Rating: {Math.round(product.rating)}</span>
                </div>
                <div className="flex items-center">
                  <FaShoppingCart className="mr-2" />
                  <span>Quantity: {product.quantity}</span>
                </div>
                <div className="flex items-center">
                  <FaBox className="mr-2" />
                  <span>In Stock: {product.countInStock}</span>
                </div>
                <div className="flex items-center">
                  <FaBox className="mr-2" />
                  <span>Category: {product.category}</span>
                </div>
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="border bg-amber-400 font-bold h-10 rounded-lg hover:bg-amber-500 cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
