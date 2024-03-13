import { Outlet } from 'react-router-dom';
import styles from './OrderPage.module.css';
import OrdersComponent from '../../components/AccountComponents/OrdersComponent/OrdersComponent';
import GlassWrapper from '../../components/GlassWrapper/GlassWrapper';

export default function OrderPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <div styles={{ maxHeight: '70vh' }}>
        <GlassWrapper width="300px" padding={'6px'}>
          <OrdersComponent />
        </GlassWrapper>
      </div>
      <GlassWrapper>
        <Outlet />
      </GlassWrapper>
    </div>
  );
}
