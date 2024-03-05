import { useAppSelector } from "../../../redux/hooks";
import { selectPets } from "../../../redux/pet/petSlice";
import styles from "./PetMenu.module.css";
import { Link } from "react-router-dom";

export default function PetMenu() {
  const pets = useAppSelector(selectPets);
  return (
    <div className={styles.menu}>
      <Link to="/account/pets/new">Добавить друга</Link>
      {pets.map((pet) => {
        return (
          <Link to={`/account/pets/${pet.id}`}>Карточка {pet.petName}</Link>
        );
      })}
    </div>
  );
}
