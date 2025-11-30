import StarRating from "../ui/StarRating";
import GreenRight from "./GreenRight";
/* eslint-disable react/prop-types */

function Review({ rating, name, text, key }) {
  return (
    <div className="px-8 py-8 space-y-3 w-full  border border-gray-500 rounded-xl ">
      <StarRating maxrating={5} size={24} key={key} defaultRating={rating} />
      <div className="flex gap-1">
        <h1 className="font-semibold text-xl">{name}</h1>
        <span>
          <GreenRight />
        </span>
      </div>
      <div className="w-full text-gray-500">{`${text}`}</div>
    </div>
  );
}

export default Review;
