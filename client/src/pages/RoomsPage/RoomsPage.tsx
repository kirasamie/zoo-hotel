import RoomsPageCalendarComponent from '../../components/RoomsPageComponents/RoomsPageCalendar';
import RoomsPageCarousel from '../../components/RoomsPageComponents/RoomsPageCarousel';
import RoomsPageCustomizedHook from '../../components/RoomsPageComponents/RoomsPageCustomizedHook';
import styles from './RoomsPage.module.css';

export default function RoomsPage() {
  return (
    <div className={styles.roomsPageWrapper}>
      <div className={styles.inputsWrapper}>
        <RoomsPageCalendarComponent />
        <RoomsPageCustomizedHook />
      </div>
      <div className={styles.rooms}>
        <div className={styles.roomUpperRow}>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
        </div>
        <div className={styles.roomBottomRow}>
          <button>9</button>
          <button>8</button>
          <button>7</button>
        </div>
      </div>
      <RoomsPageCarousel />
    </div>
  );
}
