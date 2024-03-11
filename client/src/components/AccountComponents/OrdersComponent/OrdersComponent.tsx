import { useAppSelector } from '../../../redux/hooks';
import { OrderType } from '../../../redux/orderSlice';
import CardGlassWrapper from '../../GlassWrapper/CardGlassWrapper';
import StyledButton from '../../GlassWrapper/StyledButton';
import OrderProgressBar from './OrderProgressBar';
import styles from './OrdersComponent.module.css';
import { Link } from 'react-router-dom';

export default function OrdersComponent(): JSX.Element {
  const ordersByUser = useAppSelector((store) => store.orderSlice.ordersUser);
  const ordersByWorker = useAppSelector((store) => store.orderSlice.ordersWorker);
  const user = useAppSelector((store) => store.userSlice.info);

  const getDate = (dateStr: string): string => new Date(dateStr).toLocaleDateString().slice(0, -5);

  const OrderLink = ({ order }: { order: OrderType }) => {
    return (
      <Link key={order.id} to={`/account/orders/${order.id}`}>
        <div className={styles.linkWrapper}>
          <CardGlassWrapper>
            <h3>Заказ №{order.id}</h3>
            <span>
              Время: {getDate(order.orderDateIn)} - {getDate(order.orderDateOut)}
            </span>
            <OrderProgressBar dateIn={order.orderDateIn} dateOut={order.orderDateOut} />
          </CardGlassWrapper>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.menu}>
      {user.isWorker ? (
        ordersByWorker?.map((order) => <OrderLink order={order} />)
      ) : ordersByUser.length ? (
        ordersByUser?.map((order) => <OrderLink order={order} />)
      ) : (
        <Link to='/rooms'>
          <StyledButton fullWidth>Забронировать комнатку!</StyledButton>
        </Link>
      )}
    </div>
  );
}
