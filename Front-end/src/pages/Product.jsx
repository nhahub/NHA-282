import { Link } from "react-router-dom";
import { useProducts } from "../feature/Products/useProducts";
import Spinner from "../ui/Spinner";

function Product() {
  const { Products, isLoading } = useProducts();
  if (isLoading) return <Spinner />;
  console.log(Products);
  return (
    <div className="grid grid-cols-4 container justify-center">
      {Products.map((item) => (
        <Link to={`/product/${item.id}`} key={item.id}>
          {item.id}
        </Link>
      ))}
    </div>
  );
}

export default Product;
