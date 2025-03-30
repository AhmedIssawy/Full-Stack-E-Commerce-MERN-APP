import { FaRegStar, FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";
const Ratings = ({ value, text, color= "yellow-500" }) => {
  const fullStar = Math.floor(value);
  const halfStar = value - fullStar > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStar - halfStar;
  return (
    <div className="flex items-center">
      {[...Array(fullStar)].map((_, i) => (
        <FaStar key={i} className={`text-${color} ml-1`} />
      ))}
      {halfStar === 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}
      {[...Array(emptyStar)].map((_, i) => (
        <FaRegStar key={i} className={`text-${color} ml-1`} />
      ))}
      <span className={`rating-text ml-[2rem] text-${color}`}>
        {text && text}
      </span>
    </div>
  );
};



export default Ratings;
