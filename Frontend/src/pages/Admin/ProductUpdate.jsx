import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSpeseficProductQuery,
  useUploadImageMutation,
} from "../../redux/api/productApiSlice";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { set } from "nprogress";

const ProductUpdate = () => {
  const params = useParams();
  // console.log(params);

  const navigate = useNavigate();
  const { data: product, isLoading } = useGetSpeseficProductQuery(params._id);
  // console.log(product);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadImage] = useUploadImageMutation();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetAllCategoriesQuery();
  // console.log(`Category id`, categories.categories[0]._id);
  const [updatingProductData, setUpdatingProductData] = React.useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    categoryId: "",
    quantity: "",
    brand: "",
    stock: "",
  });
  const [imageName, setImageName] = React.useState("");

  const handleChange = (e) => {
    setUpdatingProductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadImage(formData).unwrap();
      setUpdatingProductData((prev) => ({
        ...prev,
        image: res.imageUrl,
      }));
      toast.success("Image uploaded successfully", {
        theme: "dark",
        pauseOnHover: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const res = await deleteProduct(params._id).unwrap();
      // console.log(res);
      toast.success(`Product is deleted successfully!`, {
        theme: "dark",
        pauseOnHover: false,
      });
      navigate("/admin/allproductslist");
    } catch (error) {
      console.error(error);
      toast.error(error.error, {
        theme: "dark",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", updatingProductData.name);
      formData.append("image", updatingProductData.image);
      formData.append("brand", updatingProductData.brand);
      formData.append("quantity", updatingProductData.quantity);
      formData.append("category", updatingProductData.categoryId);
      formData.append("description", updatingProductData.description);
      formData.append("price", updatingProductData.price);
      formData.append("countInStock", updatingProductData.stock);
      await updateProduct({
        productId: params._id,
        data: formData,
      }).unwrap();
      // console.log(typeof(params._id));
      toast.success("Product updated successfully", {
        theme: "dark",
        pauseOnHover: false,
      });
      navigate("/admin/allproductslist");
    } catch (error) {
      console.error(error);
      toast.error(error.data, {
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    if (product) {
      setUpdatingProductData({
        name: product.product.name,
        description: product.product.description,
        price: product.product.price,
        image: product.product.image,
        quantity: product.product.quantity,
        brand: product.product.brand,
        stock: product.product.countInStock,
        categoryId: product.product.categoryId,
      });
    }
    setImageName(product?.product?.image?.split("/").pop());
    // console.log(product);
  }, [product]);

  useEffect(() => {
    if (categories?.categories?.length > 0) {
      setUpdatingProductData((prev) => ({
        ...prev,
        categoryId: categories?.categories[0]._id,
      }));
    }
  }, [categories]);

  useEffect(() => {
    document.title = "Update product";
  }, [categories]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container  xl:mx-[9rem] sm:mx-[0]">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-3/4 p-3">
              <div className="text-2xl mb-5 font-bold text-black bg-gradient-to-r py-3 px-5 rounded-lg shadow-md">
                Update / Delete Product
              </div>

              {updatingProductData?.image && (
                <div className="text-center ">
                  <img
                    src={updatingProductData.image}
                    name="image"
                    alt="product"
                    className="block mx-auto w-full h-[40%] rounded"
                  />
                </div>
              )}

              <div className="mb-3 cursor-pointer rounded relative">
                <label className="text-white py-2 px-4  mt-5 block w-full text-center rounded-lg cursor-pointer font-bold bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-l">
                  {updatingProductData.image
                    ? imageName + " (Uploaded)"
                    : "Upload image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadImageHandler}
                    className="hidden " // This hides the default file input
                  />
                </label>
              </div>

              <div className="p-3">
                <div className="flex flex-wrap">
                  <div className="one">
                    <label htmlFor="name">Name</label> <br />
                    <input
                      type="text"
                      name="name"
                      className="p-4 mb-3 w-[30rem] border rounded-lg  text-white mr-[5rem]"
                      value={updatingProductData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="two">
                    <label htmlFor="name block">Price</label> <br />
                    <input
                      type="number"
                      name="price"
                      className="p-4 mb-3 w-[30rem] border rounded-lg  text-white "
                      value={updatingProductData.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div>
                    <label htmlFor="name block">Quantity</label> <br />
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      className="p-4 mb-3 w-[30rem] border rounded-lg  text-white mr-[5rem]"
                      value={updatingProductData.quantity}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="name block">Brand</label> <br />
                    <input
                      type="text"
                      name="brand"
                      className="p-4 mb-3 w-[30rem] border rounded-lg  text-white "
                      value={updatingProductData.brand}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <label htmlFor="" className="my-5">
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  rows="5"
                  className="p-2 mb-3   border rounded-lg w-[95%] text-white"
                  value={updatingProductData.description}
                  onChange={handleChange}
                />

                <div className="flex justify-between">
                  <div>
                    <label htmlFor="name block">Count In Stock</label> <br />
                    <input
                      type="text"
                      name="stock"
                      className="p-4 mb-3 w-[30rem] border rounded-lg  text-white "
                      value={updatingProductData.stock}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Category</label> <br />
                    <select
                      name="categoryId"
                      value={updatingProductData.categoryId}
                      placeholder="Choose Category"
                      className="p-4 mb-3 w-[30rem] rounded-lg border mr-[5rem]"
                      onChange={handleChange}
                    >
                      {categories?.categories?.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="py-4 px-10 cursor-pointer rounded-2xl border border-red-500 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400/50 mr-6"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="py-4 px-10 cursor-pointer rounded-2xl border border-red-500 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400/50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductUpdate;
