import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        fetchAllOrders(); // No need to await here
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Orders</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs text-black" key={index}>
              <img className="w-12" src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => (
                    <p className="py-0.5" key={index}>
                      {item.name} x {item.quantity} <span> {item.size} </span> {index !== order.items.length - 1 ? ',' : ''}
                    </p>
                  ))}
                </div>
                <div>
                  <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
                </div>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">Item : {order.items.length} </p>
                <p className="mt-3">Method : {order.paymentMethod} </p>
                <p>Payment : {order.Payment ? 'Done' : 'done'} </p>
                <p>Date : {new Date(order.Date).toLocaleDateString()} </p> {/* Fixed typo */}
              </div>
              <select value={order.status} className="p-2 font-semibold" onChange={(e) => statusHandler(e, order._id)}>
                <option value="OrderPlace">OrderPlace</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Orders;
