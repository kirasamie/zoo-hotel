import { Link } from 'react-router-dom';
import { PetItemType } from '../../../models/Pet';
import styles from './PetCardMini.module.css';
import CardGlassWrapper from '../../GlassWrapper/CardGlassWrapper';
export default function PetCardMini({ pet }: { pet: PetItemType }) {
  console.log(pet);

  return (
    <Link className={styles.link} style={{ textDecoration: 'none' }} to={`/account/pets/${pet.id}`}>
      <div className={styles.containerWrapper}>
        <CardGlassWrapper className={styles.container}>
          <div className={styles.petImageDiv}>
            {pet?.PetImages?.length !== 0 ? (
              <div className={styles.photo}>
                <img className={styles.photoImg} src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/pets/${pet?.PetImages[0]?.link}`} alt="imagePet" />
              </div>
            ) : pet?.petType === 1 ? (
              <div className={styles.photo}>
                <img src="/catAvatar.png" alt="cat" />
              </div>
            ) : (
              <div className={styles.photo}>
                <img src="/dogAvatar.png" alt="dog" />
              </div>
            )}
          </div>
          <div className={styles.petName}>{pet.petName}</div>
          <div className={styles.petBreed}>{pet.petBreed}</div>
        </CardGlassWrapper>
      </div>
    </Link>
  );
}
