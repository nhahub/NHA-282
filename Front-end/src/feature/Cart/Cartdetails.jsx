import { useCartStore } from "../../Store";
import SmallCart from "./SmallCart";

function Cartdetails() {
  const cart = useCartStore((state) => state.cart);
  // console.log(cart);
  return (
    <div className="w-2/3 space-y-6">
      {cart.map((item, index) => (
        <SmallCart
          price={item.price}
          name={item.name}
          img={item.image}
          id={item.id}
          key={index}
          size={item.size}
          color={item.color}
          quantity={item.quantity}
        />
      ))}
      {/* <SmallCart />
      <SmallCart />
      <SmallCart /> */}
    </div>
  );
}

export default Cartdetails;
