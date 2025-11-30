/* eslint-disable react/prop-types */
import { useCartStore } from "../../Store";
import { formatCurrency } from "../../utils/helper";
import { BsArrowRight } from "react-icons/bs";

function OrderSummary({ type, setPayForm }) {
  const cart = useCartStore((state) => state.cart);
  const discount = 10;
  const delivery = 10;
  const totalPrice = Math.floor(
    cart
      .map((item) => item.price * item.quantity)
      .reduce((acc, curr) => acc + curr, 0)
  );
  console.log(totalPrice);

  if (type === "payment") {
    return (
      <div className="md:mt-10 grow p-10 w-full text-left  sm:mt-8 ">
        <h1 className="font-bold text-xl md:text-2xl capitalize">
          order summary
        </h1>
        <div className="space-y-4 rounded-lg rounded-br-none  rounded-bl-none border border-gray-100 bg-gray-50 p-6 ">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">
                Original price
              </dt>
              <dd className="text-base font-medium text-gray-900">
                {formatCurrency(totalPrice)}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">Savings</dt>
              <dd className="text-base font-medium text-red-500">
                -{formatCurrency(discount)}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">
                Delivery Fee
              </dt>
              <dd className="text-base font-medium text-gray-900 ">
                {formatCurrency(delivery)}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
            <dt className="text-base font-bold text-gray-900 ">Total</dt>
            <dd className="text-base font-bold text-gray-900 ">
              {formatCurrency(totalPrice - discount - delivery)}
            </dd>
          </dl>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-6 grow  w-full md:w-1/3 sm:mt-8 lg:mt-0 ">
      <h1 className="font-bold text-xl md:text-2xl capitalize">
        order summary
      </h1>
      <div className="space-y-4 rounded-lg rounded-br-none  rounded-bl-none border border-gray-100 bg-gray-50 p-6 ">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              Original price
            </dt>
            <dd className="text-base font-medium text-gray-900">
              {formatCurrency(totalPrice)}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Savings</dt>
            <dd className="text-base font-medium text-red-500">
              -{formatCurrency(discount)}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              Delivery Fee
            </dt>
            <dd className="text-base font-medium text-gray-900 ">
              {formatCurrency(delivery)}
            </dd>
          </dl>
        </div>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
          <dt className="text-base font-bold text-gray-900 ">Total</dt>
          <dd className="text-base font-bold text-gray-900 ">
            {formatCurrency(totalPrice - discount - delivery)}
          </dd>
        </dl>
      </div>
      <button
        onClick={() => {
          setPayForm(true);
        }}
        className="flex items-center text-base md:text-xl justify-center font-semibold gap-2 text-white bg-mblack w-full  py-2 md:py-3 rounded-2xl rounded-tr-none rounded-tl-none transition-all duration-500 ease-in-out hover:bg-white hover:text-mblack cursor-pointer whitespace-nowrap"
      >
        Go to Checkout <BsArrowRight />{" "}
      </button>
    </div>
  );
}

export default OrderSummary;
