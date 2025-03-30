import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateReviewMutation,
  useGetSpeseficProductQuery,
  useGetTopProductsQuery,
} from "../../redux/api/productApiSlice";
import SkeletonID from "../../components/SkeletonID";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "../Products/HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import SmallProduct from "./SmallProduct";
const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetSpeseficProductQuery(productId);
  const { data: topProducts, isLoading: loadingTopProducts } =
    useGetTopProductsQuery();
  // console.log("top Product", topProducts);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  const addToCartHandler = async () => {
    console.log("Added");
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId: productId,
        data: { rating, comment },
      }).unwrap();
      refetch();
      toast.success("Review created successfully", {
        theme: "dark",
      });
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.error || "Error", {
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    document.title = `${product?.product?.name}: Buy Online At Best Market In The Internet`;
  }, [product]);

  return (
    <>
      <div>
        <Link
          to={"/"}
          className="font-semibold hover:underline text-2xl ml-[10rem]"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <SkeletonID />
      ) : isError ? (
        <h1>Error</h1>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
            <div>
              <img
                src={product.product.image}
                alt={product.product.name}
                className=" xl:w-[25rem] lg:w-[20rem] md:w-[13rem] mr-[2rem]"
              />
              <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.product.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                Description: {product.product.description}
              </p>
              <p className="text-5xl my-4 font-extrabold">
                ${product.product.price}
              </p>
              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2" /> Brand: {product.product.brand}
                  </h1>
                  <h1 className="flex items-center w-40 mb-6">
                    <FaClock className="mr-2 " />
                    {moment(product.product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2" /> Reviews:{" "}
                    {product.product.numReviews}
                  </h1>
                </div>
                <div className="two ml-[5rem]">
                  <h1 className="flex items-center w-40 mb-6">
                    <FaStar className="mr-2" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2" /> Quantity:{" "}
                    {product.product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaBox className="mr-2" /> In Stock:{" "}
                    {product.product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product.product.rating}
                  text={`${product.product.numReviews} reviews`}
                />
                {product.product.countInStock > 0 && (
                  <div>
                    <span className="mr-2">Quantity</span>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] font-semibold  border rounded-lg"
                    >
                      {[...Array(product.product.countInStock).keys()].map(
                        (x) => (
                          <option
                            className="font-semibold text-center"
                            key={x + 1}
                            value={x + 1}
                          >
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </div>
              <div className=" pt-2">
                <button
                  onClick={addToCartHandler}
                  disabled={!product.countInStock}
                  className="w-full md:w-auto cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-md border border-yellow-600 transition duration-300 mt-4 md:mt-0"
                >
                  Add to cart
                </button>
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-3xl m-4">
                Things u will need
              </h1>
              <section className="ml-[4rem] flex flex-wrap">
                {loadingProductReview ? (
                  <SkeletonID />
                ) : (
                  topProducts.products.map((product) => (
                    <div key={product._id} className="mr-5">
                      <SmallProduct product={product} />
                    </div>
                  ))
                )}
              </section>
            </div>
            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
