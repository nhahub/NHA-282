/* eslint-disable react/prop-types */

// import { ShowMore } from "@re-dev/react-truncate";
import { useParams } from "react-router-dom";
import { useProduct } from "./useProduct";
// import { IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import StarRating from "../../ui/StarRating";
import { formatCurrency } from "../../utils/helper";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import SizeButtons from "../../Components/SizeButtons";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useCartStore } from "../../Store";
import toast from "react-hot-toast";
/////////////////////////////////////////////////////////////////////

import { useRef } from "react";
import { ShowMore } from "@re-dev/react-truncate";

const MyMoreButton = ({ onClick }) => (
  <button onClick={onClick} className="font-semibold text-black ml-2">
    Show More...
  </button>
);

const MyLessButton = ({ onClick }) => (
  <button onClick={onClick} className="font-semibold text-black ml-2">
    Show Less
  </button>
);

function ProductDetails() {
  const { id } = useParams();
  const { Product, isLoading } = useProduct();
  const [activeimg, setActiveImg] = useState();
  const [active, setActive] = useState(1);
  const [size, setSize] = useState("");
  const [count, setCount] = useState(1);
  // console.log("here:", Product);

  // SHOW MORE

  const ref = useRef(null);

  const toggleLines = (e) => {
    if (ref.current) {
      ref.current.toggleLines(e);
    }
  };

  const addToCart = useCartStore((state) => state.addToCart);
  function handleAddItem() {
    if (!size) {
      toast.error("Please select a size and color.");
      return;
    }

    const newItem = {
      id: Product?._id,
      name: Product?.name,
      price: Product?.price,
      image: Product?.image[0],
      size,
      quantity: count,
    };

    addToCart(newItem);
    toast.success("Item added");
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="container space-y-10 ">
      <div className="md:px-5 px-0">
        <ul className="flex  gap-2">
          <li>{`Home >`}</li>
          <li>{`Shop >`}</li>
          <li>{`${Product.category} >`}</li>
          <li className="max-w-56 max-h-7 md:max-w-96 truncate">{`${Product.name
            .split(" ")
            .slice(-4)
            .join(" ")}`}</li>
        </ul>
      </div>
      <div className="flex-col flex gap-3  justify-center md:grid md:grid-cols-6 md:gap-3 md:justify-start ">
        <div className="md:col-span-1 md:flex  md:items-start  ">
          <div className="flex-col hidden md:flex gap-3 md:justify-start md:items-center mt-32 ">
            {Product.image.map((url, index) => {
              return (
                <img
                  src={url}
                  key={index}
                  alt={`img 1 for product id ${id}`}
                  className={`cursor-pointer w-1/2  rounded-lg  ${
                    active === index ? "border border-black" : ""
                  }`}
                  onClick={() => {
                    setActiveImg(url);
                    setActive(index);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="col-span-2 rounded-xl w-full hidden  md:flex justify-center md:items-start  ">
          <img
            src={activeimg || Product.image[0]}
            alt={`img 1 for product id ${id}`}
            className={`w-2/3 rounded-xl md:mt-20`}
          />
        </div>
        {/* responsive images */}
        <div className="flex justify-start items-start md:hidden">
          <img
            src={activeimg || Product.image[0]}
            alt={`img 1 for product id ${id}`}
            className={`w-1/2 rounded-xl md:hidden block`}
          />
        </div>

        <div className="md:hidden flex  gap-3 w-60">
          {Product.image.map((url, index) => {
            return (
              <img
                src={url}
                key={index}
                alt={`img 1 for product id ${id}`}
                className={`cursor-pointer w-1/3  rounded-lg  ${
                  active === index ? "border border-black" : ""
                }`}
                onClick={() => {
                  setActiveImg(url);
                  setActive(index);
                }}
              />
            );
          })}
        </div>
        <div className="md:col-span-3 space-y-2 md:space-y-6">
          <div className="space-y-3 border-b border-gray-300 pb-3 md:pb-6">
            <h1 className="font-extrabold text-2xl md:text-4xl ">
              {Product.name}
            </h1>
            <StarRating
              maxrating={5}
              size={24}
              defaultRating={Math.floor(Math.random() * 5 - 1 + 1)}
              text={true}
            />
            <div className="font-bold text-2xl">
              {formatCurrency(Product.price)}
            </div>
            <p className="text-xs md:text-sm w-2/3 text-gray-500 ">
              <ShowMore
                ref={ref}
                lines={3}
                more={<MyMoreButton onClick={toggleLines} />}
                less={<MyLessButton onClick={toggleLines} />}
              >
                {Product.description}
              </ShowMore>
            </p>
          </div>

          <div>
            <div className="pb-3 md:pb-6 pt-3 border-b border-gray-300 space-y-3">
              <span className="text-sm  text-gray-500">Choose Size</span>
              <SizeButtons
                size={size}
                setSize={setSize}
                sizes={Product.sizes}
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-1/3 md:w-40  py-2 gap-5 rounded-full px-3 bg-[#d4ccccd2] flex  justify-center items-center">
              <FaMinus
                className=" cursor-pointer w-full"
                onClick={() => {
                  if (count === 1) return;
                  setCount(count - 1);
                }}
              />
              <span className="font-semibold w-1">{count}</span>
              <FaPlus
                className=" cursor-pointer w-full"
                onClick={() => {
                  setCount(count + 1);
                }}
              />
            </div>
            <Button type={"Add"} onClick={handleAddItem}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
