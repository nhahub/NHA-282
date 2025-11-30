import { useState } from "react";
import Cartdetails from "../feature/Cart/Cartdetails";
import EmptyCart from "../feature/Cart/EmptyCart";
import OrderSummary from "../feature/Cart/OrderSummary";
import Formlayout from "../feature/Form/FormLayout";
// import LoginForm from "../feature/Form/LoginForm";
import { useCartStore } from "../Store";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import PaymentForm from "../feature/Form/PaymentForm";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const [PayForm, setPayForm] = useState(false);
  return (
    <>
      {PayForm && (
        <motion.div
          className="absolute flex justify-center w-full   bg-white bg-opacity-80  z-10 "
          initial={{ scale: 1, y: "500vh" }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="md:w-9/12 w-full">
            <button
              className="text-white p-1 rounded-full text-2xl bg-red-700"
              onClick={() => {
                setPayForm(false);
              }}
            >
              <IoClose></IoClose>
            </button>
            <Formlayout FormTitle={"Payment"} type={"payment"}>
              <PaymentForm
                setPayForm={setPayForm} orderSummary={<OrderSummary type={"payment"} />}
              ></PaymentForm>
            </Formlayout>
          </div>
        </motion.div>
      )}

      <div className="container space-y-5">
        <h1 className="font-extrabold text-5xl uppercase">your cart</h1>
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col justify-center items-center md:flex-row gap-5 w-full p-5">
            <Cartdetails />
            <OrderSummary setPayForm={setPayForm} />
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
