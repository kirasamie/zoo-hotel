import * as React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@mui/material/styles";
import type { RoomType } from "../../types";
import styles from "./RoomsPageCarousel.module.css";
import Box from "@mui/material/Box";

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
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((image, index) => (
            <div key={`image_${image.id}`}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 300,
                    display: "block",
                    overflow: "hidden",
                    width: "100%",
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
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      </div>
      <div className={styles.descriptionWrapper}>
        <Typography sx={{ flex: 1 }}>{room.roomAbout}</Typography>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography>
            Для{" "}
            {String(room.roomPetType).includes("12")
              ? "кошечек и собачек"
              : String(room.roomPetType).includes("1")
              ? "кошечек"
              : "собачек"}
          </Typography>
          <Typography>Цена за сутки: {room.roomPrice} рубь</Typography>
        </Paper>
        <Button
          sx={{ alignSelf: "center" }}
          variant="contained"
          onClick={() => {
            setChoosenRoomId(room.id);
            handleOpen();
          }}
        >
          Нравится!
        </Button>
      </div>
    </div>
  );
}

export default RoomsPageCarousel;
