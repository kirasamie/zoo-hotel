import styles from "./Profile.module.css";
import { useAppSelector } from "../../../redux/hooks";
import PetCardMini from "./PetCardMini";
import OrderCardMini from "./OrderCardMini";
import ProfileCard from "./ProfileCard";

export default function ProfileComponent() {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const orders = useAppSelector((store) => store.orderSlice.ordersUser);
  return (
    <div className={styles.container}>
      <ProfileCard />
      <div className={styles.contentContainer}>
        <h2>ПИТОМЦЫ</h2>
        <div className={styles.petContainer}>
          {pets.map((pet) => {
            return <PetCardMini pet={pet} />;
          })}
        </div>
        <h2>ЗАКАЗЫ</h2>
        <div className={styles.orderContainer}>
          {orders.map((order) => {
            return <OrderCardMini order={order} />;
          })}
        </div>
      </div>
    </div>
  );
}
