import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPageOfProductsQuery } from "../app/api/productApiSlice";
import Header from "../components/Header";
import SkeletonID from "../components/SkeletonID";
import Message from "./Admin/Message";
import Product from "./Products/Product";
const Home = () => {
  const { keyword } = useParams();
  // console.log("Key word", keyword);

  const { data, isLoading, isError } = useGetPageOfProductsQuery();
  // console.log("Page of products", data);

  useEffect(() => {
    document.title = "Buy Online At The Best Market";
  }, []);
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <SkeletonID />
      ) : isError ? (
        <Message variant={"danger"}>
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special products
            </h1>
            <Link
              to={"shop"}
              className="bg-pink-600 hover:bg-pink-700 text-white transform duration-150 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
            </div>
            <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
