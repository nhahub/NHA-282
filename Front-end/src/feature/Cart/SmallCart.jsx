// import test from "../../Assets/img1.png";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { formatCurrency } from "../../utils/helper";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useState } from "react";
import { useCartStore } from "../../Store";
import toast from "react-hot-toast";
/* eslint-disable react/prop-types */

function SmallCart({ id, img, name, quantity, color, size, price }) {
  const [count, setCount] = useState(quantity);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.increaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Image section */}
      <img src={img} alt="item image" className="w-28 mx-auto md:mx-0" />

      {/* Details section */}
      <div className="md:w-2/3 w-full">
        {/* Title and delete button */}
        <div className="flex justify-between mb-2">
          <h1 className="font-bold text-base md:text-xl capitalize">
            {name?.split(" ").length > 8
              ? name?.split(" ").slice(0, 6).join(" ")
              : name}
          </h1>
          <RiDeleteBin6Fill
            onClick={() => {
              removeFromCart({ id, size, color });
              toast.success("Item has been removed");
            }}
            className="text-red-600 text-2xl sm:text-xl md:text-xl cursor-pointer"
          />
        </div>

        {/* Size and color details */}
        <div className="space-y-1">
          <div className="text-sm">
            Size: <span className="text-sm text-gray-400">{size}</span>
          </div>
        </div>

        {/* Quantity and price controls */}
        <div className="mt-3 flex justify-between items-center">
          <div className="text-lg md:text-2xl font-bold">
            {formatCurrency(price * count).slice(0, -3)}
          </div>

          {/* Quantity control buttons */}
          <div className="flex justify-center items-center">
            <FaMinus
              className="cursor-pointer min-w-[24px]" // Ensure the icon has enough space
              onClick={() => {
                if (count === 1) return;
                setCount(count - 1);
                decreaseQuantity(id);
              }}
            />
            <span className="font-semibold mx-2">{count}</span>
            <FaPlus
              className="cursor-pointer min-w-[24px]" // Ensure the icon has enough space
              onClick={() => {
                setCount(count + 1);
                increaseQuantity(id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallCart;
