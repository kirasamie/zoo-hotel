import styles from './EmptyPet.module.css';
export default function EmptyPet() {
  return (
    <div className={styles.title}>
      <h3 style={{ color: 'orange' }}>У вас пока нет карточек питомцев</h3>
    </div>
  );
}
