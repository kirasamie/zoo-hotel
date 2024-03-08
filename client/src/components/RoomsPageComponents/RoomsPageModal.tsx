import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRange, DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RoomType } from '../../types';
import { fetchCheckOrdersByRoom } from '../../redux/thunkActions';
import { styled } from '@mui/material/styles';
import { DateRangePickerDay as MuiDateRangePickerDay, DateRangePickerDayProps } from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { TextField, Typography, Box, Button, Modal, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: '70%',
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

// const DateRangePickerDay = styled(MuiDateRangePickerDay)(({ theme, isHighlighting, isStartOfHighlighting, isEndOfHighlighting, outsideCurrentMonth }) => ({
//   ...(!outsideCurrentMonth &&
//     isHighlighting && {
//       borderRadius: 0,
//       backgroundColor: theme.palette.primary.main,
//       color: theme.palette.common.white,
//       '&:hover, &:focus': {
//         backgroundColor: theme.palette.primary.dark,
//       },
//     }),
//   ...(isStartOfHighlighting && {
//     borderTopLeftRadius: '50%',
//     borderBottomLeftRadius: '50%',
//   }),
//   ...(isEndOfHighlighting && {
//     borderTopRightRadius: '50%',
//     borderBottomRightRadius: '50%',
//   }),
// })) as React.ComponentType<DateRangePickerDayProps<Dayjs>>;

export default function RoomsPageModal({ room, open, handleClose }: ModalPropsType) {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const user = useAppSelector((store) => store.userSlice.info);
  const dates = useAppSelector((store) => store.orderSlice.ordersRoom);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [orders, setOrders] = useState<Array<OrderType>>([]);
  const [mainOrder, setMainOrder] = useState<OrderType>({ userId: 0, petId: 0, roomId: 0, dateFrom: '', dateTo: '', amount: 0, quantity: 0, description: '' });
  const [allowPayment, setAllowPayment] = useState(false);
  const [days, setDays] = useState(0);
  const [inputs, setInputs] = useState({ petId: '', allowedRange: '', description: '' });
  const [calendarError, setCalendarError] = useState('');
  const [petSelectError, setPetSelectError] = useState('');

  useEffect(() => {
    if (typeof room?.id === 'number' && room.id !== 0) {
      dispatch(fetchCheckOrdersByRoom(room.id));
    }
  }, [room]);

  useEffect(() => {
    const checkUserId = mainOrder.userId !== 0;
    const checkPetId = mainOrder.petId !== 0;
    const checkRoomId = mainOrder.roomId !== 0;
    const checkDateFrom = mainOrder.dateFrom !== '';
    const checkDateTo = mainOrder.dateTo !== '';
    const checkAmount = mainOrder.amount !== 0;
    const checkQuantity = mainOrder.quantity !== 0;
    const userDates = getBannedDates([[mainOrder.dateFrom, mainOrder.dateTo]]);
    const serverDates = getBannedDates(dates);
    if (userDates.flat().some((date) => serverDates.flat().includes(date))) {
      setCalendarError('Выбранная дата уже забронирована');
    } else {
      setCalendarError('');
    }
    if (checkUserId && checkPetId && checkRoomId && checkDateFrom && checkDateTo && checkAmount && checkQuantity && !calendarError && !petSelectError) {
      setAllowPayment(true);
    } else {
      setAllowPayment(false);
    }
  }, [mainOrder, calendarError, petSelectError]);

  const changeHandler = (event: SelectChangeEvent) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value as string }));
    if (event.target.name === 'petId') {
      checkIsPetTypeCorrect(event.target.value);
      setMainOrder((prev) => ({ ...prev, petId: Number(event.target.value) }));
    }
    if (event.target.name === 'description') setMainOrder((prev) => ({ ...prev, description: event.target.value }));
  };

  const changeDateRangeHandler = (value: DateRange<unknown>) => {
    const datesString = value.map((date) => date?.$d && new Date(date.$d).toDateString());
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

  const getBannedDates = (dates: [string, string][]) => {
    return dates.map((range) => {
      const dateFrom = new Date(range[0]);
      const dateTo = new Date(range[1]);
      const result = [];
      const pad = (s: number) => ('00' + s).slice(-2);
      while (dateFrom.getTime() <= dateTo.getTime()) {
        result.push(pad(dateFrom.getDate()) + '.' + pad(dateFrom.getMonth() + 1) + '.' + dateFrom.getFullYear());
        dateFrom.setDate(dateFrom.getDate() + 1);
      }
      return result;
    });
  };

  const checkIsPetTypeCorrect = (choosenPetId: string) => {
    const choosenPet = pets.find((pet) => pet.id === Number(choosenPetId));
    if (String(room?.roomPetType).includes(String(choosenPet?.petType))) {
      console.log('123');
      setPetSelectError('');
    } else {
      setPetSelectError('Выбранный питомец не подходит для этой комнаты');
      setAllowPayment(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          setInputs({ petId: '', allowedRange: '', description: '' })
          setPetSelectError('');
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth error={!!petSelectError}>
            <InputLabel id="demo-simple-select-autowidth-label">Выберите вашего питомца</InputLabel>
            <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" name="petId" value={inputs.petId} onChange={changeHandler} autoWidth label="Выберите вашего питомца">
              {pets.length ? (
                pets.map((pet) => <MenuItem value={String(pet.id)}>{pet.petName}</MenuItem>)
              ) : (
                <MenuItem>
                  <Button onClick={() => void navigate('/account/pets/new')}>Создайте карточку питомца!</Button>
                </MenuItem>
              )}
            </Select>
            <FormHelperText>{petSelectError}</FormHelperText>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DateRangePicker
              disablePast
              shouldDisableDate={(date) => {
                return getBannedDates(dates).flat().includes(new Date(date.$d).toLocaleDateString());
              }}
              slots={{ field: SingleInputDateRangeField }}
              name="allowedRange"
              onChange={changeDateRangeHandler}
              slotProps={{
                textField: { helperText: calendarError, error: !!calendarError },
                popper: { sx: { '.MuiDateRangePickerDay-day.Mui-disabled': { border: '1px solid orange' }, '.MuiDateRangeCalendar-root>div:first-child': { opacity: '0' } } },
              }}
              sx={{
                '& .Mui-disabled': { color: '#FF0000' },
              }}
            />
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
