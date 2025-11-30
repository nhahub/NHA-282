import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <Link
      to={"/products"}
      className="flex flex-col justify-center space-y-3 h-96 items-center w-full"
    >
      <MdOutlineShoppingCart className="text-5xl" />
      <h1 className="text-2xl font-semibold">Your Cart is Empty</h1>
    </Link>
  );
}

export default EmptyCart;
