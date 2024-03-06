import {  useAppSelector } from "../../../redux/hooks";
import styles from "./PetMenu.module.css";
import { Link } from "react-router-dom";

export default function PetMenu(): JSX.Element {
  const pets = useAppSelector((store) => store.petSlice.pets)
  return (
    <div className={styles.menu}>
      <Link to="/account/pets/new">Добавить друга</Link>
      {pets.map((pet) => (
          <Link key={pet.id} to={`/account/pets/${pet.id}`}>Карточка {pet.petName}</Link>
      )
      )}
    </div>
  );
}
