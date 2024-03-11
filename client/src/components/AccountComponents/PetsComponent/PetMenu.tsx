import { useAppSelector } from "../../../redux/hooks";
import GlassWrapper from "../../GlassWrapper/GlassWrapper";
import styles from "./PetMenu.module.css";
import { Link } from "react-router-dom";

export default function PetMenu(): JSX.Element {
  const pets = useAppSelector((store) => store.petSlice.pets);
  return (
    <div className={styles.menu}>
      <Link
        className={styles.link}
        style={{ textDecoration: "none" }}
        to="/account/pets/new"
      >
        <GlassWrapper width="100%">
          <div>Добавить друга</div>
        </GlassWrapper>
      </Link>

      {pets.map((pet) => (
        <Link
          className={styles.link}
          style={{ textDecoration: "none" }}
          key={pet.id}
          to={`/account/pets/${pet.id}`}
        >
          <GlassWrapper width="100%">
            <div className={styles.iconText}>
              {pet.petType === 1 ? (
                <img
                  className={styles.iconCat}
                  src="/img/cat-orange.png"
                  alt="cat"
                />
              ) : (
                <img
                  className={styles.iconDog}
                  src="/img/dog-orange.png"
                  alt="dog"
                />
              )}
              {pet.petName}
            </div>
          </GlassWrapper>
        </Link>
      ))}
    </div>
  );
}
