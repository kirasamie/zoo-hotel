import { Link } from "react-router-dom";
import { OrderType } from "../../../redux/orderSlice";
import styles from "./OrderCardMini.module.css";
export default function OrderCardMini({ order }: { order: OrderType }) {
  return (
    <div className={styles.container}>
      <Link to={`/account/orders/${order.id}`}>
        <div className={styles.petName}>{order.Pet.petName}</div>
      </Link>
      <div className={styles.petBreed}>
        {order.Pet.petType === 1 ? "Кошка" : "Собака"}
      </div>
      <div className={styles.dateContainer}>
        <div>{order.orderDateIn}</div>
        <div>-</div>
        <div>{order.orderDateOut}</div>
      </div>

      <div>{order.paymentStatus ? "Оплачено" : "Не оплачено"}</div>
    </div>
  );
}
