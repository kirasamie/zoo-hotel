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

type OrderType = {
  userId: number;
  petId: number;
  roomId: number;
  dateFrom: string;
  dateTo: string;
  amount: number;
  quantity: number;
  description: string;
};

export default function RoomsPageModal({ room, open, handleClose }: ModalPropsType) {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const user = useAppSelector((store) => store.userSlice.info);
  const [orders, setOrders] = useState<Array<OrderType>>([]);
  const [mainOrder, setMainOrder] = useState<OrderType>({ userId: 0, petId: 0, roomId: 0, dateFrom: '', dateTo: '', amount: 0, quantity: 0, description: '' });
  const [allowPayment, setAllowPayment] = useState(false);
  const [days, setDays] = useState(0);
  const [inputs, setInputs] = useState({ petId: '', allowedRange: '', description: '' });

  useEffect(() => {
    const checkUserId = mainOrder.userId !== 0;
    const checkPetId = mainOrder.petId !== 0;
    const checkRoomId = mainOrder.roomId !== 0;
    const checkDateFrom = mainOrder.dateFrom !== '';
    const checkDateTo = mainOrder.dateTo !== '';
    const checkAmount = mainOrder.amount !== 0;
    const checkQuantity = mainOrder.quantity !== 0;

    console.log(mainOrder);
    if (checkUserId && checkPetId && checkRoomId && checkDateFrom && checkDateTo && checkAmount && checkQuantity) {
      setAllowPayment(true);
    }
  }, [mainOrder]);

  const changeHandler = (event: SelectChangeEvent) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value as string }));
    if (event.target.name === 'petId') setMainOrder((prev) => ({ ...prev, petId: Number(event.target.value) }));
    if (event.target.name === 'description') setMainOrder((prev) => ({ ...prev, description: event.target.value }));
  };

  const changeDateRangeHandler = (value: DateRange<unknown>) => {
    const datesString = value.map((date) => date?.$d && new Date(date.$d).toLocaleDateString());
    if (datesString.every((el) => el !== undefined)) {
      const date1: Date = new Date(value[0]?.$d);
      const date2: Date = new Date(value[1]?.$d);
      const diffDays: number = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
      setDays(diffDays);
      setMainOrder((prev) => ({ ...prev, userId: user.id, quantity: diffDays, dateFrom: datesString[0], dateTo: datesString[1], amount: room?.roomPrice, roomId: room.id }));
    }
  };

  const paymentHandler = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const session = await axios.post(`${import.meta.env.VITE_URL}/stripe`, { mainOrder: mainOrder }, { withCredentials: true });
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
          <TextField name="description" value={inputs.description} label="Ваш комментарий к заказу" maxRows={15} multiline fullWidth onChange={changeHandler} />

          {!!days && (
            <Typography>
              К оплате: {room?.roomPrice} руб за {days} дней = {room?.roomPrice * days} руб
            </Typography>
          )}

          <Button disabled={!allowPayment} variant="contained" onClick={() => void paymentHandler()}>
            Оплатить
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
