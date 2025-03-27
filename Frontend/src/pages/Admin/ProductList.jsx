import { useEffect, useState } from "react";
import {
  useCreateProductMutation,
  useUploadImageMutation,
} from "../../redux/api/productApiSlice";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ProductList = () => {
  const { data } = useGetAllCategoriesQuery();

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    brand: "",
    stock: "",
    imageUrl: "",
  });

  const navigate = useNavigate();
  const [uploadProductImage] = useUploadImageMutation();
  const [createProduct] = useCreateProductMutation();
  // console.log(data);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const uploadFileHandler = async (e) => {
    const image = e.target.files[0];
    const fileData = new FormData();
    fileData.append("image", image);

    setFormData({
      ...formData,
      image: e.target.files[0],
      imageUrl: URL.createObjectURL(image),
    });

    useEffect(() => {
      document.title = "Create Product";
    }, []);

    try {
      const res = await uploadProductImage(fileData).unwrap();
      // console.log(res);
      setFormData({ ...formData, imageUrl: res.imageUrl });

      toast.success(res.message, { theme: "dark" });
    } catch (error) {
      console.error(error);
      toast.error(error.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("category", formData.category);
      productData.append("quantity", formData.quantity);
      productData.append("brand", formData.brand);
      productData.append("stock", formData.stock);
      productData.append("image", formData.imageUrl);
      const { data } = await createProduct(productData).unwrap();
      // console.log(data);
      toast.success(`${formData.name} is created successfully`, {
        theme: "dark",
      });
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error(error.data);
    }
  };

  useEffect(() => {
    if (data?.categories?.length) {
      setFormData((prev) => ({
        ...prev,
        category: data.categories[0]._id, // Set default category
      }));
    }
  }, [data]); // Runs when data changes

  useEffect(() => {
    document.title = "Create Product";
  }, []);

  return (
    <div className=" container xl:mx-[9rem] sm:mx-[0] ">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <h1 className="h-12 font-semibold text-2xl  mb-4">Create Product</h1>
          {formData.imageUrl && (
            <div className="text-center">
              <img
                src={formData.imageUrl}
                alt="product"
                className="w-40 h-40 object-cover mx-auto"
                // {/* block mx-auto max-h-[200px] */}
              />
            </div>
          )}
          <div className="mb-3">
            <label className="border text-black select-none px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {formData.image ? formData.image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!formData.image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name" className="select-none font-bold">
                  Name
                </label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={formData.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>
              <div className="two ml-5">
                <label htmlFor="price" className="select-none font-bold">
                  Price
                </label>
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={formData.price}
                  onChange={handleInputChange}
                  name="price"
                />
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name" className="select-none font-bold">
                  Quantity
                </label>{" "}
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={formData.quantity}
                  onChange={handleInputChange}
                  name="quantity"
                />
              </div>
              <div className="two ml-5">
                <label htmlFor="price" className="select-none font-bold">
                  Brand
                </label>{" "}
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={formData.brand}
                  onChange={handleInputChange}
                  name="brand"
                />
              </div>
            </div>
            <label htmlFor="" className="my-5 select-none font-bold">
              Description
            </label>
            <textarea
              name="description"
              className="p-2 mb-3  border resize rounded-lg w-[95%] min-h-[10rem] max-h-[15rem] text-black"
              value={formData.description}
              onChange={handleInputChange}
            />
            <div className="flex justify-content">
              <div>
                <label htmlFor="stock">Count In Stock</label> <br />
                <input
                  type="number"
                  name="stock"
                  className="p-4 mb-3 w-[30rem] border rounded-lg"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ml-5">
                <label htmlFor="category">Category</label> <br />
                <select
                  name="category"
                  aria-placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg cursor-pointer"
                  onChange={handleInputChange}
                  value={formData.category}
                >
                  {data?.categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="py-3 px-6 cursor-pointer rounded-2xl border border-blue-500 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400/50 "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
