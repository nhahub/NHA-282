// const{userId,items,amount,address} = req.body;
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { backendUrl } from "../App";
// import { useCartStore } from "../Store";

export async function payCOD(orderData, cartData) {
  const token = Cookies.get("Token");

  console.log("orderData", orderData);
  const address = {
    address: orderData.address,
    city: orderData.city,
    state: orderData.state,
    zipcode: orderData.zipcode,
    country: orderData.country,
  };
  const userId = Cookies.get("userId");
  const reqBody = {
    items: cartData,
    address,
    userId,
  };

  const response = await fetch(backendUrl + "/api/order/place", {
    method: "POST", // Specify the method
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Ensure the server knows you're sending JSON
    },

    body: JSON.stringify(reqBody), // Send the user data as JSON in the request body
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    toast.error(`${data.message}`);
    throw new Error("Failed to register user: " + data.message);
  }
  const { success, message } = data;
  return { success, message }; // Return the response data
}

export async function payStripe(orderData, cartData) {
  // console.log("orderData", orderData);
  const token = Cookies.get("Token");
  const address = {
    address: orderData.address,
    city: orderData.city,
    state: orderData.state,
    zipcode: orderData.zipcode,
    country: orderData.country,
  };
  const userId = Cookies.get("userId");
  const reqBody = {
    items: cartData,
    address,
    userId,
  };

  const response = await fetch(backendUrl + "/api/order/stripe", {
    method: "POST", // Specify the method
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Ensure the server knows you're sending JSON
    },
    body: JSON.stringify(reqBody), // Send the user data as JSON in the request body
  });

  const data = await response.json();
  console.log("response from data base: ", data);

  if (!response.ok) {
    toast.error(`${data.message}`);
    throw new Error("Failed to register user: " + data.message);
  }
  const { success, session_url } = data;
  return { success, session_url }; // Return the response data
}
