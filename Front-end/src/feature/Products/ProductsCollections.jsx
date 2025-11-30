/* eslint-disable react/prop-types */
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

function ProductsCollection({ products }) {
  return (
    <div className="grid grid-cols-2 gap-5 py-10 container justify-around border-b-2 border-black md:grid-cols-4">
      {products?.map((item) => (
        <Link to={`/product/${item._id}`} key={item._id}>
          <div className="bg-gray-100 h-80 rounded-3xl max-w-72 mt-5">
            <ProductCard
              id={item._id}
              img={item.image}
              price={item.price}
              title={item.name}
            />
            {/* {console.log(item)} */}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductsCollection;
