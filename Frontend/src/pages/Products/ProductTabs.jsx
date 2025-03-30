import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SkeletonID from "../../components/SkeletonID";
import moment from "moment";
const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(2);

  if (isLoading) {
    return (
      <>
        <SkeletonID />
        <SkeletonID />
        <SkeletonID />
      </>
    );
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem]">
        <div
          onClick={() => handleTabClick(1)}
          className={`flex-1 p-4 text-white bg-[#212e41] rounded mb-2 cursor-pointer text-lg ${
            activeTab === 1 ? "font-extrabold" : ""
          }`}
        >
          Write Your Review
        </div>

        <div
          onClick={() => handleTabClick(2)}
          className={`flex-1 mb-10 text-white p-4 rounded-lg bg-[#212e41] cursor-pointer text-lg ${
            activeTab === 2 ? "font-extrabold" : ""
          }`}
        >
          All Reviews
        </div>
      </section>

      {/* Second Part */}
      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem]"
                  >
                    <option value="">Select Rating</option>
                    <option value="1">Very Bad</option>
                    <option value="2">Bad</option>
                    <option value="3">Decent</option>
                    <option value="4">Good</option>
                    <option value="5">Excelent</option>
                  </select>
                </div>
                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows={"3"}
                    placeholder="Write your comment"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2  border rounded-lg xl:w-[40rem] text-black"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="w-full md:w-auto cursor-pointer bg-pink-500 hover:bg-pink-600 text-black font-bold py-3 px-6 rounded-lg shadow-md border border-pink-600 transition duration-300 mt-4 md:mt-0"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className="font-semibold">
                Please{" "}
                <Link className="text-blue-600 underline" to={"/login"}>
                  Sign in
                </Link>{" "}
                to write a review
              </p>
            )}
          </div>
        )}
      </section>
      <section>
        {activeTab === 2 && (
          <>
            <div>
              {product.product.reviews.length === 0 ? (
                <p>No Reviews Yet</p>
              ) : (
                <div>
                  <h1 className="m-3 p-4 text-2xl font-bold ml-5">
                    All Reviews
                  </h1>
                  {product.product.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-[#212e41] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                    >
                      <div className="flex justify-between">
                        <strong className="text-[#B0B0B0]">
                          {review.name}
                        </strong>
                        <p className="text-[#B0B0B0]">
                          {moment(review.createdAt).fromNow()}
                        </p>
                      </div>
                      <p className="my-4 text-[#B0B0B0]">{review.comment}</p>
                      <Ratings value={review.rating} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
