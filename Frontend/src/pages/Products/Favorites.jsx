import { useSelector } from "react-redux";
import Product from "./Product";
const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  // console.log(favorites);

  return (
    <>
      <h1 className="text-lg ml-[14rem] font-bold mt-[3rem]">
        Favorite Products
      </h1>
      {favorites.length === 0 ? (
        <p className="ml-[15rem]">No Favorites Yet</p>
      ) : (
        <div className="ml-[10rem]">
          <div className="flex flex-wrap">
            {favorites.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Favorites;
