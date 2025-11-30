import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export function useProducts() {
  const {
    isLoading,
    error,
    data: Products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { isLoading, error, Products };
}
