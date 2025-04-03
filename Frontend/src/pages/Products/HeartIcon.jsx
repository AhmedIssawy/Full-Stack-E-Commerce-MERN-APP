import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../app/features/favorites/favoriteSlice.js";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../../Utils/localStorage.js";
const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites || []);
  const isFavorite = favorites.some((p) => p._id === product._id);
  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);
  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        toggleFavorites();
      }}
      className="absolute top-2 right-5  cursor-pointer"
    >
      {isFavorite ? (
        <FaHeart  className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-red-600" />
      )}
    </div>
  );
};

export default HeartIcon;
