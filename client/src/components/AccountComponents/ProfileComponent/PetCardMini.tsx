import { Link } from "react-router-dom";
import { PetItemType } from "../../../models/Pet";
import styles from "./PetCardMini.module.css";
export default function PetCardMini({ pet }: { pet: PetItemType }) {
  return (
    <div className={styles.container}>
      <div>
        <div
          className={styles.photo}
          style={{
            backgroundImage: `url(https://lapkins.ru/upload/resize_cache/uf/8a2/293_293_2/8a236308bc2b290669dda88b3ab09f55.jpg)`,
          }}
        />
      </div>
      <Link to={`/account/pets/${pet.id}`}>
        <div className={styles.petName}>{pet.petName}</div>
      </Link>

      <div className={styles.petBreed}>{pet.petBreed}</div>
    </div>
  );
}
