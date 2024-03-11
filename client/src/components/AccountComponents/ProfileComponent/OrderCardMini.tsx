import { Link } from "react-router-dom";
import { OrderType } from "../../../redux/orderSlice";
import styles from "./OrderCardMini.module.css";
import GlassWrapper from "../../GlassWrapper/GlassWrapper";
export default function OrderCardMini({ order }: { order: OrderType }) {
  return (
    <Link
      className={styles.link}
      style={{ textDecoration: "none" }}
      to={`/account/orders/${order.id}`}
    >
      <GlassWrapper className={styles.container}>
        <div className={styles.petName}>{order.Pet.petName}</div>

        <div className={styles.petBreed}>
          {order.Pet.petType === 1 ? "Кошка" : "Собака"}
        </div>
        <div className={styles.dateContainer}>
          <div>{order.orderDateIn}</div>
          <div>-</div>
          <div>{order.orderDateOut}</div>
        </div>

        <div className={styles.paymentStatus}>
          {order.paymentStatus ? "Оплачено" : "Не оплачено"}
        </div>
      </GlassWrapper>
    </Link>
  );
}
