import toast from "react-hot-toast";
import { backendUrl } from "../App";

export async function registerUser(userData) {
  delete userData.phoneNumber;
  const response = await fetch(backendUrl + "/api/user/register", {
    method: "POST", // Specify the method
    headers: {
      "Content-Type": "application/json", // Ensure the server knows you're sending JSON
    },
    body: JSON.stringify(userData), // Send the user data as JSON in the request body
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(`${data.message}`);
    throw new Error("Failed to register user: " + data.message);
  }
  const { token, status } = data;
  const user = data.data.newuser;
  // console.log("User registered successfully: ", data);
  return { token, status, user }; // Return the response data
}

export async function logInUser(userData) {
  const response = await fetch(backendUrl + "/api/user/login", {
    method: "POST", // Specify the method
    headers: {
      "Content-Type": "application/json", // Ensure the server knows you're sending JSON
    },
    body: JSON.stringify(userData), // Send the user data as JSON in the request body
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(`${data.message}`);
    throw new Error("Failed to register user: " + data.message);
  }
  // console.log("data from the server:", data);
  const { token, status } = data;
  const user = data.data.user;
  // console.log("User logged in successfully: ", data);
  return { token, status, user }; // Return the response data
}
