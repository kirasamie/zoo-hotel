import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRange, DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Typography, Box, Button, Modal, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl } from '@mui/material';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useAppSelector } from '../../redux/hooks';
import { RoomType } from '../../types';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

type ModalPropsType = {
  room: RoomType;
  open: boolean;
  handleClose: () => void;
};

export default function RoomsPageModal({ room, open, handleClose }: ModalPropsType) {
  const [days, setDays] = useState(0);
  const pets = useAppSelector((store) => store.petSlice.pets);
  const [inputs, setInputs] = useState({ petId: '', allowedRange: '', orderDescription: '' });

  const changeHandler = (event: SelectChangeEvent) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value as string }));
  };

  const changeDateRangeHandler = (value: DateRange<unknown>) => {
    const datesString = value.map((date) => date?.$d && new Date(date.$d).toLocaleDateString());
    console.log(datesString);
    if (datesString.every((el) => el !== undefined)) {
      const date1: Date = new Date(value[0]?.$d);
      const date2: Date = new Date(value[1]?.$d);
      const diffDays: number = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
      setDays(diffDays);
    }
  };

  const paymentHandler = async () => {
    const order = ['123'];
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const session = await axios.post(`${import.meta.env.VITE_URL}/stripe`, order, { withCredentials: true });
    console.log(session);
    const result = await stripe!.redirectToCheckout({
      sessionId: session.data.id,
    });
    if (result?.error) {
      console.log(result?.error);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Выберите вашего питомца</InputLabel>
            <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" name="petId" value={inputs.petId} onChange={changeHandler} autoWidth label="Выберите вашего питомца">
              {pets.length && pets.map((pet) => <MenuItem value={String(pet.id)}>{pet.petName}</MenuItem>)}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DateRangePicker slots={{ field: SingleInputDateRangeField }} name="allowedRange" onChange={changeDateRangeHandler} />
          </LocalizationProvider>
          <TextField name="orderDescription" value={inputs.orderDescription} label="Ваш комментарий к заказу" maxRows={15} multiline fullWidth onChange={changeHandler} />

          { !!days && <Typography>К оплате: {room?.roomPrice} руб за {days} дней = {room?.roomPrice * days} руб</Typography>}

          <Button variant="contained" onClick={() => void paymentHandler()}>
            Оплатить
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
