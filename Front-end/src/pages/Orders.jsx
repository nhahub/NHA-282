import { useParams } from "react-router-dom";
import UserOrdersCard from "../feature/Orders/UserOrdersCard";
import { useOrderList } from "../feature/Orders/useOrderList";
import Cookies from "js-cookie";

function Orders() {
  const userId = Cookies.get("userId");
  const { id } = useParams();

  const { Orders } = useOrderList(userId);
  const data = Orders?.filter((item) => item._id === id);
  return (
    <div className="container">
      {data?.map((order, index) => (
        <UserOrdersCard order={order} id={id} key={index} />
      ))}
    </div>
  );
}

export default Orders;
