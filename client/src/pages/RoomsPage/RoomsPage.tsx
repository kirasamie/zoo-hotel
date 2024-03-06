import { useEffect, useState } from 'react';
import RoomsPageCarousel from '../../components/RoomsPageComponents/RoomsPageCarousel';
import styles from './RoomsPage.module.css';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Popover } from '@mui/material';
import type { RoomType, RoomsType } from '../../types';
import axios, { AxiosResponse } from 'axios';
import RoomsPageModal from '../../components/RoomsPageComponents/RoomsPageModal';

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
      <RoomsPageModal open={open} handleClose={handleClose} />
      <div className={styles.rooms}>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <div className={styles.roomUpperRow}>
                {rooms.length &&
                  rooms.slice(0, 6).map((room) => (
                    <button onMouseEnter={() => void chooseRoomHandler(room.id)} {...bindTrigger(popupState)}>
                      {room.id}
                    </button>
                  ))}
              </div>
              <div className={styles.roomBottomRow}>
                {rooms.length &&
                  rooms.slice(6, 9).map((room) => (
                    <button key={room.id} onMouseEnter={() => void chooseRoomHandler(room.id)} {...bindTrigger(popupState)}>
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
                <RoomsPageCarousel room={currentRoom} setChoosenRoomId={setChoosenRoomId} handleOpen={handleOpen} />
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    </div>
  );
}
