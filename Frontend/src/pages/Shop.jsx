import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../app/api/productApiSlice";
import { useGetAllCategoriesQuery } from "../app/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
  setRadio,
} from "../app/features/shop/shopSlice";
import SkeletonID from "../components/SkeletonID";
import ProductCart from "./Products/ProductCard";
const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  // console.log(products);
  const categoriesQuery = useGetAllCategoriesQuery();
  // console.log(categoriesQuery);

  const [priceFilter, setPriceFilter] = useState("");
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  // console.log(products);

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data?.categories) {
      dispatch(setCategories(categoriesQuery.data.categories));
      // console.log("CategoriesQuery", categoriesQuery);
    }
  }, [categoriesQuery.data, dispatch]);
  // console.log("categories", categories);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery?.data?.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery?.data, dispatch, priceFilter]);
  
  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery?.data.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };
  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          ?.filter((brand) => brand !== undefined)
      )
    ),
  ];
  // console.log(uniqueBrands)

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  if (categoriesQuery?.isLoading) {
    return (
      <>
        <SkeletonID />
        <SkeletonID />
        <SkeletonID />
        <SkeletonID />
        <SkeletonID />
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-gray-500 p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 bg-gray-400 rounded-full mb-2">
              Filter By Category
            </h2>
            <div className="p-5 w-[15rem]">
              {categories.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={c._id}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                    />
                    <label
                      htmlFor={c._id}
                      className="ml-2 text-sm font-medium dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="h2 text-center py-2 bg-gray-400 rounded-full mb-2">
              Filter By Brands
            </h2>
            <div className="p-5">
              {uniqueBrands?.map((brand, i) => (
                <div key={i} className="flex items-center mr-4 mb-5">
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                  />
                  <label
                    htmlFor={brand}
                    className="ml-2 text-sm font-medium dark:text-gray-100"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
            <h2 className="h4 text-center py-2 bg-gray-400 rounded-full mb-2">
              Filter By Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                className="border placeholder-white rounded-lg focus:border-blue-300 focus:outline-none focus:ring p-4"
                value={priceFilter}
                onChange={handlePriceChange}
              />
            </div>
            <div className="p-5 pt-0">
              <div
                className="w-full border cursor-pointer text-white my-5"
                onClick={() => window.location.reload()}
              >
                Reset
              </div>
            </div>
            <div className="p-3"></div>
          </div>
          <h2 className=" h-4 text-center ml-2 mb-2">
            Found {products?.length} Products
          </h2>

          <div className="grid mt-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-min">
            {products?.map((product) => (
              <div key={product._id}>
                <ProductCart product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
