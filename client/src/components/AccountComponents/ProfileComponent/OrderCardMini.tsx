import { Link } from 'react-router-dom';
import { OrderType } from '../../../redux/orderSlice';
import styles from './OrderCardMini.module.css';
import GlassWrapper from '../../GlassWrapper/GlassWrapper';
import { useEffect, useState } from 'react';
import CardGlassWrapper from '../../GlassWrapper/CardGlassWrapper';

function checkDateEntrance(dateIn: Date | string, dateOut: Date | string): ['orange' | 'green' | 'blue', number] {
  const realDateIn = new Date(dateIn);
  const realDateOut = new Date(dateOut);
  const today = new Date();

  const dateToCount = new Date(realDateIn);
  const datesArray = [];
  while (dateToCount <= realDateOut) {
    datesArray.push(new Date(dateToCount));
    dateToCount.setDate(dateToCount.getDate() + 1);
  }

  if (today < realDateIn) {
    return ['orange', 100];
  } else if (today > realDateOut) {
    return ['green', 100];
  } else {
    const dateIndex = datesArray.findIndex((date) => date.toDateString() === today.toDateString());
    return ['blue', Math.ceil((100 / datesArray.length) * dateIndex)];
  }
}

const getFancyDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};

export default function OrderCardMini({ order }: { order: OrderType }) {
  const [status, setStatus] = useState<['orange' | 'green' | 'blue', number]>(['orange', 100]);

  useEffect(() => {
    setStatus(checkDateEntrance(order.orderDateIn, order.orderDateOut));
  }, [order]);

  return (
    <Link className={styles.link} style={{ textDecoration: 'none' }} to={`/account/orders/${order.id}`}>
      <CardGlassWrapper>
        <div className={styles.container}>
          <div className={styles.petName}>{order.Pet.petName}</div>
          <div className={styles.petBreed}>{order.Pet.petType === 1 ? 'Кошка' : 'Собака'}</div>
          <div className={styles.dateContainer}>
            <div>От {getFancyDate(order.orderDateIn)}</div>
            <div>До {getFancyDate(order.orderDateOut)}</div>
          </div>
          {status[0] === 'orange' ? (
            <span style={{ color: 'lightyellow' }}>В ожидании</span>
          ) : status[0] === 'blue' ? (
            <span style={{ color: 'lightblue' }}>В работе</span>
          ) : (
            <span style={{ color: 'lightgreen' }}>Выполнен</span>
          )}
        </div>
      </CardGlassWrapper>
    </Link>
  );
}
