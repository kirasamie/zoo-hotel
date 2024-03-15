import styles from './ProfileCard.module.css';
import { useAppSelector } from '../../../redux/hooks';
import { useState } from 'react';
import EditModal from './EditModal';
import GlassWrapper from '../../GlassWrapper/GlassWrapper';
import StyledButton from '../../GlassWrapper/StyledButton';

export default function ProfileCard() {
  const user = useAppSelector((store) => store.userSlice.info);
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <GlassWrapper width='500px'>
      <div className={styles.profileContainer}>
        <div className={styles.profile}>
          {user.avatar ? (
            <img className={styles.photo} src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/avatars/${user.avatar}`} alt='imageUser' />
          ) : user.isWorker ? (
            <img className={styles.photo} src='/worker.png' alt='imageUser' />
          ) : (
            <img className={styles.photo} src='/user.png' alt='imageUser' />
          )}

          <div className={styles.info}>
            <div>
              Имя: <span className={styles.userInfo}>{user.firstName}</span>{' '}
            </div>
            <div>
              Фамилия: <span className={styles.userInfo}>{user?.lastName}</span>{' '}
            </div>
            <div>
              Email: <span className={styles.userInfo}>{user?.email}</span>
            </div>
            <div>
              Контактный телефон: <span className={styles.userInfo}>{user?.phone}</span>
            </div>
          </div>
        </div>
        <StyledButton onClick={() => setIsOpenModal(true)}>Редактировать</StyledButton>
        {isOpenModal && <EditModal user={user} setIsOpenModal={setIsOpenModal} />}
      </div>
    </GlassWrapper>
  );
}
