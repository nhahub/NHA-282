import { Link, useParams } from "react-router-dom";
import { useProducts } from "../feature/Products/useProducts";
import Spinner from "../ui/Spinner";
import ProductsCollection from "../feature/Products/ProductsCollections";
import Pagination from "../ui/Pagination";
import { useState } from "react";
import { PAGE_SIZE } from "../utils/constance";

function Categories() {
  const { type } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { Products, isLoading } = useProducts();

  const filteredProducts = Products?.filter(
    (product) => product.category === type
  );

  if (isLoading) return <Spinner />;

  if (filteredProducts.length === 0)
    return (
      <div className="container flex justify-center items-center h-80">
        <Link to={"/"}>
          <h1 className="font-bold text-5xl">Soon..</h1>
        </Link>
      </div>
    );

  // Pagination logic
  const pageCount = Math.ceil(filteredProducts.length / PAGE_SIZE);

  if (currentPage > pageCount) {
    setCurrentPage(pageCount);
  }

  const lastIndex = currentPage * PAGE_SIZE;
  const firstIndex = lastIndex - PAGE_SIZE;
  const currentPost = filteredProducts.slice(firstIndex, lastIndex);

  return (
    <>
      <div className="flex-col gap-10 container">
        <div className="md:px-5 px-5">
          <ul className="flex gap-2">
            {/* make it dynamic */}
            <li>{`Home >`}</li>
            <li>{`Shop >`}</li>
            <li>{`Men >`}</li>
          </ul>
        </div>

        <ProductsCollection products={currentPost}></ProductsCollection>

        {pageCount > 1 && (
          <div className="flex-row justify-center items-center">
            <Pagination
              totalPost={filteredProducts.length}
              postPage={PAGE_SIZE}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Categories;
