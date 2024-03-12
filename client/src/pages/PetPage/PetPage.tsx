import { Outlet } from 'react-router-dom';
import PetMenu from '../../components/AccountComponents/PetsComponent/PetMenu';
import styles from './PetPage.module.css';
import GlassWrapper from '../../components/GlassWrapper/GlassWrapper';

export default function PetPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <GlassWrapper width="100%" style={{ maxHeight: '100%' }}>
          <PetMenu />
        </GlassWrapper>
      </div>
      <GlassWrapper width="60vw">
        <Outlet />
      </GlassWrapper>
    </div>
  );
}
