import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "./PetCard.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCheckAllPets,
  fetchDelPet,
} from "../../../redux/pet/async-action";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function PetCard() {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const navigate = useNavigate();
  const params = useParams();
  const pet = useAppSelector((store) =>
    store.petSlice.pets.find((pet) => params.petId && pet.id === +params.petId)
  );
  const dispatch = useAppDispatch();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (isDeleted) {
      if (pets.length && pets[0].id) {
        navigate(`/account/pets/${pets[0].id}`);
      } else {
        navigate("/account/pets/empty");
      }
    }
  }, [pets]);

  const deleteHandler = async (): Promise<void> => {
    if (pet?.id) {
      dispatch(fetchDelPet(pet.id));
      setIsDeleted(true);
    }
  };
  return (
    <div className={styles.container}>
      <>
        {pet?.petType === 1 ? (
          <h2 className={styles.title}>
            {" "}
            <img className={styles.iconCat} src="/img/cat.png" alt="cat" />
            {pet?.petName}
          </h2>
        ) : (
          <h2 className={styles.title}>
            {" "}
            <img className={styles.iconDog} src="/img/dog.png" alt="dog" />
            {pet?.petName}
          </h2>
        )}

        <div className={styles.photos}>
          {pet?.PetImages?.map((petImage) => (
            <div className={styles.photo}>
              <img
                src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/pets/${
                  petImage.link
                }`}
                alt="imagePet"
              />
            </div>
          ))}
        </div>
        <div className={styles.info}>
          <span>Кличка животного: {pet?.petName}</span>
          <span>Порода животного: {pet?.petBreed}</span>
          <span>Пол животного: {pet?.petGender}</span>
          <span>Возраст животного в годах: {pet?.petAge}</span>
          <span>
            Стерилизация животного: {pet?.petIsSprayed ? "Да" : "Нет"}
          </span>
          <span>Дополнительная информация о животном: {pet?.petAbout}</span>
        </div>
        <div>
          <Button
            onClick={() => navigate(`/account/pets/edit/${pet?.id}`)}
            className={styles.editButton}
            variant="contained"
          >
            Редактировать
          </Button>
          <Button onClick={() => void deleteHandler()} variant="contained">
            Удалить
          </Button>
        </div>
      </>
    </div>
  );
}
