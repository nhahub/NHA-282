import Cookies from "js-cookie";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";
import { useState } from "react";
import { PAGE_SIZE } from "../utils/constance";
// import ProductCard from "../feature/Products/ProductCard";
// import ProductsCollection from "../feature/Products/ProductsCollections";
import { Link } from "react-router-dom";
import { useOrderList } from "../feature/Orders/useOrderList";
// import SmallCart from "../feature/Cart/SmallCart";
import OrdersCollection from "../feature/Orders/OrdersCollection";
// import { backendUrl } from "../App";
// import CollectionCard from "../feature/Home/CollectionCard";

function UserOrders() {
  const userId = Cookies.get("userId");

  const { Orders, isLoading } = useOrderList(userId);
  console.log("orders in user orders page: ", Orders);
  //   const bestSellerData = Products?.filter((item) => item.bestseller === true);

  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(Orders?.length / PAGE_SIZE);

  const lastIndex = currentPage * PAGE_SIZE;
  const firstIndex = lastIndex - PAGE_SIZE;
  const currentPost = Orders?.slice(firstIndex, lastIndex);

  if (Orders?.length === 0)
    return (
      <div className="container capitalize flex justify-center items-center h-80">
        <Link to={"/"}>
          <h1 className="font-bold text-3xl text-center">
            {"you don't have orders yet..."}
          </h1>
        </Link>
      </div>
    );
  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="flex-col gap-10 container">
        <div className=" md:px-5 px-5">
          <ul className="flex  gap-2">
            <li>{`Home >`}</li>
            <li>{`User >`}</li>
            <li>{`Order List `}</li>
          </ul>
        </div>

        <OrdersCollection
          firstIndex={firstIndex}
          orders={currentPost}
        ></OrdersCollection>

        {pageCount > 1 && (
          <div className="flex-row justify-center items-center">
            <Pagination
              totalPost={Orders?.length}
              postPage={PAGE_SIZE}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default UserOrders;
