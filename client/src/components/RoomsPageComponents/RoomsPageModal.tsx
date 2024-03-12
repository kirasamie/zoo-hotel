import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRange, DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import 'dayjs/locale/ru';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RoomType } from '../../types';
import { fetchCheckOrdersByRoom } from '../../redux/thunkActions';
import { Button, Modal, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl, FormHelperText, Checkbox, FormControlLabel, FormGroup, styled } from '@mui/material';
import { useNavigate } from 'react-router';
import styles from './RoomsPageModal.module.css';
import GlassWrapper from '../GlassWrapper/GlassWrapper';
import StyledTextfield from '../GlassWrapper/StyledTextfield';
import StyledButton from '../GlassWrapper/StyledButton';

const optionsPrices = {
  '1': 500,
  '2': 2000,
  '3': 2000,
  '4': 500,
  '5': 800,
  '6': 300,
  '7': 1000,
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  p: 4,
  // background: 'url("/background-filler-v2.png") fixed',
  // border: '3px solid orange',
  // backgroundColor: 'rgba(0, 0, 0, 0.8)',
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  // alignItems: 'center',
  // backdropFilter: 'blur(8px)',
  // color: 'orange',
  // gap: '10px',
  // boxShadow: '-5px 5px 20px 1px black',
  // flex: '1 1 auto',
};

const StyledInputSelect = styled(Select)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'orange',
  },
  '& label': {
    color: 'orange',
  },
  '& label.Mui-focused': {
    color: 'white',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'orange',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },

    '&.Mui-disabled fieldset': {
      color: 'white',
      borderColor: 'orange',
    },
  },
}));

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
  addServices: string;
};

