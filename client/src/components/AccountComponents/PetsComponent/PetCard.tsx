import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import styles from './PetCard.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDelPet } from '../../../redux/pet/async-action';
import { useEffect, useState } from 'react';
import StyledButton from '../../GlassWrapper/StyledButton';

export default function PetCard() {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const navigate = useNavigate();
  const params = useParams();
  const pet = useAppSelector((store) => store.petSlice.pets.find((pet) => params.petId && pet.id === +params.petId));
  const dispatch = useAppDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  console.log(pet);

  useEffect(() => {
    if (isDeleted) {
      if (pets.length && pets[0].id) {
        navigate(`/account/pets/${pets[0].id}`);
      } else {
        navigate('/account/pets/empty');
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
      {pet?.petType === 1 ? (
        <h2 className={styles.title}>
          {' '}
          <img className={styles.iconCat} src='/img/cat-orange.png' alt='cat' />
          {pet?.petName}
        </h2>
      ) : (
        <h2 className={styles.title}>
          {' '}
          <img className={styles.iconDog} src='/img/dog-orange.png' alt='dog' />
          {pet?.petName}
        </h2>
      )}

      <div className={styles.withoutButton}>
        <div className={styles.photoContainer}>
          {pet?.PetImages?.length !== 0 ? (
            <>
              {pet?.PetImages[0] && (
                <div className={styles.photoOne}>
                  <img className={styles.photoPet} src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/pets/${pet?.PetImages[0]?.link}`} alt='imagePet' />
                </div>
              )}

              {pet?.PetImages[1] && (
                <div className={styles.photoTwo}>
                  <img  className={styles.photoPet} src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/pets/${pet?.PetImages[1]?.link}`} alt='imagePet' />
                </div>
              )}

              {pet?.PetImages[2] && (
                <div className={styles.photoThree}>
                  <img  className={styles.photoPet} src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/pets/${pet?.PetImages[2]?.link}`} alt='imagePet' />
                </div>
              )}
            </>
          ) : pet?.petType === 1 ? (
            <div className={styles.photoOne}>
              <img className={styles.photoPet} src='/catAvatar.png' alt='cat' />
            </div>
          ) : (
            <div className={styles.photoOne}>
              <img className={styles.photoPet} src='/dogAvatar.png' alt='dog' />
            </div>
          )}
        </div>
        <div className={styles.info}>
          <span>
            Кличка: <span className={styles.petIndo}>{pet?.petName}</span>{' '}
          </span>
          <span>
            Порода: <span className={styles.petIndo}>{pet?.petBreed}</span>{' '}
          </span>
          <span>
            Пол: <span className={styles.petIndo}>{pet?.petGender}</span>
          </span>
          <span>
            Возраст в годах: <span className={styles.petIndo}>{pet?.petAge}</span>
          </span>
          <span>
            Стерилизация: <span className={styles.petIndo}>{pet?.petIsSprayed ? 'Да' : 'Нет'}</span>
          </span>
          <span>
            Дополнительная информация: <span className={styles.petIndo}>{pet?.petAbout}</span>
          </span>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <StyledButton onClick={() => navigate(`/account/pets/edit/${pet?.id}`)} className={styles.editButton} variant='contained'>
          Редактировать
        </StyledButton>
        <StyledButton onClick={() => void deleteHandler()} variant='contained'>
          Удалить
        </StyledButton>
      </div>
    </div>
  );
}
