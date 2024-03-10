import { useEffect, useState } from 'react';
import RoomsPageCarousel from '../../components/RoomsPageComponents/RoomsPageCarousel';
import styles from './RoomsPage.module.css';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Popover } from '@mui/material';
import type { RoomType, RoomsType } from '../../types';
import axios, { AxiosResponse } from 'axios';
import RoomsPageModal from '../../components/RoomsPageComponents/RoomsPageModal';
import GlassWrapper from '../../components/GlassWrapper/GlassWrapper';

export default function RoomsPage() {
  const [currentRoom, setCurrentRoom] = useState<RoomType>();
  const [rooms, setRooms] = useState<RoomsType>([]);
  const [choosenRoomId, setChoosenRoomId] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get<RoomsType, AxiosResponse<RoomsType>>(`${import.meta.env.VITE_URL}/rooms/all`, { withCredentials: true })
      .then((response) => setRooms(response.data))
      .catch((err) => console.log(err));
  }, []);

  const chooseRoomHandler = (id: number) => {
    setCurrentRoom(rooms[id - 1]);
  };

  return (
    <div className={styles.roomsPageWrapper}>
      <GlassWrapper width="100%">
        <h1 className={styles.header1}>Выберите комнатку!</h1>
      </GlassWrapper>

      <div className={styles.contentWrapper}>
        <GlassWrapper width="400px">
          <h2 className={styles.tipHeader}>Подсказка:</h2>
          <p className={styles.tipDescription}>На этой странице вы можете подобрать комнатку для своего питомца.</p>
          <p className={styles.tipDescription}>Для того, чтобы определиться с выбором просто выберите одну из комнат в домике и нажмите кнопку "Нравится!"</p>
          <p className={styles.tipDescription}>Для этого определитесь с выбором, выберите желаемую дату бронирования, выберите питомца и переходите к оплате!</p>
          <p className={styles.tipDescription}>После успешной оплаты наш человек свяжется с Вами для дальнейшего взаимодействия, где подробно ответит на все интересующие Вас вопросы.</p>
        </GlassWrapper>
        <div style={{ height: '600px' }}></div>
        <div className={styles.theHotel}></div>
        <div className={styles.roomsWrapper}>
          <button className={styles.roomButton}></button>
          <button className={styles.roomButton}></button>
          <button className={styles.roomButton}></button>
          <button className={styles.roomButton}></button>
          <button className={styles.roomButton}></button>
          <button className={styles.roomButton}></button>
          <button className={styles.roomButton}></button>
          <button className={styles.roomButton}></button>
          <button className={styles.roomButton}></button>
        </div>

        <RoomsPageModal room={currentRoom} open={open} handleClose={handleClose} />

        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div className={styles.roomsWrapper}>
              {rooms.length &&
                rooms.map((room) => (
                  <button className={styles.roomButton} key={room.id} onMouseEnter={() => void chooseRoomHandler(room.id)} {...bindTrigger(popupState)}>
                    {String(room.roomPetType).includes('1') && <img style={{ height: '40px', width: '40px' }} src="/img/cat-orange.png" />}
                    {String(room.roomPetType).includes('2') && <img style={{ height: '40px', width: '40px' }} src="/img/dog-orange.png" />}
                  </button>
                ))}
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <RoomsPageCarousel room={currentRoom} setChoosenRoomId={setChoosenRoomId} handleOpen={handleOpen} />
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    </div>
  );
}
