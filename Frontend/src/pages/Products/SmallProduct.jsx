import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
const SmallProduct = ({ product }) => {
  return (
    <div className="w-full sm:w-[300px] md:w-[250px] border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-transform  bg-white">
      <div className="relative">
        {/* Product Image */}
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[200px] object-cover rounded-lg"
          />
        </Link>
        <HeartIcon product={product} />
        
      </div>

      {/* Product Info */}
      <div className="mt-3">
        <Link
          to={`/product/${product._id}`}
          className="text-gray-800 font-medium hover:text-blue-600 block text-sm md:text-base"
        >
          {product.name.length > 30
            ? product.name.slice(0, 30) + "..."
            : product.name}
        </Link>

        {/* Price */}
        <div className="text-lg font-semibold text-green-600 mt-1">
          ${product.price.toFixed(2)}
        </div>

        {/* Button Section */}
        <button className="mt-2 w-full cursor-pointer bg-yellow-500 text-black py-2 text-sm md:text-base rounded-md hover:bg-yellow-600 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SmallProduct;
