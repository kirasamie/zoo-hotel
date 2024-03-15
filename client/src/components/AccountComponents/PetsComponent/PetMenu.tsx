import { useAppSelector } from '../../../redux/hooks';
import CardGlassWrapper from '../../GlassWrapper/CardGlassWrapper';
import StyledButton from '../../GlassWrapper/StyledButton';
import styles from './PetMenu.module.css';
import { Link } from 'react-router-dom';

export default function PetMenu(): JSX.Element {
  const pets = useAppSelector((store) => store.petSlice.pets);
  return (
    <div className={styles.menu}>
      <Link style={{ textDecoration: 'none' }} to="/account/pets/new">
        <StyledButton fullWidth>Добавить друга</StyledButton>
      </Link>

      {pets.map((pet) => (
        <Link className={styles.link} style={{ textDecoration: 'none', width: '100%' }} key={pet.id} to={`/account/pets/${pet.id}`}>
          <CardGlassWrapper width="100%">
            <div className={styles.iconText}>
              {pet.petType === 1 ? <img className={styles.iconCat} src="/img/cat-orange.png" alt="cat" /> : <img className={styles.iconDog} src="/img/dog-orange.png" alt="dog" />}
              {pet.petName}
            </div>
          </CardGlassWrapper>
        </Link>
      ))}
    </div>
  );
}
