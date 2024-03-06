import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import styles from './OrdersComponent.module.css';
import { Link } from 'react-router-dom';

export default function OrdersComponent(): JSX.Element {
  const ordersByUser = useAppSelector((store) => store.orderSlice.ordersUser);
  console.log(ordersByUser);
  return (
    <div className={styles.menu}>
      {ordersByUser?.map((order, i) => (
        <Link key={order.id} to={`/account/orders/${order.id}`}>
          <br />
          Заказ №{i + 1},{order.orderDateIn}-{order.orderDateOut}
        </Link>
      ))}
    </div>
  );
}
