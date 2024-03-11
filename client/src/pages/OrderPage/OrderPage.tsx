import { Outlet } from 'react-router-dom';
import styles from './OrderPage.module.css';
import OrdersComponent from '../../components/AccountComponents/OrdersComponent/OrdersComponent';
import { useAppSelector } from '../../redux/hooks';
import GlassWrapper from '../../components/GlassWrapper/GlassWrapper';

export default function OrderPage(): JSX.Element {
  const isWorker = useAppSelector((store) => store.userSlice.info.isWorker);
  return (
    <div className={styles.container}>
      <GlassWrapper width="300px">
        <OrdersComponent />
      </GlassWrapper>

      <GlassWrapper>
        <Outlet />
      </GlassWrapper>
    </div>
  );
}
