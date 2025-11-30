/* eslint-disable react/prop-types */
// import StarRating from "../../ui/StarRating";
// import { formatCurrency } from "../../utils/helper";

import Cookies from "js-cookie";
import { FaCheckCircle } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function OrderCard({ index, order }) {
  const username = Cookies.get("username");
//   console.log("new", order._id);
  return (
    <div className="text-start flex-col h-full gap-5 p-0 justify-between relative">
      <div className="bg-stone-600 flex justify-center rounded-md rounded-bl-none rounded-br-none p-1">
        <h1 className="text-white font-bold text-3xl h-10 truncate">
          Order #{index}
        </h1>
      </div>

      {/* order Details */}
      <div className="mt-5 p-3">
        <div className="font-bold text-xl italic">
          Ordered By
          <br></br>
          <span className="font-normal text-xl flex justify-between border-b-2 not-italic">
            {username}
            <span className="py-1.5">
              <FaUser></FaUser>
            </span>
          </span>
        </div>

        <div className="font-bold text-xl italic">
          status
          <br></br>
          <span className="font-normal text-xl flex justify-between border-b-2 not-italic">
            {order.status}
            <span className="py-1.5">
              <FaCheckCircle></FaCheckCircle>
            </span>
          </span>
        </div>

        <div className="font-bold text-xl italic">
          payment Method
          <br></br>
          <span className="font-normal text-xl flex justify-between not-italic ">
            {order.paymentMethod}
            <span className="py-1.5">
              {order.paymentMethod === "COD" ? (
                <FaMoneyBillAlt></FaMoneyBillAlt>
              ) : (
                <FaIdCard></FaIdCard>
              )}
            </span>
          </span>
        </div>
      </div>
      {/* put link here to order details page */}

      <Link
        to={`/order/${order._id}`}
        className="w-full bg-black text-white flex transition-all duration-300 justify-center rounded-bl-xl py-2 cursor-pointer rounded-br-xl hover:text-black hover:bg-white p-0 font-bold text-xl"
      >
        <button className="">Details</button>
      </Link>
    </div>
  );
}

export default OrderCard;
