import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProducts";
import { useParams } from "react-router-dom";

export function useProduct() {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: Product,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  return { isLoading, error, Product };
}
