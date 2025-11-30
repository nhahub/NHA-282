/* eslint-disable react/prop-types */
import StarRating from "../../ui/StarRating";
import { formatCurrency } from "../../utils/helper";
function ProductCard({ id, img, title, price }) {
  return (
    <div className="text-start flex-col h-full gap-5 p-5 justify-between relative">
      <div>
        <div className="flex justify-center min-w-full">
          <img
            src={img[0]}
            alt={`product img number ${id}`}
            className="rounded-xl max-h-48"
          />
        </div>

        <h2 className="font-bold text-xl h-10 truncate">{title}</h2>
      </div>
      {/* container for price and rating  */}
      <div className={"p-1 absolute bottom-2"}>
        {/*rating in  stars  */}
        <div>
          <StarRating
            maxrating={5}
            size={24}
            key={1234}
            defaultRating={Math.floor(Math.random() * (5 - 2) + 2) }
            text={true}
          />
        </div>
        {/* price */}
        <div>
          <span className="font-bold text-2xl">{formatCurrency(price)}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
