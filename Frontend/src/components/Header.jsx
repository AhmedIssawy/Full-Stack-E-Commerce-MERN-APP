import { useGetTopProductsQuery } from "../app/api/productApiSlice.js";
import SkeletonID from "../components/SkeletonID.jsx";
import SmallProduct from "../pages/Products/SmallProduct.jsx";
import ProductCarousel from "../pages/Products/ProductCarousel.jsx";
const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  if (isLoading) {
    return (
      <>
        <SkeletonID />
        <SkeletonID />
        <SkeletonID />
        <SkeletonID />
        <SkeletonID />
        <SkeletonID />
      </>
    );
  }
  console.log("Top Products", data);

  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid mr-5 grid-cols-2">
            {data?.products?.map((product) => (
              <div className="m-3" key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <section className="m-3">
          <ProductCarousel />
        </section>
      </div>
    </>
  );
};

export default Header;