export default function RoomsPageModal({ room, open, handleClose }: ModalPropsType) {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const user = useAppSelector((store) => store.userSlice.info);
  const dates = useAppSelector((store) => store.orderSlice.ordersRoom);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [orders, setOrders] = useState<Array<OrderType>>([]);
  const [mainOrder, setMainOrder] = useState<OrderType>({
    userId: 0,
    petId: 0,
    roomId: 0,
    dateFrom: '',
    dateTo: '',
    amount: 0,
    quantity: 0,
    description: '',
    addServices: '',
  });
  const [allowPayment, setAllowPayment] = useState(false);
  const [days, setDays] = useState(0);
  const [inputs, setInputs] = useState({
    petId: '',
    allowedRange: '',
    description: '',
  });
  const [calendarError, setCalendarError] = useState('');
  const [petSelectError, setPetSelectError] = useState('');
  const [optionsInputs, setOptionInputs] = useState({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
  });
  const [optionsPrice, setOptionsPrice] = useState(0);

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
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value as string,
    }));
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
      setMainOrder((prev) => ({
        ...prev,
        userId: user.id,
        quantity: diffDays,
        dateFrom: datesString[0],
        dateTo: datesString[1],
        amount: room?.roomPrice,
        roomId: room.id,
      }));
    }
  };

  const paymentHandler = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const additionalOrders = Object.entries(optionsInputs)
      .filter((el) => el[1])
      .map((el) => [el[0], optionsPrices[el[0]]]);
    const session = await axios.post(`${import.meta.env.VITE_URL}/stripe`, { mainOrder: mainOrder, additionalOrders: additionalOrders }, { withCredentials: true });
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

  const optionsChangeHandler = (event) => {
    setOptionInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  useEffect(() => {
    setOptionsPrice(() => Object.entries(optionsInputs).reduce((acc, el) => (acc += el[1] ? optionsPrices[el[0]] : 0), 0));
  }, [optionsInputs]);

  return (
    <div>
      <Modal
        className={styles.modalOpen}
        open={open}
        onClose={() => {
          handleClose();
          setInputs({ petId: '', allowedRange: '', description: '' });
          setPetSelectError('');
          setCalendarError('');
          setMainOrder((prev) => ({ ...prev, petId: 0 }));
          setOptionInputs({
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
            '6': false,
            '7': false,
          });
          setMainOrder({
            userId: 0,
            petId: 0,
            roomId: 0,
            dateFrom: '',
            dateTo: '',
            amount: 0,
            quantity: 0,
            description: '',
            addServices: '',
          });
          setDays(0);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}> */}
        <GlassWrapper width="800px" className={styles.glassWrapper}>
          <h2 className={styles.orderTitle}>Создать заказ</h2>
          <div className={styles.inputWrapper}>
            <div className={styles.dividedForm}>
              <FormControl
                error={!!petSelectError}
                sx={{
                  flex: 1,
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'orange',
                  },
                  '& label': {
                    color: 'orange',
                  },
                  '& label.Mui-focused': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'orange',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'orange',
                    },
                  },
                }}
              >
                <InputLabel id="demo-simple-select-autowidth-label">Выберите вашего питомца</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  name="petId"
                  value={inputs.petId}
                  onChange={changeHandler}
                  autoWidth
                  label="Выберите вашего питомца"
                >
                  {pets.length ? (
                    pets.map((pet) => (
                      <MenuItem value={String(pet.id)}>
                        {pet.petName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem sx={{ borderColor: 'orange', backgroundColor: 'black', color: 'orange' }}>
                      <StyledButton onClick={() => void navigate('/account/pets/new')}>Создайте карточку питомца!</StyledButton>
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
                  label="Выберите даты заезда и выезда"
                  onChange={changeDateRangeHandler}
                  slotProps={{
                    textField: {
                      helperText: calendarError,
                      error: !!calendarError,
                    },
                    popper: {
                      sx: {
                        '.MuiDateRangePickerDay-day.Mui-disabled': {
                          border: '1px solid orange',
                        },
                        '.MuiDateRangeCalendar-root>div:first-child': {
                          opacity: '0',
                        },
                      },
                    },
                  }}
                  sx={{
                    color: 'orange',
                    borderColor: 'orange',
                    '& .Mui-disabled': { color: '#FF0000' },
                    flex: 1,
                    '& .MuiInputBase-input': { color: 'white' },
                    '& .MuiInputBase-root': { borderColor: 'orange', color: 'orange' },
                    '& .MuiFormLabel-root': { color: 'orange' },
                    '& label.Mui-focused': { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'orange',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'orange',
                      },

                      '&.Mui-disabled fieldset': {
                        color: 'white',
                        borderColor: 'orange',
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>

            <StyledTextfield
              className={styles.inputDescription}
              size="medium"
              name="description"
              value={inputs.description}
              label="Напишите дополнительный комментарий для заказа (по желанию)"
              maxRows={15}
              multiline
              fullWidth
              onChange={changeHandler}
            />
          </div>

          <div className={styles.dividedForm}>
            <FormGroup sx={{ flex: 1 }}>
              <FormControlLabel
                name="1"
                onChange={optionsChangeHandler}
                checked={optionsInputs['1']}
                control={
                  <Checkbox
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'orange',
                      },
                      '&.Mui-checked + span': {
                        color: 'white',
                      },
                    }}
                    size="small"
                  />
                }
                label="Груминг"
              />
              <FormControlLabel
                name="2"
                onChange={optionsChangeHandler}
                checked={optionsInputs['2']}
                control={
                  <Checkbox
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'orange',
                      },
                      '&.Mui-checked + span': {
                        color: 'white',
                      },
                    }}
                    size="small"
                  />
                }
                label="Занятия с кинологом"
              />
              <FormControlLabel
                name="3"
                onChange={optionsChangeHandler}
                checked={optionsInputs['3']}
                control={
                  <Checkbox
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'orange',
                      },
                      '&.Mui-checked + span': {
                        color: 'white',
                      },
                    }}
                    size="small"
                  />
                }
                label="Консультация зоопсихолога"
              />
              <FormControlLabel
                name="4"
                onChange={optionsChangeHandler}
                checked={optionsInputs['4']}
                control={
                  <Checkbox
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'orange',
                      },
                      '&.Mui-checked + span': {
                        color: 'white',
                      },
                    }}
                    size="small"
                  />
                }
                label="Зоотакси"
              />
              <FormControlLabel
                name="5"
                onChange={optionsChangeHandler}
                checked={optionsInputs['5']}
                control={
                  <Checkbox
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'orange',
                      },
                      '&.Mui-checked + span': {
                        color: 'white',
                      },
                    }}
                    size="small"
                  />
                }
                label="Приготовление пищи для питомца"
              />
              <FormControlLabel
                name="6"
                onChange={optionsChangeHandler}
                checked={optionsInputs['6']}
                control={
                  <Checkbox
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'orange',
                      },
                      '&.Mui-checked + span': {
                        color: 'white',
                      },
                    }}
                    size="small"
                  />
                }
                label="Фотоотчет более 1 раза в день"
              />
              <FormControlLabel
                name="7"
                onChange={optionsChangeHandler}
                checked={optionsInputs['7']}
                control={
                  <Checkbox
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'orange',
                      },
                      '&.Mui-checked + span': {
                        color: 'white',
                      },
                    }}
                    size="small"
                  />
                }
                label="Подготовка собаки к выставке"
              />
            </FormGroup>
            <div className={styles.prices}>
              {!!days && (
                <>
                  <ul className={styles.optionsPriceList}>
                    {optionsInputs['1'] && (
                      <li>
                        Груминг: <span style={{ color: 'white' }}> {optionsPrices['1']} руб</span>
                      </li>
                    )}
                    {optionsInputs['2'] && (
                      <li>
                        Занятия с кинологом: <span style={{ color: 'white' }}>{optionsPrices['2']} руб</span>
                      </li>
                    )}
                    {optionsInputs['3'] && (
                      <li>
                        Консультация зоопсихолога: <span style={{ color: 'white' }}>{optionsPrices['3']} руб</span>
                      </li>
                    )}
                    {optionsInputs['4'] && (
                      <li>
                        Зоотакси: <span style={{ color: 'white' }}>{optionsPrices['4']} руб</span>
                      </li>
                    )}
                    {optionsInputs['5'] && (
                      <li>
                        Приготовление пищи для питомца: <span style={{ color: 'white' }}>{optionsPrices['5']} руб</span>
                      </li>
                    )}
                    {optionsInputs['6'] && (
                      <li>
                        Фотоотчет более 1 раза в день: <span style={{ color: 'white' }}>{optionsPrices['6']} руб</span>
                      </li>
                    )}
                    {optionsInputs['7'] && (
                      <li>
                        Подготовка собаки к выставке: <span style={{ color: 'white' }}>{optionsPrices['7']} руб</span>
                      </li>
                    )}
                    <br />
                    <li>
                      Проживание:{' '}
                      <span style={{ color: 'white' }}>
                        {room?.roomPrice} руб за {days} дней = {room?.roomPrice * days} руб
                      </span>
                    </li>
                  </ul>
                  <span className={styles.finalCost}>
                    Итого к оплате: <span style={{ color: 'white' }}>{room?.roomPrice * days + optionsPrice} руб</span>{' '}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className={styles.paymentButtonWrapper}>
            <StyledButton disabled={!allowPayment} className={styles.buttonBuy} variant="contained" onClick={() => void paymentHandler()}>
              Оплатить
            </StyledButton>
          </div>
        </GlassWrapper>
        {/* </Box> */}
      </Modal>
    </div>
  );
}
