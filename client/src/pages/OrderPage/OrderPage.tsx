import { Outlet } from 'react-router-dom';
import styles from './OrderPage.module.css';
import OrdersComponent from '../../components/AccountComponents/OrdersComponent/OrdersComponent';
import { useAppSelector } from '../../redux/hooks';

export default function OrderPage(): JSX.Element {
  const isWorker = useAppSelector((store) => store.userSlice.info.isWorker);
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
