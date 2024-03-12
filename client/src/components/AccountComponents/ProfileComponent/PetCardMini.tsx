import { Link } from "react-router-dom";
import { PetItemType } from "../../../models/Pet";
import styles from "./PetCardMini.module.css";
import GlassWrapper from "../../GlassWrapper/GlassWrapper";
import { useAppSelector } from "../../../redux/hooks";
export default function PetCardMini({ pet }: { pet: PetItemType }) {
  console.log(pet);
  
  return (
    <Link
      className={styles.link}
      style={{ textDecoration: "none" }}
      to={`/account/pets/${pet.id}`}
    >
      <GlassWrapper className={styles.container}>
        <div>
          <div
            className={styles.photo}
            style={{
              backgroundImage: `url(https://lapkins.ru/upload/resize_cache/uf/8a2/293_293_2/8a236308bc2b290669dda88b3ab09f55.jpg)`,
            }}
          />
        </div>

        <div className={styles.petName}>{pet.petName}</div>

        <div className={styles.petBreed}>{pet.petBreed}</div>
      </GlassWrapper>
    </Link>
  );
}
