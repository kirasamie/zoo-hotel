import { Outlet, useNavigate } from 'react-router-dom';
import PetMenu from '../../components/AccountComponents/PetsComponent/PetMenu';
import styles from './PetPage.module.css';
import GlassWrapper from '../../components/GlassWrapper/GlassWrapper';
import { useAppSelector } from '../../redux/hooks';

export default function PetPage(): JSX.Element {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const navigate = useNavigate();

  console.log(pets);
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <GlassWrapper width='100%' style={{ maxHeight: '100%' }}>
          <PetMenu />
        </GlassWrapper>
      </div>
      <GlassWrapper width='60vw'>
      {pets?.length !== 0 && <h3 style={{ color: 'orange' }}>Вы можете выбрать любую карточку питомца для просмотра</h3> }
        <Outlet />
      </GlassWrapper>
    </div>
  );
}
