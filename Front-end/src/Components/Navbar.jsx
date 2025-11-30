import { FiShoppingCart } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import Cookies from "js-cookie";
import Logo from "../ui/Logo";
import NavbarLinks from "./NavbarLinks";
import Sidebar from "../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../Store";
import { islogged, logOut } from "../services/Auth";
import Button from "../ui/Button";
// import useAuthStore from "../AuthStore";

function Navbar() {
  const [close, setClose] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const nav = useNavigate();
  return (
    <div className="w-full flex justify-center">
      <header className="flex gap-5  justify-between shadow-lg shadow-black-500/50 fixed bg-white z-50  container py-4 items-center mb-5 ">
        <div className="w-36 flex items-center gap-4 ">
          <div
            className="text-mblack text-3xl md:hidden"
            onClick={() => setClose(!close)}
          >
            <IoMenu />
          </div>
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        <div className="flex items-center gap-10">
          <div className="md:block hidden">
            <NavbarLinks />
          </div>
        </div>
        <div className="flex justify-center  gap-3">
          {islogged() ? (
            <>
              <div className="text-2xl ">
                <Link to={"/cart"} className="relative">
                  <span
                    className={`${
                      cart.length === 0 ? "hidden" : "inline-block"
                    } absolute top-3 whitespace-nowrap -mt-4 ms-2.5 rounded-full bg-danger px-[0.4em] py-[0.2em] text-[0.8rem] font-bold leading-none text-white bg-red-600 flex justify-center items-center`}
                  >
                    {cart.length}
                  </span>

                  <FiShoppingCart />
                </Link>
              </div>
              <div className="text-2xl  relative group">
                <FaRegCircleUser />
                <div
                  className="absolute top-5 left-0 w-48 max-w-xs p-4 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 invisible transition-all duration-200 ease-in-out
         group-hover:opacity-100 group-hover:visible transform -translate-x-full text-sm z-50"
                  id="hover-box"
                >
                  <p className="text-gray-700">
                    Hello,{" "}
                    <span id="user-name" className="font-bold">
                      {Cookies.get("username")}
                    </span>
                  </p>
                  <button
                    className="mt-2 px-3 py-2 bg-black border-solid border-white border-2 hover:border-white font-bold text-white rounded-lg hover:bg-red-950 focus:outline-none focus:ring"
                    onClick={() => {
                      nav("/");
                      logOut(clearCart);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex gap-8 md:gap-10 items-center justify-center">
              <Link to={"/login"} className="w-1/4">
                <Button type={"nav"}>login</Button>
              </Link>

              <Link to={"/signup"} className="w-1/4">
                <Button type={"nav"}>signup</Button>
              </Link>
            </div>
          )}
        </div>
      </header>
      <Sidebar close={close} setClose={setClose} />
    </div>
  );
}

export default Navbar;
