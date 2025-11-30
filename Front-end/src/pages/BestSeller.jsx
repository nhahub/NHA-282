import { useProducts } from "../feature/Products/useProducts";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";
import { useState } from "react";
import { PAGE_SIZE } from "../utils/constance";
// import ProductCard from "../feature/Products/ProductCard";
import ProductsCollection from "../feature/Products/ProductsCollections";
import { Link } from "react-router-dom";
// import { backendUrl } from "../App";
// import CollectionCard from "../feature/Home/CollectionCard";

function BestSeller() {
  const { Products, isLoading } = useProducts();
  const bestSellerData = Products?.filter((item) => item.bestseller === true);

  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(bestSellerData?.length / PAGE_SIZE);

  const lastIndex = currentPage * PAGE_SIZE;
  const firstIndex = lastIndex - PAGE_SIZE;
  const currentPost = bestSellerData?.slice(firstIndex, lastIndex);

  if (bestSellerData?.length === 0)
    return (
      <div className="container flex justify-center items-center h-80">
        <Link to={"/"}>
          <h1 className="font-bold text-5xl">Soon..</h1>
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
            <li>{`Shop >`}</li>
            <li>{`Best Seller `}</li>
          </ul>
        </div>

        <ProductsCollection products={currentPost}></ProductsCollection>

        {pageCount > 1 && (
          <div className="flex-row justify-center items-center">
            <Pagination
              totalPost={bestSellerData.length}
              postPage={PAGE_SIZE}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default BestSeller;
