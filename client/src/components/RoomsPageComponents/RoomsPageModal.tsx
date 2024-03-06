import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Typography, Box, Button, Modal, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl } from '@mui/material';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

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
  open: boolean;
  handleClose: () => void;
};

const pets = ['Бибик', 'Бобик'];

export default function RoomsPageModal({ open, handleClose }: ModalPropsType) {
  const [selectedPet, setSelectedPet] = useState('');

  const changeHandler = (event: SelectChangeEvent) => {
    setSelectedPet(event.target.value as string);
  };

  const paymentHandler = async () => {
    const order = ['123'];
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const session = await axios.post(`${import.meta.env.VITE_URL}/stripe`, order, { withCredentials: true });
    console.log(session);
    const result = await stripe!.redirectToCheckout({
        sessionId: session.data.id,
    })
    if (result?.error) {
        console.log(result?.error)
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Выберите вашего питомца</InputLabel>
            <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={selectedPet} onChange={changeHandler} autoWidth label="Выберите вашего питомца">
              {pets.length ? pets.map((pet) => <MenuItem value={10}>{pet}</MenuItem>) : null}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DateRangePicker slots={{ field: SingleInputDateRangeField }} name="allowedRange" />
          </LocalizationProvider>
          <TextField label="Ваш комментарий к заказу" maxRows={15} multiline fullWidth />
          <Button variant="contained" onClick={() => void paymentHandler()}>
            Оплатить
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
