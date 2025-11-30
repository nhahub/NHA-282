import StarRating from "../../ui/StarRating";
import { formatCurrency } from "../../utils/helper";
/* eslint-disable react/prop-types */

function CollectionCard({ img, id, title, rating, price }) {
  return (
    <div className="text-start">
      <img
        src={img}
        alt={`product img number ${id}`}
        className="rounded-xl p-10"
      />
      <h2 className="font-bold md:text-xl  text-base whitespace-nowrap">
        {title?.split(" ").length > 4
          ? title.split(" ").slice(0, 3).join(" ")
          : title}
      </h2>
      <div>
        <StarRating
          maxrating={5}
          size={24}
          key={1234}
          defaultRating={rating}
          text={true}
        />
      </div>
      <div>
        <span className="font-bold text-2xl">{formatCurrency(price)}</span>
      </div>
    </div>
  );
}

export default CollectionCard;
