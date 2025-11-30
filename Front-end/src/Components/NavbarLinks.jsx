/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

function NavbarLinks({ type, setClose }) {
  const nav = useNavigate();
  if (type === "col")
    return (
      <div className="flex gap-10 items-start mt-2 justify-between w-full capitalize">
        <ul className="flex-col space-y-3">
          <li
            className="hover:text-gray-400 duration-300 ease-in-out transition-all cursor-pointer"
            onClick={() => nav("/products")}
          >
            <a href="#home">Shop</a>
          </li>

          <li
            className="whitespace-nowrap hover:text-gray-400 duration-300 ease-in-out transition-all cursor-pointer"
            onClick={() => nav("/")}
          >
            <a href="#bestseller">Best Seller</a>
          </li>
          <li
            id="new"
            className="hover:text-gray-400 duration-300 ease-in-out transition-all cursor-pointer"
            onClick={() => nav("/")}
          >
            <a href="#category">catogories</a>
          </li>
          <li
            id="new"
            className="hover:text-gray-400 duration-300 ease-in-out transition-all cursor-pointer"
            onClick={() => nav("/verify")}
          >
            Orders
          </li>
        </ul>
        <button
          onClick={() => setClose(false)}
          className="bg-white px-2 text-black rounded-3xl pb-1 cursor-pointer hover:bg-red-500 hover:text-white"
        >
          x
        </button>
      </div>
    );
  else {
    return (
      <ul className="flex gap-16 text-xl font-bold capitalize">
        <li
          onClick={() => nav("/")}
          className="hover:text-gray-400 duration-300 ease-in-out transition-all cursor-pointer"
        >
          <a href="#home">Shop</a>
        </li>
        <li
          onClick={() => nav("/")}
          className="hover:text-gray-400 duration-300 ease-in-out transition-all cursor-pointer"
        >
          <a href="#bestseller">Best Seller</a>
        </li>
        <li
          onClick={() => nav("/")}
          className="hover:text-gray-400 duration-300 ease-in-out transition-all cursor-pointer"
        >
          <a href="#category">catogories</a>
        </li>
        <li
          onClick={() => nav("/verify")}
          className="hover:text-gray-400 duration-300 ease-in-out transition-all cursor-pointer"
        >
          Orders
        </li>
      </ul>
    );
  }
}

export default NavbarLinks;
