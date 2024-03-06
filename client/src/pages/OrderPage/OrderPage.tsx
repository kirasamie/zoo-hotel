import { Outlet } from "react-router-dom";
import styles from "./OrderPage.module.css";
import OrdersComponent from "../../components/AccountComponents/OrdersComponent/OrdersComponent";

export default function OrderPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <OrdersComponent />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
