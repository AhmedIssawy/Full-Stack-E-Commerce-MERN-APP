import { Link } from "react-router-dom";
import moment from "moment";
import SkeletonID from "../../components/SkeletonID";
import { useGetAllProductsQuery } from "../../app/api/productApiSlice";
import { useDeleteProductMutation } from "../../app/api/productApiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { data, isLoading, refetch } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  // console.log(data);

  const handleDelete = async (e) => {
    let answer = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!answer) return;

    await deleteProduct(e.target.value);
    refetch();
    toast.success("Product deleted successfully", {
      theme: "dark",
    });
  };

  useEffect(() => {
    document.title = "All Products Management";
    refetch();
  }, [data]);

  if (isLoading) {
    return (
      <div className="container mt-5 mx-[9rem]">
        <SkeletonID />
        <SkeletonID />
        <SkeletonID />
        <SkeletonID />
      </div>
    );
  }
  // console.log(data);

  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <h1 className="ml-[2rem]  text-4xl mb-5 p-2 font-bold h-12">
            {data?.products?.length} Products
          </h1>
          <div className="flex flex-wrap justify-around items-center ">
            {data?.products?.map((product) => (
              <div className="block mb-4 overflow-hidden mr-7 border shadow-md ">
                <div className="flex">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[10rem] h-[8.75rem]"
                  />
                  <div className="p-4 flex flex-col justify-around">
                    <div className="flex justify-between">
                      <h5 className="text-xl font-semibold mb-2">
                        {product.name}
                      </h5>
                      <p className="text-gray-400 text-sm">
                        {moment(product?.createdAt).fromNow()}
                      </p>
                    </div>
                    <p className="text-gray-400 xl:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                      {product.description.substring(0, 160)}...
                    </p>
                    <div className="flex justify-between">
                      {/* Update Button */}
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800"
                      >
                        Edit
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>

                      {/* Delete Button */}
                      <button
                        type="button"
                        value={product._id}
                        onClick={(e) => {
                          e.stopPropagation(); // Ensure event doesn't bubble
                          handleDelete(e);
                        }}
                        className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800"
                      >
                        Delete
                        <svg
                          className="w-5 h-5 text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m5 4v6m4-6v6M4 7h16M10 4h4a1 1 0 011 1v2H9V5a1 1 0 011-1z"
                          />
                        </svg>
                      </button>

                      <p className="font-semibold">$ {product?.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
