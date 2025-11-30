/* eslint-disable react/prop-types */
// import ProductCard from "../Products/ProductCard";
// import { Link } from "react-router-dom";

import OrderCard from "./OrderCard";

function OrdersCollection({ firstIndex, orders }) {
  return (
    <div className="grid grid-cols-1 gap-5 py-10 container justify-center md:justify-around border-b-2 border-black md:grid-cols-4">
      {orders?.map((order, index) => (
        // <Link to={`/product/${item._id}`} key={item._id}>

        <div
          key={index}
          className="bg-gray-100 h-80 rounded-3xl md:max-w-72 mt-5"
        >
          {<OrderCard index={firstIndex + index + 1} order={order}></OrderCard>}
          {/* {console.log(item)} */}
        </div>
        // </Link>
      ))}
    </div>
  );
}

export default OrdersCollection;
