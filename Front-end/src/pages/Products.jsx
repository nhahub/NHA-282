import { useProducts } from "../feature/Products/useProducts";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";
import { useState } from "react";
import { PAGE_SIZE } from "../utils/constance";
// import ProductCard from "../feature/Products/ProductCard";
import ProductsCollection from "../feature/Products/ProductsCollections";
// import { backendUrl } from "../App";
// import CollectionCard from "../feature/Home/CollectionCard";

function Products() {
  const { Products, isLoading } = useProducts();
  // const [testProducts, setTest] = useState();
  // console.log(Products);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch(backendUrl + "/api/product/list"); // Adjust the URL if needed
  //       const data = await response.json();

  //       if (data.success) {
  //         setTest(data.products);
  //       } else {
  //         console.log("Failed to load products");
  //       }
  //     } catch (err) {
  //       console.log("Something went wrong. Please try again later.");
  //     }
  //   };

  //   fetchProducts();
  // }, [setTest]);
  // console.log(testProducts);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * PAGE_SIZE;
  const firstIndex = lastIndex - PAGE_SIZE;
  const currentPost = Products?.slice(firstIndex, lastIndex);
  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="flex-col gap-10 container">
        <div className=" md:px-5 px-5">
          <ul className="flex  gap-2">
            <li>{`Home >`}</li>
            <li>{`Shop >`}</li>
            <li>{`All categories `}</li>
          </ul>
        </div>

        <ProductsCollection products={currentPost}></ProductsCollection>

        <div className=" flex-row justify-center items-center">
          <Pagination
            totalPost={Products?.length}
            postPage={PAGE_SIZE}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}

export default Products;
