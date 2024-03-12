import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.container}>
      <div>+7(966)996-99-66</div>
      <div>
        <img className={styles.icon} src="/img/telegram.svg" alt="telegram" />
        <img className={styles.icon} src="/img/vk.svg" alt="vk" />
        <img className={styles.icon} src="/img/gmail.svg" alt="gmail" />
      </div>
    </footer>
  );
}
