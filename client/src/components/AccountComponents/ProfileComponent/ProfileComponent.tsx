import styles from './Profile.module.css';
import { useAppSelector } from '../../../redux/hooks';
import PetCardMini from './PetCardMini';
import OrderCardMini from './OrderCardMini';
import ProfileCard from './ProfileCard';
import GlassWrapper from '../../GlassWrapper/GlassWrapper';

export default function ProfileComponent() {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const orders = useAppSelector((store) => store.orderSlice.ordersUser);
  const user = useAppSelector((store) => store.userSlice.info);
  return (
    <div className={styles.container}>
      <ProfileCard />

      {!user.isWorker && (
        <div className={styles.contentContainer}>
          <GlassWrapper width="100%">
            <h2 className={styles.title}>ПИТОМЦЫ</h2>
            <div className={styles.petContainer}>
              {pets.map((pet) => {
                return <PetCardMini pet={pet} />;
              })}
            </div>
          </GlassWrapper>

          <GlassWrapper width="100%">
            <h2 className={styles.title}>ЗАКАЗЫ</h2>
            <div className={styles.orderContainer}>
              {orders.map((order) => {
                return <OrderCardMini order={order} />;
              })}
            </div>
          </GlassWrapper>
        </div>
      )}
    </div>
  );
}
