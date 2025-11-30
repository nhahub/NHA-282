import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
import { getOrders } from "../../services/apiOrders";

export function useOrderList(userId) {
  const {
    isLoading,
    error,
    data: Orders,
  } = useQuery({
    queryKey: ["OrderList", userId],
    queryFn: () => getOrders(userId),
  });

  console.log("orders in cutomHook", Orders);

  return { isLoading, error, Orders };
}
