import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import styles from './PetCard.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCheckAllPets, fetchDelPet } from '../../../redux/pet/async-action';
import { Button } from '@mui/material';

export default function PetCard() {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const navigate = useNavigate();
  const params = useParams();
  const pet = useAppSelector((store) => store.petSlice.pets.find((pet) => params.petId && pet.id === +params.petId));
  const dispatch = useAppDispatch();

  const deleteHandler = async (): Promise<void> => {
    if (pet?.id) {
      dispatch(fetchDelPet(pet.id));
      const filtered = pets.filter((el) => el.id !== pet.id);
      navigate(`/account/pets/${filtered.length ? filtered[0].id : ``}`);
    }
  };
  return (
    <div className={styles.container}>
      <>
        <h2>Карточка {pet?.petName}</h2>
        <div className={styles.photos}>
          {pet?.PetImages?.map((petImage) => (
            <div className={styles.photo}>
              <img src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/pets/${petImage.link}`} alt="imagePet" />
            </div>
          ))}
        </div>
        <div className={styles.info}>
          <span>Кличка животного: {pet?.petName}</span>
          <span>Порода животного: {pet?.petBreed}</span>
          <span>Пол животного: {pet?.petGender}</span>
          <span>Возраст животного в годах: {pet?.petAge}</span>
          <span>Стерилизация животного: {pet?.petIsSprayed ? 'Да' : 'Нет'}</span>
          <span>Дополнительная информация о животном: {pet?.petAbout}</span>
        </div>
        <div>
          <Button onClick={() => navigate(`/account/pets/edit/${pet?.id}`)} className={styles.editButton} variant="contained">
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
