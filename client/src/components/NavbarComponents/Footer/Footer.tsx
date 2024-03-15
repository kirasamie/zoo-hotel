import styles from './Footer.module.css';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.container}>
      <div className={styles.phoneContainer}>
        <PhoneInTalkIcon sx={{ color: 'orange', width: 30, height: 30 }} />
        <span className={styles.spanText}>+7 (966) 996-99-66</span>
      </div>
      <div>
        <img className={styles.icon} src='/img/telegram.svg' alt='telegram' />
        <img className={styles.icon} src='/img/vk.svg' alt='vk' />
        <img className={styles.icon} src='/img/gmail.svg' alt='gmail' />
      </div>
    </footer>
  );
}
