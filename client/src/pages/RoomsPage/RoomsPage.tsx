import { useEffect, useState } from 'react';
import RoomsPageCalendarComponent from '../../components/RoomsPageComponents/RoomsPageCalendar';
import RoomsPageCarousel from '../../components/RoomsPageComponents/RoomsPageCarousel';
import RoomsPageCustomizedHook from '../../components/RoomsPageComponents/RoomsPageCustomizedHook';
import styles from './RoomsPage.module.css';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Popover } from '@mui/material';

export default function RoomsPage() {
  const [currentRoom, setCurrentRoom] = useState();

  useEffect(() => {
    console.log(currentRoom);
  }, [currentRoom]);

  const chooseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentRoom(e.target);
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
                <button onMouseEnter={chooseHandler} {...bindTrigger(popupState)}>
                  1
                </button>
                <button onMouseEnter={chooseHandler} {...bindTrigger(popupState)}>
                  2
                </button>
                <button onMouseEnter={chooseHandler} {...bindTrigger(popupState)}>
                  3
                </button>
                <button onMouseEnter={chooseHandler} {...bindTrigger(popupState)}>
                  4
                </button>
                <button onMouseEnter={chooseHandler} {...bindTrigger(popupState)}>
                  5
                </button>
                <button onMouseEnter={chooseHandler} {...bindTrigger(popupState)}>
                  6
                </button>
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
                <RoomsPageCarousel />
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
    </div>
  );
}
