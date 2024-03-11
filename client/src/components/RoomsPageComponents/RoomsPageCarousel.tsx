import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import type { RoomType } from '../../types';
import styles from './RoomsPageCarousel.module.css';
import Box from '@mui/material/Box';
import GlassWrapper from '../GlassWrapper/GlassWrapper';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

type RoomProps = {
  room: RoomType;
  setChoosenRoomId: (id: number) => void;
  handleOpen: () => void;
};

function RoomsPageCarousel({ room, setChoosenRoomId, handleOpen }: RoomProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const images = room.RoomImages;
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.swipableViewsWrapper}>
        <AutoPlaySwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
          {images.map((image, index) => (
            <div key={`image_${image.id}`}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component='img'
                  sx={{
                    height: 300,
                    display: 'block',
                    overflow: 'hidden',
                    width: '250px',
                  }}
                  src={image.link}
                  alt={image.link}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position='static'
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: 2,
            height: '0px',
            color: 'white',
            backgroundColor: 'orange',
            border: '3px solid orange',
          }}
          className={styles.mobileStepper}
          activeStep={activeStep}
          nextButton={
            <Button size='medium' sx={{ color: 'white' }} onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size='medium' sx={{ color: 'white' }} onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </Button>
          }
        />
      </div>
      <div className={styles.descriptionWrapper}>
        <div>
          <Typography sx={{ flex: 1 }}>{room.roomAbout}</Typography>
        </div>
        <div className={styles.wrapperLike}>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              pl: 2,
              color: 'orange',
              width: 270,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '3px solid orange',
              borderRadius: '20px',
            }}
          >
            <Typography className={styles.aboutDescription}>
              Для {String(room.roomPetType).includes('12') ? 'кошечек и собачек' : String(room.roomPetType).includes('1') ? 'кошечек' : 'собачек'}
            </Typography>
            <Typography className={styles.aboutDescription}>Цена за сутки: {room.roomPrice} рубь</Typography>
          </Paper>
          <Button
            sx={{
              alignSelf: 'center',
              color: '#ffffff',
              textShadow: '0 1px 2px #000000',
              fontWeight: 'bold',
              backgroundColor: '#f6ae2d',
              '&:hover': {
                backgroundColor: '#ffc862',
                borderColor: '#0062cc',
                boxShadow: 'none',
              },
              '&:active': {
                boxShadow: 'none',
                backgroundColor: '#ffa600',
                borderColor: '#d38900',
              },
            }}
            variant='contained'
            onClick={() => {
              setChoosenRoomId(room.id);
              handleOpen();
            }}
            className={styles.buttonLike}
          >
            Нравится!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RoomsPageCarousel;
