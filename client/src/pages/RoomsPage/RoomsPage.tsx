import { useEffect, useState } from 'react';
import RoomsPageCalendarComponent from '../../components/RoomsPageComponents/RoomsPageCalendar';
import RoomsPageCarousel from '../../components/RoomsPageComponents/RoomsPageCarousel';
import RoomsPageCustomizedHook from '../../components/RoomsPageComponents/RoomsPageCustomizedHook';
import styles from './RoomsPage.module.css';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Popover } from '@mui/material';
import type { RoomType, RoomsType } from '../../types';

export default function RoomsPage() {
  const [currentRoom, setCurrentRoom] = useState<RoomType>();
  const [rooms, setRooms] = useState<RoomsType>([]);
  const [choosenRoomId, setChoosenRoomId] = useState<number>(0);

  useEffect(() => {
    console.log(currentRoom);
  }, [currentRoom]);

  useEffect(() => {
    setRooms([
      { id: 1, roomAbout: 'Красочный рассказ о комнате', roomPhoto: '123', roomCapacity: 3, roomPetType: 12, roomPrice: 600 },
      { id: 2, roomAbout: 'Красочный рассказ о комнате', roomPhoto: '123', roomCapacity: 4, roomPetType: 12, roomPrice: 1200 },
      { id: 3, roomAbout: 'Красочный рассказ о комнате', roomPhoto: '123', roomCapacity: 2, roomPetType: 12, roomPrice: 1500 },
      { id: 4, roomAbout: 'Красочный рассказ о комнате', roomPhoto: '123', roomCapacity: 2, roomPetType: 12, roomPrice: 1200 },
      { id: 5, roomAbout: 'Красочный рассказ о комнате', roomPhoto: '123', roomCapacity: 1, roomPetType: 12, roomPrice: 1000 },
      { id: 6, roomAbout: 'Красочный рассказ о комнате', roomPhoto: '123', roomCapacity: 2, roomPetType: 12, roomPrice: 900 },
    ]);
  }, []);

  const chooseRoomHandler = (id: number) => {
    setCurrentRoom(rooms[id - 1]);
  };

  return (
    <div className={styles.roomsPageWrapper}>
      <div className={styles.inputsWrapper}>
        <RoomsPageCalendarComponent />
        <RoomsPageCustomizedHook />
      </div>
      <div className={styles.rooms}>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <div className={styles.roomUpperRow}>
                {rooms.length &&
                  rooms.map((room) => (
                    <button onMouseEnter={() => void chooseRoomHandler(room.id)} {...bindTrigger(popupState)}>
                      {room.id}
                    </button>
                  ))}
              </div>
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
                <RoomsPageCarousel room={currentRoom} setChoosenRoomId={setChoosenRoomId} />
              </Popover>
            </div>
          )}
        </PopupState>

        <div className={styles.roomBottomRow}>
          <button>9</button>
          <button>8</button>
          <button>7</button>
        </div>
      </div>

      <p>{ choosenRoomId !== 0 ? `Вы выбрали комнату ${choosenRoomId}!` : 'Комната не выбрана...' }</p>
    </div>
  );
}
