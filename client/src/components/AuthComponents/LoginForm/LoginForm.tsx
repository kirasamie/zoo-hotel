/* eslint-disable no-nested-ternary */
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchLoginUser } from '../../../redux/thunkActions';
import { Box, Button, TextField, alpha, styled } from '@mui/material';
import GlassWrapper from '../../GlassWrapper/GlassWrapper';

const OrangeButton = styled(Button)({
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
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(255, 200, 98,.5)',
  },
});

const OrangeTextfield = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'white',
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
});

type InputsUserType = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  avatar?: string;
  phone?: number;
};

export default function LoginForm({ setIsLogin }): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialStateRegisterForm = { email: '', password: '' };

  const [inputs, setInputs] = useState<InputsUserType>(initialStateRegisterForm);

  const handlerChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlerLogin = async (): Promise<void> => {
    dispatch(fetchLoginUser(inputs))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          const { isWorker } = res.payload;
          isWorker ? navigate('/account/orders') : navigate('/account/pets');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="authContainer">
      <GlassWrapper width='500px'>
        <OrangeTextfield size='small' variant="outlined" label="Email" type="text" name="email" onChange={(e) => void handlerChange(e)} fullWidth />
        <OrangeTextfield size='small' variant="outlined" label="Password" type="password" name="password" onChange={(e) => void handlerChange(e)} fullWidth />
        <OrangeButton variant="outlined" onClick={() => void handlerLogin()}>
          Войти
        </OrangeButton>
        <OrangeButton variant="outlined" onClick={() => setIsLogin(false)}>
          Ещё не зарегистрированы?
        </OrangeButton>
      </GlassWrapper>
    </div>
  );
}
