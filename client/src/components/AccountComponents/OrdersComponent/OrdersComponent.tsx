import { useAppSelector } from '../../../redux/hooks';
import styles from './OrdersComponent.module.css';
import { Link } from 'react-router-dom';

export default function OrdersComponent(): JSX.Element {
  const ordersByUser = useAppSelector((store) => store.orderSlice.ordersUser);
  const ordersByWorker = useAppSelector((store) => store.orderSlice.ordersWorker)
  const user = useAppSelector((store) => store.userSlice.info)

  console.log(ordersByWorker)
  return (
    <div className={styles.menu}>
      {user.isWorker ? ordersByWorker?.map((order, i) => (
        <Link key={order.id} to={`/account/orders/${order.id}`}>
          <br />
          Заказ №{i + 1},{order.orderDateIn}-{order.orderDateOut}
        </Link>
      )) : ordersByUser?.map((order, i) => (
        <Link key={order.id} to={`/account/orders/${order.id}`}>
          <br />
          Заказ №{i + 1},{order.orderDateIn}-{order.orderDateOut}
        </Link>
      ))}
    </div>
  );
}
