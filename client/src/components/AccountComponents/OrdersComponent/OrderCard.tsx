import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import styles from './PetCard.module.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function OrderCard(): JSX.Element {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const navigate = useNavigate();
  const params = useParams();
  const pet = useAppSelector((store) =>
    store.petSlice.pets.find((pet) => params.petId && pet.id === +params.petId)
  );
  const dispatch = useAppDispatch();

  const deleteHandler = async (): Promise<void> => {
    if (pet?.id) {
      dispatch(fetchDelPet(pet.id))
      const filtered =  pets.filter((el) => el.id !== pet.id);
      navigate(`/account/pets/${filtered.length ? filtered[0].id : ``}`)
    }
  };
  
  return (
    <div className={styles.container}>
      <>
        <h2>Карточка {pet?.petName}</h2>
        <div className={styles.photos}>
          <div
            className={styles.photo}
            style={{
              backgroundImage: `url(https://lapkins.ru/upload/resize_cache/uf/8a2/293_293_2/8a236308bc2b290669dda88b3ab09f55.jpg)`,
            }}
          />
          <div
            className={styles.photo}
            style={{
              backgroundImage: `url(https://lapkins.ru/upload/resize_cache/uf/ea0/293_293_2/ea01f805be25abc46416a8b948a628d3.jpg)`,
            }}
          />
          <div
            className={styles.photo}
            style={{
              backgroundImage: `url(https://lapkins.ru/upload/resize_cache/uf/0fa/293_293_2/0fac6580aeb86f1960557fab7ab168de.jpg)`,
            }}
          />
        </div>
        <div className={styles.info}>
          <span>Кличка животного: {pet?.petName}</span>
          <span>Порода животного: {pet?.petBreed}</span>
          <span>Пол животного: {pet?.petGender}</span>
          <span>Возраст животного в годах: {pet?.petAge}</span>
          <span>
            Стерилизация животного: {pet?.petIsSprayed ? 'Да' : 'Нет'}
          </span>
          <span>Дополнительная информация о животном: {pet?.petAbout}</span>
        </div>
        <div>
          <Button
            onClick={() => navigate(`/account/pets/edit/${pet?.id}`)}
            className={styles.editButton}
            variant='contained'
          >
            Редактировать
          </Button>
          <Button onClick={() => void deleteHandler()} variant='contained'>
            Удалить
          </Button>
        </div>
      </>
    </div>
  );
}
