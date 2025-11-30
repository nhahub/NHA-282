// import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { backendUrl } from "../App";
import Cookies from "js-cookie";

export async function getOrders(userId) {
  //   const userId = Cookies.get("userId");
  const token = Cookies.get("Token");

  const response = await fetch(
    backendUrl + `/api/order/userorders/?userId=${userId}`,
    {
      method: "GET", // or 'POST' if you're sending data
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    toast.error(`${data.message}`);
    throw new Error("Failed to register user: " + data.message);
  }

  const orders = data.orders;
  console.log("orders:", orders);
  return orders; // Return the response data
}
